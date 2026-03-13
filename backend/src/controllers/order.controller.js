/**
 * @file         order.controller.js
 * @description  Order management controller — placement, tracking, admin lifecycle.
 * @module       controllers/order
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const generateOrderId = require('../utils/generateOrderId');
const { calculateGST } = require('../services/gst.service');
const { generateInvoice } = require('../services/invoice.service');
const { sendOrderConfirmation, sendDispatchEmail, sendDeliveryEmail } = require('../services/email.service');
const { initiateRefund } = require('../services/refund.service');
const whatsapp = require('../services/whatsapp.service');

/** POST /api/orders — Place order (protected) */
exports.placeOrder = asyncHandler(async (req, res) => {
    const { items, address, coupon } = req.body;

    // Build order items with prices
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) return sendError(res, 404, `Product not found: ${item.product}`);

        const price = product.basePrice + (item.sizeAddon || 0);
        orderItems.push({
            product: product._id,
            name: product.name,
            category: product.category,
            variant: item.variant,
            size: item.size,
            qty: item.qty,
            price,
            design: item.design || null,
            designType: item.designType || null,
        });
        subtotal += price * item.qty;
    }

    // Shipping & GST
    const shippingCharge = subtotal >= 999 ? 0 : 80;
    const discount = coupon?.discountAmount || 0;
    const gst = calculateGST(subtotal, shippingCharge, discount, address.state);

    const orderNumber = await generateOrderId();

    const order = await Order.create({
        orderNumber,
        user: req.user._id,
        items: orderItems,
        address,
        coupon: coupon ? { code: coupon.code, discountAmount: discount } : undefined,
        pricing: {
            subtotal,
            shipping: shippingCharge,
            discount,
            taxableAmount: gst.taxable,
            cgst: gst.cgst,
            sgst: gst.sgst,
            igst: gst.igst,
            total: subtotal + shippingCharge + gst.totalGst - discount,
        },
        gstType: gst.type,
    });

    // Send confirmation email
    const user = await User.findById(req.user._id);
    const invoiceBuffer = await generateInvoice(order);
    sendOrderConfirmation(user.email, order, invoiceBuffer).catch(console.error);

    sendSuccess(res, 201, 'Order placed successfully', order);
});

/** GET /api/orders/my — My orders (protected) */
exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    sendSuccess(res, 200, 'Orders fetched', orders);
});

/** GET /api/orders/track/:num — Track by order number (public) */
exports.trackOrder = asyncHandler(async (req, res) => {
    const order = await Order.findOne({ orderNumber: req.params.num.toUpperCase() })
        .select('orderNumber status dispatch items.name pricing.total createdAt');
    if (!order) return sendError(res, 404, 'Order not found');
    sendSuccess(res, 200, 'Order tracking info', order);
});

/** GET /api/orders/:id/invoice — Download invoice PDF (protected) */
exports.downloadInvoice = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return sendError(res, 404, 'Order not found');
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return sendError(res, 403, 'Not authorized');
    }
    const pdfBuffer = await generateInvoice(order);
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=Invoice-${order.orderNumber}.pdf` });
    res.send(pdfBuffer);
});

/** GET /api/orders — All orders (admin) */
exports.getAllOrders = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [orders, total] = await Promise.all([
        Order.find(filter).populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
        Order.countDocuments(filter),
    ]);
    sendSuccess(res, 200, 'All orders', { orders, pagination: { page: parseInt(page), total, pages: Math.ceil(total / parseInt(limit)) } });
});

/** PUT /api/orders/:id/confirm — Admin confirm */
exports.confirmOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'confirmed' }, { new: true });
    if (!order) return sendError(res, 404, 'Order not found');
    sendSuccess(res, 200, 'Order confirmed', order);
});

/** PUT /api/orders/:id/dispatch — Admin dispatch + email */
exports.dispatchOrder = asyncHandler(async (req, res) => {
    const { courier, trackingNumber } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, {
        status: 'dispatched',
        dispatch: { courier, trackingNumber, dispatchedAt: new Date() },
    }, { new: true });
    if (!order) return sendError(res, 404, 'Order not found');

    const user = await User.findById(order.user);
    sendDispatchEmail(user.email, order).catch(console.error);

    sendSuccess(res, 200, 'Order dispatched', order);
});

/** PUT /api/orders/:id/deliver — Admin mark delivered */
exports.deliverOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'delivered' }, { new: true });
    if (!order) return sendError(res, 404, 'Order not found');

    const user = await User.findById(order.user);
    sendDeliveryEmail(user.email, order).catch(console.error);

    sendSuccess(res, 200, 'Order delivered', order);
});

/** 
 * @desc    PUT /api/orders/:id/cancel — Cancel order + initiate refund
 * @access  Private (Owner or Admin)
 */
exports.cancelOrder = asyncHandler(async (req, res) => {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return sendError(res, 404, 'Order not found');

    // 1. Check if allowed to cancel
    if (order.status === 'dispatched' || order.status === 'delivered') {
        return sendError(res, 400, 'Cannot cancel an order that is already dispatched or delivered');
    }

    // 2. Auth check: Customer can only cancel 'placed' orders. Admin can cancel any valid order.
    if (req.user.role !== 'admin' && order.status !== 'placed') {
        return sendError(res, 403, 'You can only cancel orders that are not yet confirmed');
    }

    if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
        return sendError(res, 403, 'Unauthorized');
    }

    // 3. Initiate Refund if paid
    if (order.payment.status === 'paid' && order.payment.razorpayPaymentId) {
        try {
            const refund = await initiateRefund(order.payment.razorpayPaymentId, order.pricing.total, reason);
            order.cancellation.refundId = refund.id;
        } catch (error) {
            return sendError(res, 500, 'Success: Order canceled locally, but Razorpay refund failed. Contact support.');
        }
    }

    // 4. Update status and stock restoration (Optional)
    order.status = 'cancelled';
    order.cancellation.reason = reason || 'Customer request';
    order.cancellation.cancelledAt = new Date();
    await order.save();

    // 5. Notifications
    const user = await User.findById(order.user);
    // whatsapp.sendOrderCancelled(user.phone, order.orderNumber); 

    sendSuccess(res, 200, 'Order cancelled and refund initiated', order);
});
