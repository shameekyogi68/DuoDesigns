/**
 * @file         APIError.jsx
 * @description  Error state component for failed API requests.
 *
 * @module       components/ui/states/APIError
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import PropTypes from 'prop-types';

const APIError = ({ message = 'Unable to load data. Please check your connection.', onRetry }) => {
  return (
    <div className="error-state" style={{ padding: '60px 20px', textAlign: 'center', border: '2px solid var(--error)', background: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-md)', maxWidth: '500px', margin: '40px auto' }}>
      <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '28px', marginBottom: '8px' }}>CONNECTION ERROR</h3>
      <p style={{ color: 'var(--gray)', marginBottom: '24px' }}>{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-primary">Try Again</button>}
    </div>
  );
};

APIError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired
};

export default APIError;
