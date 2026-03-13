/**
 * @file         webhook.controller.js
 * @description  Handles Razorpay webhooks.
 * @module       controllers/webhook
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const crypto = require('crypto');
const Order = require('../models/Order.model');
const Payment = require('../models/Payment.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const logger = require('../config/logger');

/** POST /api/webhooks/razorpay */
exports.handleRazorpayWebhook = asyncHandler(async (req, res) => {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSignature) {
        return sendError(res, 400, 'Missing signature');
    }

    // Verify signature using raw body
    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(req.body)
        .digest('hex');

    if (expectedSignature !== webhookSignature) {
        logger.error('Invalid Razorpay webhook signature');
        return sendError(res, 400, 'Invalid signature');
    }

    // Now parse the body
    const event = JSON.parse(req.body.toString());
    const data = event.payload.payment.entity;

    logger.info(`Received Razorpay webhook: ${event.event}`);

    try {
        if (event.event === 'payment.captured') {
            await Payment.findOneAndUpdate(
                { razorpayOrderId: data.order_id },
                { razorpayPaymentId: data.id, status: 'paid', paidAt: new Date() }
            );

            await Order.findOneAndUpdate(
                { 'payment.razorpayOrderId': data.order_id },
                { 'payment.status': 'paid', 'payment.razorpayPaymentId': data.id, status: 'confirmed' }
            );
        } else if (event.event === 'payment.failed') {
             await Payment.findOneAndUpdate(
                { razorpayOrderId: data.order_id },
                { status: 'failed' }
            );

            await Order.findOneAndUpdate(
                { 'payment.razorpayOrderId': data.order_id },
                { 'payment.status': 'failed' }
            );
        }

        sendSuccess(res, 200, 'Webhook processed');
    } catch (error) {
        logger.error(`Webhook processing error: ${error.message}`);
        sendError(res, 500, 'Webhook processing failed');
    }
});
