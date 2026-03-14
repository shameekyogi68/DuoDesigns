/** @file SearchBar.jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

/**
 * @component SearchBar
 * @description Renders a search input with a magnifying glass button.
 */
const SearchBar = ({ value, onChange, placeholder = 'Search...', onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">
        <Search size={14} />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func
};

export default SearchBar;
