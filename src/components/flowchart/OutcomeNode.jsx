// components/flowchart/OutcomeNode.jsx
import React, { useCallback } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const OutcomeNode = ({ data, id, isConnectable }) => {
  const reactFlowInstance = useReactFlow();

  // Focus on this node
  const handleFocus = useCallback(() => {
    if (reactFlowInstance) {
      // Get the node's position
      const node = reactFlowInstance.getNode(id);
      if (node) {
        // Get current viewport to preserve zoom level
        const { zoom } = reactFlowInstance.getViewport();

        // Hard-coded sidebar width - this is the offset we need to apply
        const sidebarWidth = 300;

        // Center view on this node with animation, keeping current zoom level
        // Add half the sidebar width to offset the center point to the right
        reactFlowInstance.setViewport(
          {
            x: -node.position.x * zoom + window.innerWidth / 2 + sidebarWidth / 2,
            y: -node.position.y * zoom + window.innerHeight / 2,
            zoom: zoom, // Preserve current zoom level
          },
          { duration: 800 }
        );
      }
    }
  }, [reactFlowInstance, id]);

  return (
    <div
      className="outcome-node"
      style={{
        padding: '10px',
        borderRadius: '5px',
        background: '#a3cfbb',
        border: '1px solid #68b088',
        width: '180px',
        position: 'relative', // For focus button positioning
      }}
    >
      {/* Focus button */}
      <button
        onClick={handleFocus}
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: '#4285f4',
          color: 'white',
          border: '2px solid #fff',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 2px 3px rgba(0,0,0,0.2)',
        }}
        title="Focus on this node"
      >
        🔍
      </button>

      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555', width: '8px', height: '8px' }}
        isConnectable={isConnectable}
      />

      <div className="node-header" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        {data.label}
      </div>

      <div className="node-description" style={{ fontSize: '0.8rem' }}>
        {data.description}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: '8px', height: '8px' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default React.memo(OutcomeNode);
