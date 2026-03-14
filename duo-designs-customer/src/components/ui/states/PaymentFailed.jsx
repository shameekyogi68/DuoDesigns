/**
 * @file         PaymentFailed.jsx
 * @description  Visual feedback component for failed payment transactions.
 *
 * @module       components/ui/states/PaymentFailed
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const PaymentFailed = () => {
  return (
    <div className="container section-padding" style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '48px', marginBottom: '12px' }}>PAYMENT FAILED</h1>
      <p style={{ color: 'var(--gray)', marginBottom: '32px' }}>We couldn't process your payment. Please try again.</p>
      <Link to={ROUTES.CART} className="btn-primary">Back to Cart</Link>
    </div>
  );
};

export default PaymentFailed;
