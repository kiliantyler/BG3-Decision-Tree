// components/sidebar/LegendArea.jsx
import React from 'react';
import LegendRow from './LegendRow';

const LegendArea = ({
  showRequired,
  setShowRequired,
  showOptional,
  setShowOptional,
  showUnavailable,
  setShowUnavailable,
}) => {
  return (
    <div
      className="legend"
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '0.8rem',
        padding: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        marginBottom: '12px',
      }}
    >
      {/* Required Quest with toggle */}
      <LegendRow
        color="#ffb84d"
        borderColor="#ff9900"
        label="Required Quest"
        isChecked={showRequired}
        onToggle={() => setShowRequired(!showRequired)}
      />

      {/* Optional Side Quest with toggle */}
      <LegendRow
        color="#e0e0e0"
        borderColor="#bebebe"
        label="Optional Side Quest"
        isChecked={showOptional}
        onToggle={() => setShowOptional(!showOptional)}
      />

      {/* Unavailable Decision with toggle */}
      <LegendRow
        color="#f8f8f8"
        borderColor="#999"
        isDashed={true}
        opacity={0.6}
        label="Unavailable Decision"
        isChecked={showUnavailable}
        onToggle={() => setShowUnavailable(!showUnavailable)}
      />
    </div>
  );
};

export default LegendArea;
