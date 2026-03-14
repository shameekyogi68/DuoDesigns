/** @file StatCard.jsx */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @component StatCard
 * @description Renders a statistics card with a label, value, trend, and icon.
 */
const StatCard = ({ label, value, trend, trendValue, icon: Icon, color = 'var(--accent)' }) => {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-num">{value}</div>
      {(trend || trendValue) && (
        <div className={`stat-change ${trend === 'up' ? 'up' : 'down'}`}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </div>
      )}
      {Icon && (
        <div className="stat-icon" style={{ color }}>
          <Icon size={28} />
        </div>
      )}
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.oneOf(['up', 'down']),
  trendValue: PropTypes.string,
  icon: PropTypes.elementType,
  color: PropTypes.string
};

export default StatCard;
