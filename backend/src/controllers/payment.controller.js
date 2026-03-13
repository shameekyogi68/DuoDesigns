/**
 * @file         payment.controller.js
 * @description  Payment controller — Razorpay order creation & verification.
 * @module       controllers/payment
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const Order = require('../models/Order.model');
const Payment = require('../models/Payment.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { createRazorpayOrder, verifyPaymentSignature } = require('../services/razorpay.service');

/** POST /api/payments/create-order */
exports.createPaymentOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return sendError(res, 404, 'Order not found');

    const rzpOrder = await createRazorpayOrder(order.pricing.total, order.orderNumber);

    await Payment.create({
        order: order._id,
        user: req.user._id,
        amount: order.pricing.total,
        razorpayOrderId: rzpOrder.id,
    });

    order.payment.razorpayOrderId = rzpOrder.id;
    await order.save();

    sendSuccess(res, 200, 'Razorpay order created', {
        razorpayOrderId: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
    });
});

/** POST /api/payments/verify */
exports.verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) return sendError(res, 400, 'Payment verification failed');

    // Update payment record
    await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'paid', paidAt: new Date() }
    );

    // Update order
    await Order.findOneAndUpdate(
        { 'payment.razorpayOrderId': razorpay_order_id },
        { 'payment.razorpayPaymentId': razorpay_payment_id, 'payment.razorpaySignature': razorpay_signature, 'payment.status': 'paid', status: 'placed' }
    );

    sendSuccess(res, 200, 'Payment verified successfully');
});

/** GET /api/payments — Admin payment logs */
exports.getPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find()
        .populate('order', 'orderNumber pricing.total')
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
    sendSuccess(res, 200, 'Payment logs', payments);
});
