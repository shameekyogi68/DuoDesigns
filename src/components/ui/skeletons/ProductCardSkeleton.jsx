/**
 * @file         ProductCardSkeleton.jsx
 * @description  Skeleton loader for product cards.
 *
 * @module       components/ui/skeletons/ProductCardSkeleton
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="skeleton-card" style={{ border: '1.5px solid var(--light-gray)', paddingBottom: '20px', background: 'var(--white)' }}>
      <div className="animate-shimmer" style={{ height: '320px', background: '#eee', marginBottom: '20px' }}></div>
      <div className="animate-shimmer" style={{ height: '16px', background: '#eee', margin: '0 20px 10px', width: '40%' }}></div>
      <div className="animate-shimmer" style={{ height: '24px', background: '#eee', margin: '0 20px 10px', width: '80%' }}></div>
      <div className="animate-shimmer" style={{ height: '16px', background: '#eee', margin: '0 20px 10px', width: '30%' }}></div>
    </div>
  );
};

export default ProductCardSkeleton;
