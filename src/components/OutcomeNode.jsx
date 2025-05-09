import React from 'react';
import { Handle, Position } from 'reactflow';

const OutcomeNode = ({ data }) => {
  return (
    <div
      className="outcome-node"
      style={{
        padding: '10px',
        borderRadius: '5px',
        background: '#a3cfbb',
        border: '1px solid #68b088',
        width: '180px',
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div
        className="node-header"
        style={{ fontWeight: 'bold', marginBottom: '5px' }}
      >
        {data.label}
      </div>

      <div className="node-description" style={{ fontSize: '0.8rem' }}>
        {data.description}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default React.memo(OutcomeNode);
