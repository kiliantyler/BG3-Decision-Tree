// components/sidebar/DebugPanel.jsx
import React from 'react';

const DebugPanel = ({
  showUnavailable,
  showRequired,
  showOptional,
  total,
  available,
  displayCount,
  categoriesCount,
  completedCount,
}) => {
  return (
    <div
      style={{
        margin: '20px 0',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        fontSize: '0.8rem',
        color: '#666',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Debug Info:</div>
      <div>
        Filter Settings:
        {showUnavailable ? ' Show Unavailable,' : ' Hide Unavailable,'}
        {showRequired ? ' Required,' : ''}
        {showOptional ? ' Optional' : ''}
      </div>
      <div>
        Decisions: {total} total, {available} available
      </div>
      <div>Displaying: {displayCount} decisions</div>
      <div>Categories: {categoriesCount}</div>
      <div>Completed Decisions: {completedCount}</div>
    </div>
  );
};

export default DebugPanel;
