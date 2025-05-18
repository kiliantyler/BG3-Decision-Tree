// components/sidebar/CategorySection.jsx
import React, { useEffect } from 'react';
import DecisionNode from './DecisionNode';
import SectionTitle from './SectionTitle';

const CategorySection = ({
  category,
  items,
  isDecisionAvailable,
  onDragStart,
  isExpanded = true,
  onToggleExpanded,
}) => {
  // Log when isExpanded changes
  useEffect(() => {
    console.log(`CategorySection ${category} - isExpanded changed to:`, isExpanded);
  }, [isExpanded, category]);

  return (
    <div className="decision-category">
      <SectionTitle title={category} isExpanded={isExpanded} onToggle={onToggleExpanded} />
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
