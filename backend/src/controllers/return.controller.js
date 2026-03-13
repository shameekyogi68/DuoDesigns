/**
 * @file         return.controller.js
 * @description  Controller for handling return/replacement requests.
 * @module       controllers/return
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const ReturnRequest = require('../models/ReturnRequest.model');
const Order = require('../models/Order.model');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { initiateRefund } = require('../services/refund.service');

/**
 * @desc    Submit a return request
 * @route   POST /api/returns
 * @access  Private (Customer)
 */
exports.submitReturnRequest = asyncHandler(async (req, res) => {
    const { orderId, reason, description, images } = req.body;

    // 1. Verify order belongs to user and is delivered
    const order = await Order.findOne({ _id: orderId, user: req.user.id, status: 'delivered' });
    if (!order) {
        return sendError(res, 'Only delivered orders can be reported for issues.', 403);
    }

    // 2. Prevent duplicate requests for the same order
    const existing = await ReturnRequest.findOne({ order: orderId });
    if (existing) {
        return sendError(res, 'A return/replacement request already exists for this order.', 400);
    }

    // 3. Create request
    const request = await ReturnRequest.create({
        order: orderId,
        user:  req.user.id,
        reason,
        description,
        images
    });

    sendSuccess(res, 'Return request submitted. Our team will review it within 24 hours.', request, 201);
});

/**
 * @desc    Get my return requests
 * @route   GET /api/returns/my
 * @access  Private (Customer)
 */
exports.getMyReturns = asyncHandler(async (req, res) => {
    const requests = await ReturnRequest.find({ user: req.user.id }).populate('order', 'orderNumber status');
    sendSuccess(res, 'Return requests retrieved', requests);
});

/**
 * @desc    Admin: Review/Update Return Request
 * @route   PUT /api/returns/:id
 * @access  Private (Admin)
 */
exports.updateReturnStatus = asyncHandler(async (req, res) => {
    const { status, adminNotes, refundAmount } = req.body;
    const request = await ReturnRequest.findById(req.params.id).populate('order');

    if (!request) return sendError(res, 'Request not found', 404);

    request.status = status;
    if (adminNotes) request.adminNotes = adminNotes;
    
    // If approved for refund
    if (status === 'approved' && refundAmount > 0) {
        try {
            const refund = await initiateRefund(request.order.payment.razorpayPaymentId, refundAmount, "Approved Return");
            request.refundAmount = refundAmount;
            // Optionally update order status to 'refunded'
        } catch (error) {
            return sendError(res, 500, 'Status updated, but Razorpay refund failed.');
        }
    }

    await request.save();
    sendSuccess(res, 'Return request updated', request);
});
