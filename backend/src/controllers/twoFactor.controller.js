/**
 * @file         twoFactor.controller.js
 * @description  Controller for managing Admin 2FA setup and verification.
 * @module       controllers/twoFactor
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const User = require('../models/User.model');
const twoFactorService = require('../services/twoFactor.service');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Generate 2FA Secret & QR Code
 * @route   POST /api/auth/2fa/setup
 * @access  Private (Admin)
 */
exports.setup2FA = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user.twoFactor.enabled) {
        return sendError(res, '2FA is already enabled', 400);
    }

    const secret = await twoFactorService.generateSecret(user.email);
    
    // Store secret (but don't enable yet until they verify one token)
    user.twoFactor.secret = secret.ascii;
    await user.save();

    sendSuccess(res, '2FA Secret generated. Scan the QR code to verify.', {
        qrCode: secret.qrCode,
        secret: secret.base32 // Optional: for manual entry
    });
});

/**
 * @desc    Verify and Enable 2FA
 * @route   POST /api/auth/2fa/verify
 * @access  Private (Admin)
 */
exports.verifyAndEnable2FA = asyncHandler(async (req, res) => {
    const { token } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.twoFactor.secret) {
        return sendError(res, 'No 2FA setup in progress', 400);
    }

    const isVerified = twoFactorService.verifyToken(user.twoFactor.secret, token);

    if (!isVerified) {
        return sendError(res, 'Invalid verification code', 400);
    }

    user.twoFactor.enabled = true;
    await user.save();

    sendSuccess(res, '2FA enabled successfully');
});

/**
 * @desc    Disable 2FA
 */
exports.disable2FA = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    user.twoFactor.enabled = false;
    user.twoFactor.secret = null;
    await user.save();
    sendSuccess(res, '2FA disabled');
});
