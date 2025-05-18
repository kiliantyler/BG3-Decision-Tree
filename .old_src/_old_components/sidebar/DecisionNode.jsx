// components/sidebar/DecisionNode.jsx
import React from 'react';

// Debug flag - set to true to see detailed logging
const DEBUG = true;

const DecisionNode = ({ item, isAvailable, onDragStart }) => {
  const isOptional = item.optional === true;
  const isRequired = item.required === true && !item.optional;

  // Enhanced styling for available/unavailable items
  const itemStyle = {
    padding: '10px',
    margin: '8px 0',
    backgroundColor: isAvailable ? (isOptional ? '#e0e0e0' : '#ffb84d') : '#f8f8f8',
    border: isAvailable ? `1px solid ${isOptional ? '#bebebe' : '#ff9900'}` : '1px dashed #999',
    borderRadius: '4px',
    cursor: isAvailable ? 'grab' : 'not-allowed',
    userSelect: 'none',
    opacity: isAvailable ? 1 : 0.6,
    boxShadow: 'none',
    position: 'relative',
    transition: 'all 0.2s ease',
  };

  const handleDragStart = event => {
    onDragStart(event, item.type || 'decision', item);
  };

  const handleMouseEnter = e => {
    if (isAvailable) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
  };

  const handleMouseLeave = e => {
    if (isAvailable) {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  return (
    <div
      key={item.id}
      className={`decision-item ${isAvailable ? 'available' : 'unavailable'} ${
        isOptional ? 'optional' : 'required'
      }`}
      draggable={true} // Always set draggable, but we'll prevent it in onDragStart if unavailable
      onDragStart={handleDragStart}
      style={itemStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        <div className="item-title" style={{ fontWeight: 'bold' }}>
          {item.label}
        </div>

        {/* Status badges */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {!isAvailable && (
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                backgroundColor: '#999',
                color: '#fff',
                borderRadius: '10px',
              }}
            >
              Locked
            </span>
          )}
          {isOptional && (
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                backgroundColor: '#bebebe',
                color: '#fff',
                borderRadius: '10px',
              }}
            >
              Optional
            </span>
          )}
          {isRequired && (
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                backgroundColor: '#ff9900',
                color: '#fff',
                borderRadius: '10px',
              }}
            >
              Required
            </span>
          )}
        </div>
      </div>

      <div className="item-description" style={{ fontSize: '0.8rem', color: '#666' }}>
        {item.description?.substring(0, 60)}...
      </div>

      {/* Show prerequisites if not available */}
      {!isAvailable && item.prerequisites && item.prerequisites.length > 0 && (
        <div
          className="item-prerequisites"
          style={{
            fontSize: '0.7rem',
            marginTop: '5px',
            color: '#999',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Requires:</span> {item.prerequisites.join(', ')}
        </div>
      )}
    </div>
  );
};

export default DecisionNode;
