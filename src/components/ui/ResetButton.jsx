// components/ui/ResetButton.jsx
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ResetIcon } from '../icons';

const ResetButton = ({ onClick }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const resetButtonStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    backgroundColor: 'var(--nodeBackground)',
    border: '1px solid var(--red)',
    borderRadius: '8px',
    width: '40px',
    height: '40px',
  };

  // Apply dark theme specific styles
  const getThemeSpecificStyles = () => {
    if (theme === 'dark') {
      return {
        backgroundColor: 'var(--currentLine)',
        borderColor: isHovered ? 'var(--red)' : 'var(--border)',
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
        ...resetButtonStyle,
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
      title="Reset all decisions"
      aria-label="Reset all decisions"
    >
      <ResetIcon />
    </button>
  );
};

export default ResetButton;
