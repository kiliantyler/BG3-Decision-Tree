// components/sidebar/DebugPanel.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/colorThemes';

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
  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  return (
    <div
      style={{
        margin: '20px 0',
        padding: '10px',
        backgroundColor: themeColors.currentLine,
        borderRadius: '4px',
        fontSize: '0.8rem',
        color: themeColors.comment,
        border: `1px solid ${themeColors.border}`,
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
