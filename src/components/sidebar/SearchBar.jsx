// components/sidebar/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search decisions..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="search-input"
      style={{
        width: '95%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
      }}
    />
  );
};

export default SearchBar;
