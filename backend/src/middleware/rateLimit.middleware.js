/**
 * @file         rateLimit.middleware.js
 * @description  Rate limiting middleware for sensitive routes.
 *
 * @module       middleware/rateLimit
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const rateLimit = require('express-rate-limit');

/** Auth endpoints — max 5 requests per minute */
const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many requests. Please try again after 1 minute.' },
    standardHeaders: true,
    legacyHeaders: false,
});

/** General API — max 100 requests per minute */
const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: { success: false, message: 'Rate limit exceeded. Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { authLimiter, apiLimiter };
