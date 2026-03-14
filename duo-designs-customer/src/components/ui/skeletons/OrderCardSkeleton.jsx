/**
 * @file         OrderCardSkeleton.jsx
 * @description  Skeleton loader for items in the order history list.
 *
 * @module       components/ui/skeletons/OrderCardSkeleton
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';

const OrderCardSkeleton = () => {
  return (
    <div className="skeleton-order" style={{ padding: '24px', border: '1.5px solid var(--light-gray)', borderRadius: 'var(--radius-md)', marginBottom: '16px', background: 'var(--white)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div className="animate-shimmer" style={{ width: '120px', height: '24px', background: '#eee' }}></div>
        <div className="animate-shimmer" style={{ width: '80px', height: '24px', background: '#eee' }}></div>
      </div>
      <div className="animate-shimmer" style={{ width: '100%', height: '60px', background: '#f5f5f5', marginBottom: '16px' }}></div>
    </div>
  );
};

export default OrderCardSkeleton;
