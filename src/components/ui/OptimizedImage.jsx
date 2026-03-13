/**
 * @file         OptimizedImage.jsx
 * @description  Image component that handles lazy loading, Cloudinary optimization, and placeholders.
 * @module       components/ui/OptimizedImage
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React, { useState } from 'react';
import { getOptimizedImage } from '../../utils/imageUrl';
import './OptimizedImage.css';

const OptimizedImage = ({ 
  src, 
  alt, 
  size = {}, 
  className = '', 
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Get optimized version using our utility
  const optimizedSrc = getOptimizedImage(src, size);
  
  // Create a tiny blurred placeholder URL
  const placeholderSrc = getOptimizedImage(src, { width: 30, quality: 10, crop: 'scale' });

  return (
    <div className={`image-wrapper ${className} ${isLoaded ? 'loaded' : 'loading'}`}>
      {/* Tiny placeholder for the blur effect */}
      {!isLoaded && src && src.includes('cloudinary.com') && (
        <img 
          src={placeholderSrc} 
          alt={alt} 
          className="image-placeholder"
        />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`main-image ${isLoaded ? 'visible' : 'hidden'}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
