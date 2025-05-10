// components/ui/IconButton.jsx
import React from 'react';

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
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel || title}
      title={title}
      style={style}
    >
      {children}
    </button>
  );
};

export default IconButton;
