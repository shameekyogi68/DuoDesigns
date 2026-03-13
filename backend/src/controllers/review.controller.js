/**
 * @file         review.controller.js
 * @description  Review controller — submit and fetch reviews for products.
 * @module       controllers/review
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Review = require('../models/Review.model');
const Order = require('../models/Order.model');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Submit a review (Checked: customer must have ordered the product)
 * @route   POST /api/reviews
 * @access  Private (Customer)
 */
exports.submitReview = asyncHandler(async (req, res) => {
    const { productId, orderId, rating, review, images } = req.body;

    // 1. Verify user actually ordered this
    const order = await Order.findOne({
        _id:    orderId,
        user:   req.user.id,
        status: 'delivered', // Only delivered items can be reviewed
        'items.product': productId
    });

    if (!order) {
        return sendError(res, 'You can only review delivered products that you purchased.', 403);
    }

    // 2. Check if already reviewed
    const existingReview = await Review.findOne({ order: orderId, product: productId });
    if (existingReview) {
        return sendError(res, 'You have already reviewed this product for this order.', 400);
    }

    // 3. Create review
    const newReview = await Review.create({
        product: productId,
        user:    req.user.id,
        order:   orderId,
        rating,
        review,
        images
    });

    sendSuccess(res, 'Review submitted successfully', newReview, 201);
});

/**
 * @desc    Get reviews for a specific product
 * @route   GET /api/reviews/:productId
 * @access  Public
 */
exports.getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId, isActive: true })
        .populate('user', 'name')
        .sort('-createdAt');
        
    sendSuccess(res, 'Reviews retrieved', reviews);
});

/**
 * @desc    Admin: Delete/Hide a review
 * @route   DELETE /api/reviews/:id
 * @access  Private (Admin)
 */
exports.deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return sendError(res, 'Review not found', 404);

    review.isActive = false;
    await review.save();

    sendSuccess(res, 'Review hidden by admin');
});
