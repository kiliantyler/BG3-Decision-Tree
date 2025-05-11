// components/sidebar/SidebarHeader.jsx
import React, { useState } from 'react';
import LegendArea from './LegendArea';

const SidebarHeader = ({
  searchTerm,
  setSearchTerm,
  showRequired,
  setShowRequired,
  showOptional,
  setShowOptional,
  showUnavailable,
  setShowUnavailable,
  collapseAllSections,
  expandAllSections,
}) => {
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);

  const toggleLegend = () => {
    setIsLegendCollapsed(!isLegendCollapsed);
  };

  return (
    <div className="sidebar-header">
      <div
        style={{
          width: '100%',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={toggleLegend}
        title={isLegendCollapsed ? 'Expand Legend' : 'Collapse Legend'}
      >
        <h3 style={{ margin: '10px 0' }}>BG3 Decision Tree</h3>
      </div>
      {/* Search and filter controls */}
      <div className="sidebar-controls">
        <LegendArea
          showRequired={showRequired}
          setShowRequired={setShowRequired}
          showOptional={showOptional}
          setShowOptional={setShowOptional}
          showUnavailable={showUnavailable}
          setShowUnavailable={setShowUnavailable}
          collapseAllSections={collapseAllSections}
          expandAllSections={expandAllSections}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isCollapsed={isLegendCollapsed}
        />
      </div>
    </div>
  );
};

export default SidebarHeader;
