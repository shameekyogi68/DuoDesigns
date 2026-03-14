/**
 * @file         imageUrl.js
 * @description  Cloudinary URL builder with auto-optimization and resizing.
 * @module       utils/imageUrl
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

/**
 * Transforms a basic Cloudinary URL into an optimized version
 * @param {string} url - Original Cloudinary URL
 * @param {object} options - { width, height, quality, format, crop, upscale, enhance }
 */
export const getOptimizedImage = (url, { 
    width, height, qualityCount, 
    quality = 'auto', format = 'auto', 
    crop = 'fill', upscale = false, 
    enhance = false 
} = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (crop) transformations.push(`c_${crop}`);
  
  // AI Improvements
  if (upscale) transformations.push('e_upscale');
  if (enhance) transformations.push('e_enhance');

  const transformString = transformations.join(',');
  return `${parts[0]}/upload/${transformString ? transformString + '/' : ''}${parts[1]}`;
};

/**
 * Predefined sizes for common UI elements
 */
export const IMAGE_SIZES = {
  THUMBNAIL: { width: 100, height: 100 },
  CARD:      { width: 400, height: 400 },
  HERO:      { width: 1200 },
  PREVIEW:   { width: 800 },
};
