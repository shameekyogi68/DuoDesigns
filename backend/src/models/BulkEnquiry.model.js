/**
 * @file         BulkEnquiry.model.js
 * @description  Mongoose schema for tracking B2B / Corporate / Wholesale enquiries.
 * @module       models/BulkEnquiry
 */

const mongoose = require('mongoose');

const bulkEnquirySchema = new mongoose.Schema({
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, lowercase: true },
    phone:        { type: String, required: true },
    organization: { type: String, trim: true },
    productType:  { type: String, enum: ['tshirt', 'oversized', 'mug', 'mixed', 'other'] },
    estimatedQty: { type: Number, required: true },
    message:      { type: String, required: true },
    status:       { type: String, enum: ['pending', 'contacted', 'quoted', 'closed'], default: 'pending' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('BulkEnquiry', bulkEnquirySchema);
