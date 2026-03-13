/**
 * @file         twoFactor.service.js
 * @description  Service for generating and verifying Google Authenticator 2FA.
 * @module       services/twoFactor
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const logger = require('../config/logger');

/**
 * Generate a new 2FA secret for a user
 * @param {string} email - User's email (for the QR code label)
 */
exports.generateSecret = async (email) => {
    try {
        const secret = speakeasy.generateSecret({
            name: `Duo Designs Admin (${email})`,
        });

        // Generate QR code as a Data URL (Base64)
        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

        return {
            ascii:  secret.ascii, // To be stored in DB
            base32: secret.base32,
            qrCode: qrCodeUrl    // To be shown to Admin once
        };
    } catch (error) {
        logger.error(`2FA Secret Generation Error: ${error.message}`);
        throw new Error('Failed to generate 2FA secret');
    }
};

/**
 * Verify a 2FA token submitted by the user
 * @param {string} secret - Stored secret (ascii or base32)
 * @param {string} token - 6-digit code from user's app
 */
exports.verifyToken = (secret, token) => {
    return speakeasy.totp.verify({
        secret:  secret,
        encoding: 'ascii',
        token:   token,
        window:  1 // Allow 30s drift
    });
};
