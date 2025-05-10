// components/ui/FitViewButton.jsx
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SearchIcon } from '../icons';

const FitViewButton = ({ onClick }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const fitViewButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '60px',
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
        ...fitViewButtonStyle,
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
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="View all nodes"
      aria-label="View all nodes"
    >
      <SearchIcon />
    </button>
  );
};

export default FitViewButton;
