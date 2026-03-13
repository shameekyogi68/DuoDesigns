/**
 * @file         auth.controller.js
 * @description  Authentication controller — OTP flow, profile, addresses.
 * @module       controllers/auth
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { createAndSendOTP, verifyOTP } = require('../services/otp.service');

const JWT_EXPIRY = '15m';
const REFRESH_EXPIRY = '30d';

/** POST /api/auth/send-otp */
exports.sendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
    await createAndSendOTP(email);
    sendSuccess(res, 200, 'OTP sent to your email');
});

/** POST /api/auth/verify-otp */
exports.verifyOTPHandler = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const result = await verifyOTP(email, otp);

    if (!result.success) {
        return sendError(res, 400, result.reason);
    }

    const token = jwt.sign({ id: result.user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRY });
    const refreshToken = jwt.sign({ id: result.user._id }, process.env.JWT_SECRET, { expiresIn: REFRESH_EXPIRY });

    result.user.refreshTokens.push(refreshToken);
    await result.user.save();

    sendSuccess(res, 200, 'Login successful', {
        token,
        refreshToken,
        user: {
            id: result.user._id,
            name: result.user.name,
            email: result.user.email,
            phone: result.user.phone,
            role: result.user.role,
        },
    });
});

/** POST /api/auth/refresh-token */
exports.refreshToken = asyncHandler(async (req, res) => {
    const { token } = req.body;
    if (!token) return sendError(res, 401, 'Refresh token required');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || !user.refreshTokens.includes(token)) {
            return sendError(res, 403, 'Invalid refresh token. Please login again.');
        }

        const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRY });
        sendSuccess(res, 200, 'Token refreshed', { token: newToken });
    } catch (err) {
        return sendError(res, 403, 'Refresh token expired or invalid. Please login again.');
    }
});

/** POST /api/auth/logout */
exports.logout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    
    // Always clear from DB if token provided
    if (refreshToken && req.user) {
        req.user.refreshTokens = req.user.refreshTokens.filter(rt => rt !== refreshToken);
        await req.user.save();
    }
    
    sendSuccess(res, 200, 'Logged out successfully');
});


/** GET /api/auth/me */
exports.getMe = asyncHandler(async (req, res) => {
    sendSuccess(res, 200, 'Profile fetched', req.user);
});

/** PUT /api/auth/profile */
exports.updateProfile = asyncHandler(async (req, res) => {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { ...(name && { name }), ...(phone && { phone }) },
        { new: true, runValidators: true }
    ).select('-otp');

    sendSuccess(res, 200, 'Profile updated', user);
});

/** POST /api/auth/address */
exports.addAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user.addresses.length === 0) req.body.isDefault = true;
    user.addresses.push(req.body);
    await user.save();
    sendSuccess(res, 201, 'Address added', user.addresses);
});

/** PUT /api/auth/address/:id */
exports.updateAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.id);
    if (!address) return sendError(res, 404, 'Address not found');
    Object.assign(address, req.body);
    await user.save();
    sendSuccess(res, 200, 'Address updated', user.addresses);
});

/** DELETE /api/auth/address/:id */
exports.deleteAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    user.addresses.pull(req.params.id);
    await user.save();
    sendSuccess(res, 200, 'Address deleted', user.addresses);
});
