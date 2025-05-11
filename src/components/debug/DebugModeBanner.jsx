// components/debug/DebugModeBanner.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/colorThemes';

/**
 * Banner displayed at the top of the debug panel
 */
const DebugModeBanner = () => {
  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  return (
    <div
      style={{
        padding: '4px 8px',
        background: themeColors.red,
        color: theme === 'dark' ? themeColors.background : 'white',
        fontSize: '12px',
        textAlign: 'center',
      }}
    >
      Debug Mode - Press CTRL+SHIFT+D to deactivate
    </div>
  );
};

export default DebugModeBanner;
