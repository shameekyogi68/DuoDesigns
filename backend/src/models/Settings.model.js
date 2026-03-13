/**
 * @file         Settings.model.js
 * @description  Mongoose schema for global application settings.
 *               Uses a singleton pattern (single document).
 *
 * @module       models/Settings
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    siteName:          { type: String, default: 'Duo Designs' },
    siteTagline:       { type: String, default: 'Your Design. Your Product.' },
    sellerState:       { type: String, default: 'Karnataka' },
    freeShippingAbove: { type: Number, default: 999 },
    defaultShipping:   { type: Number, default: 80 },
    gstRate:           { type: Number, default: 18 },
    maxQtyPerProduct:  { type: Number, default: 10 },
    contactEmail:      { type: String, default: 'support@duodesigns.in' },
    contactPhone:      { type: String, default: '+91 80000 00000' },
    socialLinks: {
        instagram: { type: String, default: '' },
        facebook:  { type: String, default: '' },
        youtube:   { type: String, default: '' },
    },
    maintenanceMode: { type: Boolean, default: false },
}, {
    timestamps: true,
});

/**
 * @static getSettings
 * @description Retrieves the singleton settings document, creating one if absent.
 * @returns {Promise<Object>} Settings document
 */
settingsSchema.statics.getSettings = async function () {
    let settings = await this.findOne();
    if (!settings) {
        settings = await this.create({});
    }
    return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);
