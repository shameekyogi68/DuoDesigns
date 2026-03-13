/**
 * @file         User.model.js
 * @description  Mongoose schema for user accounts.
 *               Supports email/OTP auth, addresses, and admin roles.
 *
 * @module       models/User
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    label:     { type: String, default: 'Home' },
    line1:     { type: String, required: true },
    line2:     { type: String, default: '' },
    city:      { type: String, required: true },
    state:     { type: String, required: true },
    pincode:   { type: String, required: true },
    phone:     { type: String, default: '' },
    isDefault: { type: Boolean, default: false },
}, { _id: true });

const userSchema = new mongoose.Schema({
    name:  { type: String, trim: true, default: '' },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: { type: String, trim: true, default: '' },
    role:  {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    isVerified: { type: Boolean, default: false },
    addresses:  [addressSchema],
    otp: {
        code:      { type: String, default: null },
        expiresAt: { type: Date, default: null },
        attempts:  { type: Number, default: 0 },
    },
    refreshTokens: [{ type: String }],
    wishlist:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    twoFactor: {
        secret:  { type: String, default: null },
        enabled: { type: Boolean, default: false },
    },
}, {
    timestamps: true,
});

// ── Indexes ────────────────────────────────────────
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
