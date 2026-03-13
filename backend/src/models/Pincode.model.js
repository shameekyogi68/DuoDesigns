/**
 * @file         Pincode.model.js
 * @description  Mongoose schema for serviceable pincodes and shipping charges.
 *
 * @module       models/Pincode
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const pincodeSchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        unique: true,
        trim: true,
        minlength: 6,
        maxlength: 6,
    },
    area:           { type: String, default: '' },
    city:           { type: String, required: true },
    state:          { type: String, required: true },
    shippingCharge: { type: Number, default: 80, min: 0 },
    isDeliverable:  { type: Boolean, default: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Pincode', pincodeSchema);
