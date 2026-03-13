/**
 * @file         ProductDetailSkeleton.jsx
 * @description  Skeleton loader for the Product Details page.
 *
 * @module       components/ui/skeletons/ProductDetailSkeleton
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="container section-padding" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
      <div className="animate-shimmer" style={{ height: '600px', background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}></div>
      <div>
        <div className="animate-shimmer" style={{ width: '40%', height: '20px', background: '#eee', marginBottom: '16px' }}></div>
        <div className="animate-shimmer" style={{ width: '80%', height: '48px', background: '#eee', marginBottom: '24px' }}></div>
        <div className="animate-shimmer" style={{ width: '100%', height: '56px', background: '#eee', marginTop: '40px' }}></div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
