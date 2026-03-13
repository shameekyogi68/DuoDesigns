/**
 * @file         razorpay.service.js
 * @description  Razorpay payment service — create orders, verify payments.
 *
 * @module       services/razorpay
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const crypto = require('crypto');
const razorpay = require('../config/razorpay');

/**
 * @function createRazorpayOrder
 * @description Creates a Razorpay order for the given amount.
 * @param {number} amount      - Amount in INR (will be converted to paise)
 * @param {string} receipt     - Receipt/order reference
 * @returns {Promise<Object>}  Razorpay order object
 */
const createRazorpayOrder = async (amount, receipt) => {
    const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt,
        payment_capture: 1, // Auto‑capture
    };

    const order = await razorpay.orders.create(options);
    return order;
};

/**
 * @function verifyPaymentSignature
 * @description Verifies Razorpay callback signature using HMAC SHA256.
 * @param {string} orderId    - Razorpay order ID
 * @param {string} paymentId  - Razorpay payment ID
 * @param {string} signature  - Razorpay signature from client
 * @returns {boolean} true if signature is valid
 */
const verifyPaymentSignature = (orderId, paymentId, signature) => {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

    return expectedSignature === signature;
};

module.exports = { createRazorpayOrder, verifyPaymentSignature };
