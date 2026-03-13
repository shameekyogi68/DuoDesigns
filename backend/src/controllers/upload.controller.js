/**
 * @file         upload.controller.js
 * @description  Handle Cloudinary uploads from clients.
 * @module       controllers/upload
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const { sendSuccess, sendError } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/** POST /api/upload/design */
exports.uploadDesign = asyncHandler(async (req, res) => {
    if (!req.file) return sendError(res, 400, 'No file uploaded');
    sendSuccess(res, 201, 'Design uploaded successfully', { url: req.file.path });
});

/** POST /api/upload/product */
exports.uploadProduct = asyncHandler(async (req, res) => {
    if (!req.file) return sendError(res, 400, 'No file uploaded');
    sendSuccess(res, 201, 'Product image uploaded', { url: req.file.path });
});

/** POST /api/upload/premade */
exports.uploadPremade = asyncHandler(async (req, res) => {
    if (!req.file) return sendError(res, 400, 'No file uploaded');
    sendSuccess(res, 201, 'Pre-made design uploaded', { url: req.file.path });
});
