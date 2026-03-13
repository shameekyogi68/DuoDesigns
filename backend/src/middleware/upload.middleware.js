/**
 * @file         upload.middleware.js
 * @description  Multer + Cloudinary storage configuration for file uploads.
 *
 * @module       middleware/upload
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

/**
 * @function createUploader
 * @description Creates a multer instance with Cloudinary storage for a given folder.
 * @param {string} folder - Cloudinary folder name
 * @returns {Object} Multer middleware instance
 */
const createUploader = (folder) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: `duo-designs/${folder}`,
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
            transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
        },
    });

    return multer({
        storage,
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    });
};

/** Design uploads (customer facing) */
const designUpload = createUploader('designs');

/** Product image uploads (admin) */
const productUpload = createUploader('products');

/** Pre-made design uploads (admin) */
const premadeUpload = createUploader('premade-designs');

module.exports = { designUpload, productUpload, premadeUpload };
