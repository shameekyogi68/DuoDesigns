/**
 * @file         Coupon.model.js
 * @description  Mongoose schema for discount coupons.
 *
 * @module       models/Coupon
 * @author       Duo Designs Dev Team
 * @version      1.1.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true,
        uppercase: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['flat', 'percentage'],
        required: true,
    },
    value:        { type: Number, required: true, min: 0 },
    minOrder:     { type: Number, default: 0 },
    maxDiscount:  { type: Number, default: null }, // Only for percentage coupons
    maxUses:      { type: Number, default: null },
    usedCount:    { type: Number, default: 0 },
    usagePerUser: { type: Number, default: 1 },    // Limit per account
    expiresAt:    { type: Date, default: null },
    isActive:     { type: Boolean, default: true },
}, {
    timestamps: true,
});

/**
 * @method isValid
 * @description Checks if coupon is currently valid for use.
 */
couponSchema.methods.isValid = function (cartTotal) {
    if (!this.isActive) return { valid: false, reason: 'Coupon is inactive' };
    if (this.expiresAt && new Date() > this.expiresAt) return { valid: false, reason: 'Coupon has expired' };
    if (this.maxUses && this.usedCount >= this.maxUses) return { valid: false, reason: 'Coupon usage limit reached' };
    if (cartTotal < this.minOrder) return { valid: false, reason: `Minimum order ₹${this.minOrder} required` };
    return { valid: true, reason: null };
};

/**
 * @method getDiscount
 * @description Calculates discount amount for a given subtotal.
 */
couponSchema.methods.getDiscount = function (subtotal) {
    if (this.type === 'flat') return Math.min(this.value, subtotal);
    let amount = (subtotal * this.value) / 100;
    if (this.maxDiscount) amount = Math.min(amount, this.maxDiscount);
    return Math.round(amount * 100) / 100;
};

module.exports = mongoose.model('Coupon', couponSchema);
