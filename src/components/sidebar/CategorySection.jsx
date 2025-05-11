// components/sidebar/CategorySection.jsx
import React, { useState } from 'react';
import DecisionNode from './DecisionNode';
import SectionTitle from './SectionTitle';

const CategorySection = ({ category, items, isDecisionAvailable, onDragStart }) => {
  // State to track if the section is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(true);

  // Toggle expanded/collapsed state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="decision-category">
      <SectionTitle title={category} isExpanded={isExpanded} onToggle={toggleExpanded} />
      {isExpanded && (
        <div className="decision-items">
          {items.map(item => (
            <DecisionNode
              key={item.id}
              item={item}
              isAvailable={isDecisionAvailable(item.id)}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
