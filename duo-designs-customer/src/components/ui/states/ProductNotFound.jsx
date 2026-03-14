/**
 * @file         ProductNotFound.jsx
 * @description  Error state for when a specific product ID does not exist.
 *
 * @module       components/ui/states/ProductNotFound
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const ProductNotFound = () => {
  return (
    <div className="container section-padding" style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '48px', marginBottom: '12px' }}>PRODUCT NOT FOUND</h1>
      <Link to={ROUTES.SHOP} className="btn-primary">Browse All Products</Link>
    </div>
  );
};

export default ProductNotFound;
