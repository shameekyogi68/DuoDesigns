/**
 * @file         asyncHandler.js
 * @description  Express async route handler wrapper.
 *               Eliminates the need for try/catch in every controller.
 *
 * @module       utils/asyncHandler
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 *
 * @param  {Function} fn - Async Express route handler
 * @returns {Function}   Express middleware with error forwarding
 *
 * @example
 *   router.get('/', asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
