// components/flowchart/BaseNode.jsx
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import CloseButton from '../ui/CloseButton';

/**
 * Base node component with common functionality for all node types
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - Node data
 * @param {string} props.data.label - Node label
 * @param {string} props.data.description - Node description
 * @param {boolean} props.isConnectable - Whether the node can be connected
 * @param {string} props.className - Additional class names
 * @param {Object} props.style - Additional inline styles
 * @param {React.ReactNode} props.children - Child components to render inside the node
 * @param {Function} props.onRemove - Function to call when the node is removed
 * @param {boolean} props.showRemoveButton - Whether to show the remove button
 * @param {boolean} props.isExpandable - Whether the node can be expanded
 * @param {boolean} props.showBadges - Whether to show badges
 * @param {string} props.nodeType - Type of node ('decision', 'outcome')
 * @returns {React.ReactElement} - The base node component
 */
const BaseNode = ({
  data,
  isConnectable,
  className = '',
  style = {},
  children,
  onRemove,
  showRemoveButton = false,
  isExpandable = false,
  showBadges = false,
  nodeType = 'decision',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine if this is an optional or required node
  const isOptional = data.optional === true;
  const isRequired = data.required === true && !data.optional;
  const isCompleted = data.selectedOption !== undefined;

  // Handle node removal
  const handleRemoveNode = () => {
    if (onRemove && typeof onRemove === 'function') {
      onRemove(data.id);
    }
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Get node content
  const getNodeContent = () => {
    return (
      <>
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
          {showBadges && (
            <>
              {isOptional && !isCompleted && (
                <span
                  className="optional-badge"
                  style={{
                    background: 'var(--optionalBorder)',
                    color: 'var(--badgeText)',
                    borderRadius: '12px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    marginRight: '5px',
                  }}
                >
                  Optional
                </span>
              )}

              {isRequired && !isCompleted && (
                <span
                  className="required-badge"
                  style={{
                    background: 'var(--requiredBorder)',
                    color: 'var(--badgeText)',
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
              {isCompleted && (
                <span
                  className="completed-badge"
                  style={{
                    background: 'var(--green)',
                    color: 'var(--badgeText)',
                    borderRadius: '12px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    marginRight: '5px',
                  }}
                >
                  Completed
                </span>
              )}
            </>
          )}

          {/* Expand/collapse button */}
          {isExpandable && (
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
          )}
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

        {/* Custom content */}
        {children}

        {/* Metadata (prerequisites, unlocks) - only shown when expanded */}
        {isExpandable && isExpanded && data.prerequisites && (
          <div
            className="node-meta"
            style={{
              fontSize: '0.8rem',
              marginTop: '12px',
              color: 'var(--metaText)',
              borderTop: '1px dashed var(--metaBorder)',
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
            {nodeType === 'decision' && (
              <div style={{ marginTop: '5px' }}>
                <strong>Type:</strong> {isOptional ? 'Optional Side Quest' : 'Required Main Quest'}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`base-node ${className} ${isExpanded ? 'expanded' : ''}`}
      style={{
        padding: '10px',
        borderRadius: '5px',
        position: 'relative',
        transition: 'all 0.3s ease',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Remove button - only show when specified and hovered */}
      {showRemoveButton && isHovered && <CloseButton onClick={handleRemoveNode} />}

      <Handle
        type="target"
        position={Position.Top}
        style={{ background: 'var(--handleBackground)', width: '8px', height: '8px' }}
        isConnectable={isConnectable}
      />

      <div className="node-content">{getNodeContent()}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: 'var(--handleBackground)', width: '8px', height: '8px' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default React.memo(BaseNode);
