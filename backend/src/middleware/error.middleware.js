/**
 * @file         error.middleware.js
 * @description  Global error handling middleware.
 *
 * @module       middleware/error
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

/**
 * @function notFound
 * @description Handles 404 for unmatched routes.
 */
const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * @function errorHandler
 * @description Global error handler — catches all unhandled errors.
 */
const errorHandler = (err, req, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: messages[0],
            errors: messages,
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            message: `${field} already exists.`,
        });
    }

    // Mongoose cast error (bad ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format.',
        });
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = { notFound, errorHandler };
