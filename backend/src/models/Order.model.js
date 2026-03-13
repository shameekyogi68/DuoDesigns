/**
 * @file         Order.model.js
 * @description  Mongoose schema for customer orders.
 *               Tracks items, pricing (with GST), payment, dispatch, and status.
 *
 * @module       models/Order
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product:    { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name:       { type: String, required: true },
    category:   { type: String },
    variant:    { type: String },   // color name
    size:       { type: String },
    qty:        { type: Number, required: true, min: 1 },
    price:      { type: Number, required: true },
    design:     { type: String, default: null },   // Cloudinary URL
    designType: { type: String, enum: ['uploaded', 'premade', null], default: null },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [orderItemSchema],
    address: {
        name:    { type: String, required: true },
        phone:   { type: String, required: true },
        line1:   { type: String, required: true },
        line2:   { type: String, default: '' },
        city:    { type: String, required: true },
        state:   { type: String, required: true },
        pincode: { type: String, required: true },
    },
    coupon: {
        code:           { type: String, default: null },
        discountAmount: { type: Number, default: 0 },
    },
    pricing: {
        subtotal:      { type: Number, required: true },
        shipping:      { type: Number, default: 0 },
        discount:      { type: Number, default: 0 },
        taxableAmount: { type: Number, required: true },
        cgst:          { type: Number, default: 0 },
        sgst:          { type: Number, default: 0 },
        igst:          { type: Number, default: 0 },
        total:         { type: Number, required: true },
    },
    gstType: {
        type: String,
        enum: ['intrastate', 'interstate'],
        default: 'intrastate',
    },
    payment: {
        razorpayOrderId:   { type: String, default: null },
        razorpayPaymentId: { type: String, default: null },
        razorpaySignature: { type: String, default: null },
        status: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },
    },
    status: {
        type: String,
        enum: ['placed', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
        default: 'placed',
    },
    cancellation: {
        reason:    { type: String, default: null },
        cancelledAt: { type: Date, default: null },
        refundId:  { type: String, default: null },
    },
    dispatch: {
        courier:        { type: String, default: null },
        trackingNumber: { type: String, default: null },
        dispatchedAt:   { type: Date, default: null },
    },
}, {
    timestamps: true,
});

// ── Indexes ────────────────────────────────────────
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', orderSchema);
