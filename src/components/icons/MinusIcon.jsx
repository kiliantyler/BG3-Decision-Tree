// components/icons/MinusIcon.jsx
import React from 'react';

const MinusIcon = ({ size = 24, color = 'currentColor', ...props }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          display: 'block',
          overflow: 'visible',
        }}
        {...props}
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default MinusIcon;
