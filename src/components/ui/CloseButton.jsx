// components/ui/CloseButton.jsx
import React, { useState } from 'react';
import { CloseIcon } from '../icons';

/**
 * A specialized close button component for nodes
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.title - Tooltip text
 * @param {string} props.ariaLabel - Accessibility label
 * @returns {React.ReactElement} - The close button component
 */
const CloseButton = ({ onClick, title = 'Remove node', ariaLabel = 'Remove node' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
      title={title}
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        width: '22px',
        height: '22px',
        backgroundColor: isHovered ? 'rgba(244, 67, 54, 0.4)' : 'rgba(244, 67, 54, 0.2)',
        border: 'none',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        padding: 0,
        transition: 'all 0.2s ease',
      }}
    >
      <CloseIcon color="#ffffff" size={14} />
    </button>
  );
};

export default CloseButton;
