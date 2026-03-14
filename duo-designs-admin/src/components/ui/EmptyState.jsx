/** @file EmptyState.jsx */
import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ message = 'No items found Matching your criteria.', subtext }) => (
  <div style={{ textAlign: 'center', padding: '64px 32px', background: '#111', border: '1px dashed #222' }}>
    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', letterSpacing: '1px', color: 'var(--gray)', marginBottom: '8px' }}>
      {message.toUpperCase()}
    </div>
    {subtext && (
      <div style={{ fontSize: '13px', color: '#444' }}>
        {subtext}
      </div>
    )}
  </div>
);

EmptyState.propTypes = {
  message: PropTypes.string,
  subtext: PropTypes.string
};

export default EmptyState;
