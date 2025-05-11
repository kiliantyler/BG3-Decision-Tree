// components/debug/DebugToggleButton.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/colorThemes';

/**
 * Toggle button for the debug panel
 */
const DebugToggleButton = ({ isVisible, togglePanel }) => {
  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  return (
    <button
      onClick={togglePanel}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        background: themeColors.currentLine,
        color: themeColors.foreground,
        border: `1px solid ${themeColors.border}`,
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
        boxShadow: `0 2px 10px ${
          themeColors.theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'
        }`,
      }}
    >
      {isVisible ? 'Close Debug' : 'Debug'}
    </button>
  );
};

export default DebugToggleButton;
