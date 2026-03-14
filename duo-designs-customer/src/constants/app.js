/**
 * @file         app.js
 * @description  Global application constants, business rules, and magic numbers.
 *
 * @module       constants/app
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

export const APP_NAME = "Duo Designs";
export const SELLER_STATE = "Karnataka";
export const GST_RATE = 0.18;
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
export const OTP_EXPIRY = 600; // 10 minutes
export const MAX_OTP_ATTEMPTS = 3;
export const FREE_SHIPPING_ABOVE = 999;
export const COMMISSION_RATE = 0.05;
export const CURRENCY = "₹";
export const RAZORPAY_CURRENCY = "INR";

export const CONTACT_INFO = {
    EMAIL: "support@duodesigns.in",
    PHONE: "+91 98765 43210",
    TIMING: "Mon - Sat, 10 AM - 7 PM IST",
    ADDRESS: "Bangalore, Karnataka, India"
};

export const UI_MESSAGES = {
    CART_EMPTY: "YOUR CART IS EMPTY",
    WISHLIST_EMPTY: "YOUR WISHLIST IS EMPTY",
    ORDER_SUCCESS: "ORDER CONFIRMED!",
    PAYMENT_FAILED: "PAYMENT FAILED"
};
