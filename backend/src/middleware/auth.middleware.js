/**
 * @file         auth.middleware.js
 * @description  JWT verification middleware. Protects routes requiring login.
 *
 * @module       middleware/auth
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { sendError } = require('../utils/apiResponse');

/**
 * @function authMiddleware
 * @description Verifies bearer JWT and attaches user to req.user.
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendError(res, 401, 'Access denied. No token provided.');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-otp');
        if (!user) {
            return sendError(res, 401, 'User not found. Token invalid.');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return sendError(res, 401, 'Token expired. Please login again.');
        }
        return sendError(res, 401, 'Invalid token.');
    }
};

module.exports = authMiddleware;
