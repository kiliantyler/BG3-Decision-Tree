import React from 'react';

const SearchIcon = ({ color = '#0dcaf0', size = 24 }) => {
  // Use inline SVG with explicit styling
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
        {/* Improved magnifying glass */}
        <g transform="translate(0.5, 0.5)">
          {/* Glass part - slightly smaller and positioned better */}
          <circle
            cx="10"
            cy="10"
            r="6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Handle - thicker and angled better */}
          <line
            x1="14.5"
            y1="14.5"
            x2="19.5"
            y2="19.5"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Reflection highlight */}
          <path
            d="M7.5 7.5 Q8 6, 9.5 6.5"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
};

export default SearchIcon;
