// components/ui/ThemeToggle.jsx
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MoonIcon, SunIcon } from '../icons';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const themeToggleStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'var(--nodeBackground)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    width: '40px',
    height: '40px',
  };

  // Apply dark theme specific styles
  const getThemeSpecificStyles = () => {
    if (theme === 'dark') {
      return {
        backgroundColor: 'var(--currentLine)',
        borderColor: isHovered ? 'var(--purple)' : 'var(--border)',
      };
    }
    return {};
  };

  // Apply hover styles
  const getHoverStyles = () => {
    if (isHovered) {
      return {
        backgroundColor: 'var(--selection)',
        transform: 'scale(1.05)',
      };
    }
    return {};
  };

  return (
    <button
      style={{
        ...themeToggleStyle,
        ...getThemeSpecificStyles(),
        ...getHoverStyles(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        transition: 'all 0.2s ease',
      }}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title="Theme Toggle"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
