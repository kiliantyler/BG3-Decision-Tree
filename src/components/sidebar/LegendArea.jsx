// components/sidebar/LegendArea.jsx
import React from 'react';
import { MinusIcon, PlusIcon } from '../icons';
import IconButton from '../ui/IconButton';
import LegendRow from './LegendRow';

const LegendArea = ({
  showRequired,
  setShowRequired,
  showOptional,
  setShowOptional,
  showUnavailable,
  setShowUnavailable,
  collapseAllSections,
  expandAllSections,
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

      {/* Collapse/Expand All Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '10px',
          borderTop: '1px solid #ddd',
          paddingTop: '8px',
          gap: '8px',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '30px',
            height: '30px',
          }}
        >
          <IconButton
            onClick={collapseAllSections}
            title="Collapse All"
            ariaLabel="Collapse all sections"
            style={{
              position: 'relative',
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              top: 'auto',
              left: 'auto',
              right: 'auto',
              bottom: 'auto',
              backgroundColor: '#ffffff',
            }}
          >
            <MinusIcon size={16} />
          </IconButton>
        </div>
        <div
          style={{
            position: 'relative',
            width: '30px',
            height: '30px',
          }}
        >
          <IconButton
            onClick={expandAllSections}
            title="Expand All"
            ariaLabel="Expand all sections"
            style={{
              position: 'relative',
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              top: 'auto',
              left: 'auto',
              right: 'auto',
              bottom: 'auto',
              backgroundColor: '#ffffff',
            }}
          >
            <PlusIcon size={16} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default LegendArea;
