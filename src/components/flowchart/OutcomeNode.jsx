// components/flowchart/OutcomeNode.jsx
import React from 'react';
import BaseNode from './BaseNode';

const OutcomeNode = ({ data, isConnectable }) => {
  // Handle node removal if needed
  const handleRemoveNode = () => {
    if (data.onRemove && typeof data.onRemove === 'function') {
      data.onRemove(data.id);
    }
  };

  return (
    <BaseNode
      data={data}
      isConnectable={isConnectable}
      className="outcome-node"
      style={{
        background: '#a3cfbb',
        border: '1px solid #68b088',
        width: '180px',
        padding: '12px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      onRemove={handleRemoveNode}
      showRemoveButton={data.optional === true}
      isExpandable={true}
      showBadges={true}
      nodeType="outcome"
    />
  );
};

export default React.memo(OutcomeNode);
