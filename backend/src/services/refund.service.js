/**
 * @file         refund.service.js
 * @description  Razorpay refund processing service.
 * @module       services/refund
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Razorpay = require('razorpay');
const logger = require('../config/logger');

const instance = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Initiate a refund for an order
 * @param {string} paymentId - Razorpay payment ID
 * @param {number} amount - Amount in INR (optional, full refund if omitted)
 * @param {string} reason - Internal reason for refund
 */
exports.initiateRefund = async (paymentId, amount = null, reason = 'Customer request') => {
    try {
        const payload = {
            payment_id: paymentId,
            notes: {
                reason: reason,
                processed_by: 'Duo Designs System',
            },
        };

        // Razorpay expects amount in Paise
        if (amount) {
            payload.amount = Math.round(amount * 100);
        }

        const refund = await instance.payments.refund(paymentId, payload);
        
        logger.info(`Refund initiated: ${refund.id} for payment ${paymentId}`);
        return refund;
    } catch (error) {
        logger.error(`Razorpay Refund Error: ${error.message}`);
        throw new Error('Failed to initiate refund via Razorpay');
    }
};
