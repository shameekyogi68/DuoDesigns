/**
 * @file         Coupon.model.js
 * @description  Mongoose schema for discount coupons.
 *
 * @module       models/Coupon
 * @author       Duo Designs Dev Team
 * @version      1.0.0
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
    value:     { type: Number, required: true, min: 0 },
    minOrder:  { type: Number, default: 0 },
    maxUses:   { type: Number, default: null },
    usedCount: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null },
    isActive:  { type: Boolean, default: true },
}, {
    timestamps: true,
});

/**
 * @method isValid
 * @description Checks if coupon is currently valid for use.
 * @param {number} cartTotal - Current cart subtotal
 * @returns {Object} { valid: boolean, reason: string }
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
 * @param {number} subtotal - Cart subtotal
 * @returns {number} Discount amount in INR
 */
couponSchema.methods.getDiscount = function (subtotal) {
    if (this.type === 'flat') return Math.min(this.value, subtotal);
    return Math.round((subtotal * this.value) / 100 * 100) / 100;
};

module.exports = mongoose.model('Coupon', couponSchema);
