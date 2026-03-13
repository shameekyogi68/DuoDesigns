/**
 * @file         BackInStock.model.js
 * @description  Mongoose schema for tracking customer "Notify Me" requests for out-of-stock products.
 * @module       models/BackInStock
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const backInStockSchema = new mongoose.Schema({
    product: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Product',
        required: true,
    },
    user: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',
    },
    email: {
        type:      String,
        required:  true,
        lowercase: true,
        trim:      true,
    },
    variant: {
        type: String, // Optional: specific color/size
    },
    notified: {
        type:    Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// ── Indexes ────────────────────────────────────────
backInStockSchema.index({ product: 1, notified: 1 });
backInStockSchema.index({ email: 1 });

module.exports = mongoose.model('BackInStock', backInStockSchema);
