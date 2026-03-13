/**
 * @file         wishlist.controller.js
 * @description  Controller for handling user wishlist (add/remove/get).
 * @module       controllers/wishlist
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const User = require('../models/User.model');
const Product = require('../models/Product.model');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get user's wishlist
 * @route   GET /api/wishlist
 * @access  Private (Customer)
 */
exports.getWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate('wishlist');
    
    if (!user) {
        return sendError(res, 'User not found', 404);
    }

    sendSuccess(res, 'Wishlist retrieved', user.wishlist);
});

/**
 * @desc    Add product to wishlist
 * @route   POST /api/wishlist/:productId
 * @access  Private (Customer)
 */
exports.addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        return sendError(res, 'Product not found', 404);
    }

    const user = await User.findById(req.user.id);
    
    // Check if already in wishlist
    if (user.wishlist.includes(productId)) {
        return sendSuccess(res, 'Product already in wishlist', user.wishlist);
    }

    user.wishlist.push(productId);
    await user.save();

    sendSuccess(res, 'Added to wishlist', user.wishlist);
});

/**
 * @desc    Remove product from wishlist
 * @route   DELETE /api/wishlist/:productId
 * @access  Private (Customer)
 */
exports.removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);
    
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    sendSuccess(res, 'Removed from wishlist', user.wishlist);
});
