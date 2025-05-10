// components/sidebar/SidebarContent.jsx
import React from 'react';
import CategorySection from './CategorySection';

// Debug flag - set to true to see detailed logging
const DEBUG = true;

const SidebarContent = ({ categoriesToShow, isDecisionAvailable, onDragStart, displayCount }) => {
  // Return content based on filtered data
  if (displayCount === 0) {
    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          color: '#999',
        }}
      >
        No decisions match the current filters.
      </div>
    );
  }

  // Render categories and items
  return Object.entries(categoriesToShow).map(([category, items]) => (
    <CategorySection
      key={category}
      category={category}
      items={items}
      isDecisionAvailable={isDecisionAvailable}
      onDragStart={onDragStart}
    />
  ));
};

export default SidebarContent;
