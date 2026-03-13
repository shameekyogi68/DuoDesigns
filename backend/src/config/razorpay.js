/**
 * @file         razorpay.js
 * @description  Razorpay payment gateway configuration.
 *
 * @module       config/razorpay
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
