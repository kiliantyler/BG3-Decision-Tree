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
  collapseAllSections,
  expandAllSections,
}) => {
  return (
    <div className="sidebar-header">
      <center>
        <h3>BG3 Decision Tree</h3>
      </center>
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
          collapseAllSections={collapseAllSections}
          expandAllSections={expandAllSections}
        />
      </div>
    </div>
  );
};

export default SidebarHeader;
