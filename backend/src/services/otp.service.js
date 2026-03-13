/**
 * @file         otp.service.js
 * @description  OTP generate, store, and verify service.
 *               10-minute expiry, max 3 attempts.
 *
 * @module       services/otp
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const User = require('../models/User.model');
const generateOTP = require('../utils/generateOTP');
const { sendOTPEmail } = require('./email.service');

const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 3;

/**
 * @function createAndSendOTP
 * @description Generates OTP, saves to user doc, and emails it.
 * @param {string} email - User's email
 * @returns {Promise<Object>} Updated user
 */
const createAndSendOTP = async (email) => {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        user = await User.create({
            email: email.toLowerCase(),
            otp: { code: otp, expiresAt, attempts: 0 },
        });
    } else {
        user.otp = { code: otp, expiresAt, attempts: 0 };
        await user.save();
    }

    await sendOTPEmail(email, otp);
    return user;
};

/**
 * @function verifyOTP
 * @description Validates the OTP against the stored one.
 * @param {string} email - User's email
 * @param {string} code  - OTP entered by user
 * @returns {Promise<Object>} { success, user, reason }
 */
const verifyOTP = async (email, code) => {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.otp.code) {
        return { success: false, user: null, reason: 'No OTP found. Please request a new one.' };
    }

    if (user.otp.attempts >= MAX_ATTEMPTS) {
        return { success: false, user: null, reason: 'Too many attempts. Please request a new OTP.' };
    }

    if (new Date() > user.otp.expiresAt) {
        return { success: false, user: null, reason: 'OTP has expired. Please request a new one.' };
    }

    if (user.otp.code !== code) {
        user.otp.attempts += 1;
        await user.save();
        return { success: false, user: null, reason: `Incorrect OTP. ${MAX_ATTEMPTS - user.otp.attempts} attempts remaining.` };
    }

    // Success — clear OTP & mark verified
    user.otp = { code: null, expiresAt: null, attempts: 0 };
    user.isVerified = true;
    await user.save();

    return { success: true, user, reason: null };
};

module.exports = { createAndSendOTP, verifyOTP };
