/**
 * @file         admin.middleware.js
 * @description  Admin role verification middleware.
 *               Must be used AFTER auth.middleware.
 *
 * @module       middleware/admin
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const { sendError } = require('../utils/apiResponse');

/**
 * @function adminMiddleware
 * @description Checks that req.user has admin role.
 */
const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return sendError(res, 403, 'Access denied. Admin privileges required.');
    }
    next();
};

module.exports = adminMiddleware;
