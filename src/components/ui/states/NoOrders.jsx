/**
 * @file         NoOrders.jsx
 * @description  Feedback for when a user has no previous order history.
 *
 * @module       components/ui/states/NoOrders
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const NoOrders = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '24px', marginBottom: '8px' }}>NO ORDERS YET</h3>
      <p style={{ color: 'var(--gray)', marginBottom: '24px' }}>When you place an order, it will appear here.</p>
      <Link to={ROUTES.SHOP} className="btn-outline">Go to Shop</Link>
    </div>
  );
};

export default NoOrders;
