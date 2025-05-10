import React from 'react';

const SunIcon = ({ color = '#9580ff', size = 24 }) => {
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
        {/* Cute sun face with a circle and rays */}
        <circle
          cx="12"
          cy="12"
          r="5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const radians = (angle * Math.PI) / 180;
          const innerX = 12 + 5.5 * Math.cos(radians);
          const innerY = 12 + 5.5 * Math.sin(radians);
          const outerX = 12 + 8 * Math.cos(radians);
          const outerY = 12 + 8 * Math.sin(radians);

          return (
            <line
              key={i}
              x1={innerX}
              y1={innerY}
              x2={outerX}
              y2={outerY}
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default SunIcon;
