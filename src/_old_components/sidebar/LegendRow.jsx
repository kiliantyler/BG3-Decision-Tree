// components/sidebar/LegendRow.jsx
import React from 'react';

const LegendRow = ({ color, borderColor, isDashed, opacity, label, isChecked, onToggle }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '4px',
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: color,
            border: isDashed ? `1px dashed ${borderColor}` : `1px solid ${borderColor}`,
            borderRadius: '3px',
            display: 'inline-block',
            marginRight: '6px',
            opacity: opacity || 1,
          }}
        ></span>
        <span>{label}</span>
      </div>
      <div className="checkbox-wrapper-6" style={{ transform: 'scale(0.7)' }}>
        <input
          className="tgl tgl-light"
          id={`cb-${label.toLowerCase().replace(/\s+/g, '-')}`}
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
        <label
          className="tgl-btn"
          htmlFor={`cb-${label.toLowerCase().replace(/\s+/g, '-')}`}
        ></label>
      </div>
    </div>
  );
};

export default LegendRow;
