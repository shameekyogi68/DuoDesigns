/** @file StatusBadge.jsx */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @component StatusBadge
 * @description Renders a status badge with predefined styles.
 */
const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase() || 'placed';
  return (
    <span className={`status-badge s-${s}`}>
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusBadge;
