/**
 * @file         ReturnRequest.model.js
 * @description  Mongoose schema for tracking customer return/replacement requests.
 * @module       models/ReturnRequest
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const returnRequestSchema = new mongoose.Schema({
    order: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Order',
        required: true,
    },
    user: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',
        required: true,
    },
    reason: {
        type:     String,
        enum:     ['wrong_item', 'damaged', 'quality_issue', 'size_mismatch'],
        required: true,
    },
    description: {
        type:     String,
        trim:     true,
    },
    images: [{
        type: String, // Evidence photos uploaded to Cloudinary
    }],
    status: {
        type:     String,
        enum:     ['pending', 'approved', 'rejected', 'resolved'],
        default:  'pending',
    },
    adminNotes: {
        type: String,
    },
    refundAmount: {
        type:    Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// ── Indexes ────────────────────────────────────────
returnRequestSchema.index({ order: 1 });
returnRequestSchema.index({ user: 1 });
returnRequestSchema.index({ status: 1 });

module.exports = mongoose.model('ReturnRequest', returnRequestSchema);
