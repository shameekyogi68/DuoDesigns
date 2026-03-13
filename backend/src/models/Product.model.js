/**
 * @file         Product.model.js
 * @description  Mongoose schema for products in the Duo Designs catalog.
 *               Supports multi-variant (color/size), stock tracking, and images.
 *
 * @module       models/Product
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    color:    { type: String, required: true },
    colorHex: { type: String, required: true },
    stock: {
        S:    { type: Number, default: 0 },
        M:    { type: Number, default: 0 },
        L:    { type: Number, default: 0 },
        XL:   { type: Number, default: 0 },
        XXL:  { type: Number, default: 0 },
        XXXL: { type: Number, default: 0 },
        'One Size':       { type: Number, default: 0 },
        'Standard 11oz':  { type: Number, default: 0 },
        'Large 15oz':     { type: Number, default: 0 },
    },
}, { _id: true });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['tshirt', 'oversized', 'trackpants', 'mug', 'keychain'],
    },
    description: { type: String, default: '' },
    basePrice: {
        type: Number,
        required: [true, 'Base price is required'],
        min: [0, 'Price cannot be negative'],
    },
    oldPrice:          { type: Number, default: null },
    xlAddon:           { type: Number, default: 50 },
    xxlAddon:          { type: Number, default: 50 },
    doubleSideAddon:   { type: Number, default: 80 },
    variants:          [variantSchema],
    images:            [{ type: String }],  // Cloudinary URLs
    premadeDesigns:    [{ type: String }],  // Cloudinary URLs
    icon:              { type: String, default: '👕' },
    rating:            { type: Number, default: 0, min: 0, max: 5 },
    reviewCount:       { type: Number, default: 0 },
    isActive:          { type: Boolean, default: true },
    isFeatured:        { type: Boolean, default: false },
}, {
    timestamps: true,
});

// ── Indexes ────────────────────────────────────────
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ name: 'text', description: 'text' });

/**
 * @virtual save
 * @description Computed badge text (e.g. "30% OFF").
 */
productSchema.virtual('save').get(function () {
    if (!this.oldPrice || this.oldPrice <= this.basePrice) return null;
    const pct = Math.round(((this.oldPrice - this.basePrice) / this.oldPrice) * 100);
    return `${pct}% OFF`;
});

productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
