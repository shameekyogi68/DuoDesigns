/**
 * @file         Partner.model.js
 * @description  Mongoose schema for partner/reseller commission tracking.
 *
 * @module       models/Partner
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const COMMISSION_RATE = 0.05; // 5%

const partnerSchema = new mongoose.Schema({
    companyName: { type: String, required: [true, 'Company name is required'], trim: true },
    saleAmount:  { type: Number, required: [true, 'Sale amount is required'], min: 0 },
    commission:  { type: Number, default: 0 },
    notes:       { type: String, default: '' },
    saleDate:    { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
    paidAt: { type: Date, default: null },
}, {
    timestamps: true,
});

/**
 * @pre save
 * @description Auto-calculates commission at 5% of saleAmount.
 */
partnerSchema.pre('save', function (next) {
    if (this.isModified('saleAmount')) {
        this.commission = Math.round(this.saleAmount * COMMISSION_RATE * 100) / 100;
    }
    next();
});

module.exports = mongoose.model('Partner', partnerSchema);
