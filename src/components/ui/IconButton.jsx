// components/ui/IconButton.jsx
import React, { forwardRef, useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * A reusable icon button component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The icon to display (usually an SVG)
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.title - Tooltip text
 * @param {string} props.ariaLabel - Accessibility label
 * @param {string} props.position - Position of the button ('top-left', 'top-right', 'bottom-left', 'bottom-right')
 * @param {string} props.borderColor - Border color in light mode
 * @param {string} props.darkModeBorderColor - Border color in dark mode
 * @param {string} props.hoverBorderColor - Border color on hover in dark mode
 * @param {Object} props.style - Additional inline styles
 * @param {React.Ref} ref - Forwarded ref
 * @returns {React.ReactElement} - The icon button component
 */
const IconButton = forwardRef((props, ref) => {
  const {
    children,
    onClick,
    title,
    ariaLabel,
    position = 'top-left',
    borderColor = 'var(--border)',
    darkModeBorderColor = 'var(--border)',
    hoverBorderColor = 'var(--purple)',
    style = {},
  } = props;

  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const internalButtonRef = useRef(null);
  const buttonRef = ref || internalButtonRef;

  // Determine position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return { top: '10px', left: '10px' };
      case 'top-right':
        return { top: '10px', right: '10px' };
      case 'bottom-left':
        return { bottom: '10px', left: '10px' };
      case 'bottom-right':
        return { bottom: '10px', right: '10px' };
      case 'fit-view': // Special case for fit view button
        return { top: '10px', left: '60px' };
      default:
        return { top: '10px', left: '10px' };
    }
  };

  const baseStyle = {
    position: 'absolute',
    backgroundColor: 'var(--nodeBackground)',
    border: `1px solid ${borderColor}`,
    borderRadius: '8px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 4px var(--boxShadow)',
    zIndex: 10,
    transition: 'all 0.2s ease',
    outline: 'none', // Remove default focus outline
    ...getPositionStyles(),
    ...style,
  };

  // Apply dark theme specific styles
  const getThemeSpecificStyles = () => {
    if (theme === 'dark') {
      return {
        backgroundColor: 'var(--currentLine)',
        borderColor: isHovered || isFocused ? hoverBorderColor : darkModeBorderColor,
      };
    }
    return {};
  };

  // Apply hover/focus styles
  const getInteractionStyles = () => {
    if (isHovered || isFocused) {
      return {
        backgroundColor: 'var(--selection)',
        transform: 'scale(1.05)',
      };
    }
    return {};
  };

  // Handle click and blur focus
  const handleClick = e => {
    if (onClick) {
      onClick(e);
    }
    // Blur the button after click to remove focus
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={ariaLabel || title}
      title={title}
      style={{
        ...baseStyle,
        ...getThemeSpecificStyles(),
        ...getInteractionStyles(),
      }}
    >
      {children}
    </button>
  );
});

export default IconButton;
