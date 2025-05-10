// components/sidebar/CategorySection.jsx
import React from 'react';
import DecisionNode from './DecisionNode';
import SectionTitle from './SectionTitle';

const CategorySection = ({ category, items, isDecisionAvailable, onDragStart }) => {
  return (
    <div className="decision-category">
      <SectionTitle title={category} />
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
    </div>
  );
};

export default CategorySection;
