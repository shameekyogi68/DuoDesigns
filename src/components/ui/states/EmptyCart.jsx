/**
 * @file         EmptyCart.jsx
 * @description  Visual state for when the shopping cart has no items.
 *
 * @module       components/ui/states/EmptyCart
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const EmptyCart = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</div>
      <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '36px', marginBottom: '12px' }}>YOUR CART IS EMPTY</h2>
      <p style={{ color: 'var(--gray)', marginBottom: '32px' }}>Looks like you haven't added anything to your cart yet.</p>
      <Link to={ROUTES.SHOP} className="btn-primary">Start Shopping</Link>
    </div>
  );
};

export default EmptyCart;
