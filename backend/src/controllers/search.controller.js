/**
 * @file         search.controller.js
 * @description  Search products efficiently using complete text indexing.
 * @module       controllers/search
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Product = require('../models/Product.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/** GET /api/search?q=tshirt */
exports.searchProducts = asyncHandler(async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return sendError(res, 400, 'Search query cannot be empty');
    }

    const products = await Product.find({
        $text: { $search: q },
        isActive: true
    }, {
        score: { $meta: 'textScore' }
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(10);

    sendSuccess(res, 200, 'Search results', products);
});
