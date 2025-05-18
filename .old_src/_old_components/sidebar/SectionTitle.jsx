// components/sidebar/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({ title, isExpanded, onToggle, isActHeader = false }) => {
  // Extract location name from category if it's not an Act header
  const displayTitle = isActHeader ? title : title.split(' - ').pop();

  return (
    <div
      className={`section-title ${isActHeader ? 'act-header' : 'location-header'}`}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <h4 className={isActHeader ? 'act-title' : ''}>
        {displayTitle}
        <span className="collapse-icon">{isExpanded ? '−' : '+'}</span>
      </h4>
    </div>
  );
};

export default SectionTitle;
