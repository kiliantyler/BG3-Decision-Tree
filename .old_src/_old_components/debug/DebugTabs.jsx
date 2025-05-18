// components/debug/DebugTabs.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/colorThemes';

/**
 * Tab navigation for the debug panel
 */
const DebugTabs = ({ tabIndex, setTabIndex }) => {
  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  // Tab definitions
  const tabs = [
    { id: 0, label: 'Tree Stats' },
    { id: 1, label: 'Decisions' },
    { id: 2, label: 'Canvas Data' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: `1px solid ${themeColors.border}`,
        background: themeColors.currentLine,
      }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setTabIndex(tab.id)}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            background: tabIndex === tab.id ? themeColors.background : 'transparent',
            borderBottom: tabIndex === tab.id ? `2px solid ${themeColors.purple}` : 'none',
            cursor: 'pointer',
            color: themeColors.foreground,
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default DebugTabs;
