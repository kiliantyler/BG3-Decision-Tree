// components/sidebar/SearchBar.jsx
import React, { useEffect } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  // Add CSS for placeholder styling
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    // Add the CSS rules
    style.textContent = `
      .search-input::placeholder {
        color: var(--comment);
        opacity: 0.8;
      }
    `;
    // Append to document head
    document.head.appendChild(style);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        placeholder="Search decisions..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '12px',
          borderRadius: '4px',
          border: `1px solid var(--border)`,
          boxSizing: 'border-box',
          backgroundColor: `var(--selection)`,
          color: `var(--foreground)`,
        }}
      />
    </div>
  );
};

export default SearchBar;
