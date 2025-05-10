// components/debug/DebugPanel.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useDecision } from '../../contexts/DecisionContext';
import * as DataManager from '../../data/enhancedDataManager';

// Import smaller components
import CanvasDataTab from './CanvasDataTab';
import DebugModeBanner from './DebugModeBanner';
import DebugTabs from './DebugTabs';
import DebugToggleButton from './DebugToggleButton';
import DecisionsTab from './DecisionsTab';
import StatsTab from './StatsTab';

// Import theme
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/dracula';

/**
 * Debug panel component to help with development and testing
 * Only appears when pressing CTRL+SHIFT+D
 */
const DebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDebugModeActivated, setIsDebugModeActivated] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDecision, setSelectedDecision] = useState(null);

  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  // Get decision data from context
  const { nodes, edges, completedDecisions, addNodeFromSidebar } = useDecision();

  // Add event listener for CTRL+SHIFT+D key combination
  useEffect(() => {
    const handleKeyDown = e => {
      // Check for CTRL+SHIFT+D
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault(); // Prevent default browser behavior
        setIsDebugModeActivated(prevState => !prevState);

        // If activating debug mode, also show the panel
        if (!isDebugModeActivated) {
          setIsVisible(true);
        }

        console.log('Debug mode ' + (!isDebugModeActivated ? 'activated' : 'deactivated'));
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDebugModeActivated]);

  // Toggle panel visibility
  const togglePanel = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  // Add selected decision to canvas
  const addToCanvas = useCallback(() => {
    if (selectedDecision) {
      const position = { x: 100, y: 100 }; // Default position
      addNodeFromSidebar(selectedDecision, position);
    }
  }, [selectedDecision, addNodeFromSidebar]);

  // All decisions for debugging
  const decisions = DataManager.allDecisions;

  // Filter decisions based on search term
  const filteredDecisions = decisions.filter(
    d =>
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If debug mode is not activated, don't render anything
  if (!isDebugModeActivated) {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <DebugToggleButton isVisible={isVisible} togglePanel={togglePanel} />

      {/* Debug Panel */}
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            width: '500px',
            height: '400px',
            background: themeColors.background,
            border: `1px solid ${themeColors.border}`,
            borderRadius: '6px',
            boxShadow: `0 5px 15px ${theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}`,
            zIndex: 1000,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            color: themeColors.foreground,
          }}
        >
          {/* Debug Mode Banner */}
          <DebugModeBanner />

          {/* Tabs */}
          <DebugTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />

          {/* Content Area */}
          <div
            style={{
              flex: 1,
              padding: '10px',
              overflow: 'hidden', // Changed from overflowY: 'auto' to prevent scrollbar
            }}
          >
            {/* Stats Tab */}
            {tabIndex === 0 && (
              <StatsTab
                decisions={decisions}
                nodes={nodes}
                edges={edges}
                completedDecisions={completedDecisions}
              />
            )}

            {/* Decisions Tab */}
            {tabIndex === 1 && (
              <DecisionsTab
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredDecisions={filteredDecisions}
                selectedDecision={selectedDecision}
                setSelectedDecision={setSelectedDecision}
                addToCanvas={addToCanvas}
              />
            )}

            {/* Canvas Data Tab */}
            {tabIndex === 2 && <CanvasDataTab nodes={nodes} edges={edges} />}
          </div>
        </div>
      )}
    </>
  );
};

export default DebugPanel;
