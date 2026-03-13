/**
 * @file         Review.model.js
 * @description  Review schema — customers can rate products after purchase.
 * @module       models/Review
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Product',
        required: true,
    },
    user: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',
        required: true,
    },
    order: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Order',
        required: true,
    },
    rating: {
        type:     Number,
        required: true,
        min:      1,
        max:      5,
    },
    review: {
        type:     String,
        trim:     true,
        required: true,
    },
    images: [{
        type: String, // Optional photos of the received product
    }],
    isActive: {
        type:    Boolean,
        default: true, // For admin to hide inappropriate reviews
    },
}, {
    timestamps: true,
});

// ── Indexes ────────────────────────────────────────
reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1 });

module.exports = mongoose.model('Review', reviewSchema);
