import React from 'react';

const CloseIcon = ({ color = '#ffffff', size = 16 }) => {
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
      >
        {/* X shape */}
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
