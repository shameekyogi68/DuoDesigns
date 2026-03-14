/** @file FilterChips.jsx */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @component FilterChips
 * @description Renders a row of interactive filter chips.
 */
const FilterChips = ({ options, activeValue, onChange }) => {
  return (
    <div className="filter-row">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`filter-chip ${activeValue === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

FilterChips.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  activeValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FilterChips;
