/**
 * @file         cloudinary.service.js
 * @description  Cloudinary image management helper service.
 *
 * @module       services/cloudinary
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const cloudinary = require('../config/cloudinary');

/**
 * @function deleteImage
 * @description Deletes an image from Cloudinary by public ID.
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>}
 */
const deleteImage = async (publicId) => {
    return cloudinary.uploader.destroy(publicId);
};

/**
 * @function getPublicIdFromUrl
 * @description Extracts Cloudinary public ID from a full URL.
 * @param {string} url - Full Cloudinary image URL
 * @returns {string} Public ID
 */
const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const fileWithExt = parts.slice(-2).join('/');
    return fileWithExt.replace(/\.[^/.]+$/, '');
};

module.exports = { deleteImage, getPublicIdFromUrl };
