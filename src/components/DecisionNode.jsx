// components/DecisionNode.jsx - Enhanced with focus capability
import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const DecisionNode = ({ data, isConnectable, id }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChangingDecision, setIsChangingDecision] = useState(false);
  const reactFlowInstance = useReactFlow();

  // Initialize selected option from data if available
  useEffect(() => {
    if (data.selectedOption && !selectedOption) {
      setSelectedOption(data.selectedOption);
    }
  }, [data.selectedOption]);

  // Determine if this is an optional or required node
  const isOptional = data.optional === true;
  const isRequired = data.required === true && !data.optional;

  // Handle option selection and completion
  const handleOptionSelect = option => {
    // If changing a decision, first confirm
    if (selectedOption && !isChangingDecision) {
      setIsChangingDecision(true);
      return;
    }

    // Reset the changing state
    setIsChangingDecision(false);

    // Set the new option
    setSelectedOption(option);

    // If the node has a completion callback, call it
    if (data.onComplete && typeof data.onComplete === 'function') {
      data.onComplete(data.id, option, selectedOption !== null);
    }
  };

  // Cancel decision change
  const cancelDecisionChange = () => {
    setIsChangingDecision(false);
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle node removal
  const handleRemoveNode = () => {
    if (data.onRemove && typeof data.onRemove === 'function') {
      data.onRemove(data.id);
    }
  };

  // Focus on this node
  const handleFocus = useCallback(() => {
    if (reactFlowInstance) {
      // Get the node's position
      const node = reactFlowInstance.getNode(id);
      if (node) {
        // Get current viewport to preserve zoom level
        const { zoom } = reactFlowInstance.getViewport();

        // Get the container element to calculate proper dimensions
        const container = document.querySelector('.reactflow-wrapper');
        if (!container) {
          console.warn('Could not find ReactFlow container');
          return;
        }

        // Get the dimensions of the container
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Calculate the center point with a slight adjustment for the sidebar
        const effectiveCenterX = containerWidth / 2;

        // Center view on this node with animation, keeping current zoom level
        reactFlowInstance.setViewport(
          {
            x: -node.position.x * zoom + effectiveCenterX,
            y: -node.position.y * zoom + containerHeight / 2,
            zoom: zoom, // Preserve current zoom level
          },
          { duration: 800 }
        );
      }
    }
  }, [reactFlowInstance, id]);

  // Background color based on type and completion status
  const getBgColor = () => {
    if (selectedOption) return '#d4edda'; // Completed
    if (isOptional) return '#e0e0e0'; // Optional
    return '#ffb84d'; // Required
  };

  // Border color based on type and completion status
  const getBorderColor = () => {
    if (selectedOption) return '#c3e6cb'; // Completed
    if (isOptional) return '#bebebe'; // Optional
    return '#ff9900'; // Required
  };

  return (
    <div
      className={`decision-node ${selectedOption ? 'completed' : ''} ${
        isExpanded ? 'expanded' : ''
      } ${isOptional ? 'optional' : 'required'}`}
      style={{
        padding: '15px',
        borderRadius: '8px',
        background: getBgColor(),
        border: `2px solid ${getBorderColor()}`,
        width: isExpanded ? '280px' : '220px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative', // For remove button positioning
      }}
    >
      {/* Remove button - only show for optional nodes or when nothing is selected yet */}
      {(isOptional || !selectedOption) && (
        <button
          onClick={handleRemoveNode}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: '#f44336',
            color: 'white',
            border: '2px solid #fff',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 2px 3px rgba(0,0,0,0.2)',
          }}
          title="Remove node"
        >
          ×
        </button>
      )}

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
        style={{ background: '#555', width: '10px', height: '10px' }}
        isConnectable={isConnectable}
      />

      <div className="node-content">
        {/* Header with expand/collapse button */}
        <div
          className="node-header"
          style={{
            fontWeight: 'bold',
            marginBottom: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1 }}>{data.label}</div>

          {/* Type badge */}
          {isOptional && !selectedOption && (
            <span
              className="optional-badge"
              style={{
                background: '#bebebe',
                color: 'white',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                marginRight: '5px',
              }}
            >
              Optional
            </span>
          )}

          {isRequired && !selectedOption && (
            <span
              className="required-badge"
              style={{
                background: '#ff9900',
                color: 'white',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                marginRight: '5px',
              }}
            >
              Required
            </span>
          )}

          {/* Completion badge */}
          {selectedOption && (
            <span
              className="completed-badge"
              style={{
                background: '#28a745',
                color: 'white',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                marginRight: '5px',
              }}
            >
              Completed
            </span>
          )}

          {/* Expand/collapse button */}
          <button
            onClick={toggleExpanded}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              padding: '0 5px',
            }}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>

        {/* Description */}
        <div
          className="node-description"
          style={{
            fontSize: '0.85rem',
            marginBottom: '10px',
            lineHeight: '1.3',
          }}
        >
          {data.description}
        </div>

        {/* Decision change warning */}
        {isChangingDecision && (
          <div
            className="decision-warning"
            style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '10px',
              fontSize: '0.85rem',
              border: '1px solid #ffeeba',
            }}
          >
            <strong>Warning:</strong> Changing this decision may remove connected nodes.
            <div
              style={{
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <button
                onClick={cancelDecisionChange}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setIsChangingDecision(false);
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: '1px solid #dc3545',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Change Decision
              </button>
            </div>
          </div>
        )}

        {/* Options section - show when not selected or when changing */}
        {data.options && data.options.length > 0 && (!selectedOption || isChangingDecision) && (
          <div
            className="node-options"
            style={{
              fontSize: '0.9rem',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '6px',
              padding: '8px 10px',
              marginTop: '10px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {isChangingDecision ? 'Select new option:' : 'Choose an option:'}
            </div>
            {data.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{
                  cursor: 'pointer',
                  padding: '5px 8px',
                  margin: '3px 0',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.border = isOptional ? '1px solid #bebebe' : '1px solid #ff9900';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  e.target.style.border = '1px solid transparent';
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* Selected option display */}
        {selectedOption && !isChangingDecision && (
          <div
            className="selected-option"
            style={{
              fontSize: '0.9rem',
              marginTop: '8px',
              padding: '8px',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '6px',
              border: '1px dashed #28a745',
            }}
          >
            <strong>You chose:</strong> {selectedOption}
            {/* Change decision button */}
            <button
              onClick={() => setIsChangingDecision(true)}
              style={{
                display: 'block',
                marginTop: '8px',
                padding: '4px 8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Change Decision
            </button>
          </div>
        )}

        {/* Metadata (prerequisites, unlocks) - only shown when expanded */}
        {isExpanded && (
          <div
            className="node-meta"
            style={{
              fontSize: '0.8rem',
              marginTop: '12px',
              color: '#555',
              borderTop: '1px dashed #ccc',
              paddingTop: '8px',
            }}
          >
            {data.prerequisites && data.prerequisites.length > 0 && (
              <div style={{ marginBottom: '5px' }}>
                <strong>Requires:</strong> {data.prerequisites.join(', ')}
              </div>
            )}
            {data.unlocks && data.unlocks.length > 0 && (
              <div>
                <strong>Unlocks:</strong> {data.unlocks.join(', ')}
              </div>
            )}
            <div style={{ marginTop: '5px' }}>
              <strong>Type:</strong> {isOptional ? 'Optional Side Quest' : 'Required Main Quest'}
            </div>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: '10px', height: '10px' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default React.memo(DecisionNode);
