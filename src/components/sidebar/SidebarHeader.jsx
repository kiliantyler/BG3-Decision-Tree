// components/sidebar/SidebarHeader.jsx
import React from 'react';
import LegendArea from './LegendArea';
import SearchBar from './SearchBar';

const SidebarHeader = ({
  searchTerm,
  setSearchTerm,
  showRequired,
  setShowRequired,
  showOptional,
  setShowOptional,
  showUnavailable,
  setShowUnavailable,
}) => {
  return (
    <div className="sidebar-header">
      <h3>Baldur's Gate 3 Decisions</h3>
      <p>Drag items to the canvas to create your flowchart</p>

      {/* Search and filter controls */}
      <div className="sidebar-controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <LegendArea
          showRequired={showRequired}
          setShowRequired={setShowRequired}
          showOptional={showOptional}
          setShowOptional={setShowOptional}
          showUnavailable={showUnavailable}
          setShowUnavailable={setShowUnavailable}
        />
      </div>
    </div>
  );
};

export default SidebarHeader;
