// components/ui/IconButton.jsx
import React, { useState } from 'react';

/**
 * A reusable icon button component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The icon to display (usually an SVG)
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.title - Tooltip text
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.className - Additional CSS class name
 * @param {Object} props.style - Additional inline styles
 * @returns {React.ReactElement} - The icon button component
 */
const IconButton = ({ children, onClick, title, ariaLabel, className = '', style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    transition: 'all 0.2s ease',
    ...style,
  };

  const hoverStyle = isHovered
    ? {
        backgroundColor: 'var(--selection)',
        transform: 'scale(1.05)',
      }
    : {};

  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel || title}
      title={title}
      style={{
        ...baseStyle,
        ...hoverStyle,
      }}
    >
      {children}
    </button>
  );
};

export default IconButton;
