/**
 * @file         AbandonedCart.model.js
 * @description  Tracks sessions that add to cart but do not checkout.
 * @module       models/AbandonedCart
 */

const mongoose = require('mongoose');

const abandonedCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User',
    },
    email:   { type: String }, // For guest sessions if email was entered
    items:   [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty:     { type: Number },
        variant: { type: String },
    }],
    lastInteracted: {
        type:    Date,
        default: Date.now,
    },
    recoveryEmailSent: {
        type:    Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Auto-delete after 30 days
abandonedCartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('AbandonedCart', abandonedCartSchema);
