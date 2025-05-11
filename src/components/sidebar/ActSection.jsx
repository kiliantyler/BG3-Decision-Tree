// components/sidebar/ActSection.jsx
import React, { useState } from 'react';
import CategorySection from './CategorySection';
import SectionTitle from './SectionTitle';

const ActSection = ({ act, categories, isDecisionAvailable, onDragStart }) => {
  // State to track if the act section is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(true);

  // Toggle expanded/collapsed state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="act-section">
      <SectionTitle
        title={act}
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        isActHeader={true}
      />
      {isExpanded && (
        <div className="act-content">
          {Object.entries(categories).map(([category, items]) => (
            <CategorySection
              key={category}
              category={category}
              items={items}
              isDecisionAvailable={isDecisionAvailable}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActSection;
