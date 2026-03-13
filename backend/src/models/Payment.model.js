/**
 * @file         Payment.model.js
 * @description  Mongoose schema for payment transaction logs.
 *
 * @module       models/Payment
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    order:   { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount:  { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    razorpayOrderId:   { type: String, required: true },
    razorpayPaymentId: { type: String, default: null },
    razorpaySignature: { type: String, default: null },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created',
    },
    method:   { type: String, default: null },  // upi, card, netbanking
    paidAt:   { type: Date, default: null },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
}, {
    timestamps: true,
});

// ── Indexes ────────────────────────────────────────
paymentSchema.index({ order: 1 });
paymentSchema.index({ razorpayOrderId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
