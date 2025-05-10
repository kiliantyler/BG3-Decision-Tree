// src/components/DebugPanel.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useDecision } from '../contexts/DecisionContext';
import * as DataManager from '../data/enhancedDataManager';

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
  
  // Get decision data from context
  const { 
    nodes, 
    edges, 
    completedDecisions, 
    addNodeFromSidebar 
  } = useDecision();
  
  // Add event listener for CTRL+SHIFT+D key combination
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  const filteredDecisions = decisions.filter(d => 
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
      <button 
        onClick={togglePanel}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: '#444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        {isVisible ? "Close Debug" : "Debug"}
      </button>
      
      {/* Debug Panel */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          width: '500px',
          height: '400px',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '6px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          zIndex: 1000,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Debug Mode Banner */}
          <div style={{
            padding: '4px 8px',
            background: '#f44336',
            color: 'white',
            fontSize: '12px',
            textAlign: 'center'
          }}>
            Debug Mode - Press CTRL+SHIFT+D to deactivate
          </div>
        
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #ddd',
            background: '#f5f5f5'
          }}>
            <button 
              onClick={() => setTabIndex(0)} 
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                background: tabIndex === 0 ? '#fff' : 'transparent',
                borderBottom: tabIndex === 0 ? '2px solid #4285f4' : 'none',
                cursor: 'pointer'
              }}
            >
              Tree Stats
            </button>
            <button 
              onClick={() => setTabIndex(1)} 
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                background: tabIndex === 1 ? '#fff' : 'transparent',
                borderBottom: tabIndex === 1 ? '2px solid #4285f4' : 'none',
                cursor: 'pointer'
              }}
            >
              Decisions
            </button>
            <button 
              onClick={() => setTabIndex(2)} 
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                background: tabIndex === 2 ? '#fff' : 'transparent',
                borderBottom: tabIndex === 2 ? '2px solid #4285f4' : 'none',
                cursor: 'pointer'
              }}
            >
              Canvas Data
            </button>
          </div>
          
          {/* Content Area */}
          <div style={{
            flex: 1,
            padding: '10px',
            overflowY: 'auto'
          }}>
            {/* Stats Tab */}
            {tabIndex === 0 && (
              <div>
                <h3>Decision Tree Stats</h3>
                <div style={{ marginBottom: '10px' }}>
                  <div><strong>Total Decisions:</strong> {decisions.length}</div>
                  <div><strong>Categories:</strong> {Object.keys(DataManager.decisionsByCategory).length}</div>
                  <div><strong>Nodes on Canvas:</strong> {nodes.length}</div>
                  <div><strong>Edges on Canvas:</strong> {edges.length}</div>
                  <div><strong>Completed Decisions:</strong> {completedDecisions.length}</div>
                </div>
                
                <h4>Categories</h4>
                <ul style={{ padding: '0 0 0 20px' }}>
                  {Object.entries(DataManager.decisionsByCategory).map(([category, items]) => (
                    <li key={category}>
                      {category}: {items.length} decisions
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Decisions Tab */}
            {tabIndex === 1 && (
              <div>
                <h3>All Decisions</h3>
                <input
                  type="text"
                  placeholder="Search decisions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                
                <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  {filteredDecisions.map(decision => (
                    <div 
                      key={decision.id}
                      onClick={() => setSelectedDecision(decision)}
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #eee',
                        cursor: 'pointer',
                        background: selectedDecision?.id === decision.id ? '#f0f7ff' : 'transparent'
                      }}
                    >
                      <div><strong>{decision.label}</strong> ({decision.id})</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {decision.description.substring(0, 50)}...
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedDecision && (
                  <div style={{ 
                    marginTop: '10px', 
                    padding: '10px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    background: '#f9f9f9'
                  }}>
                    <h4>{selectedDecision.label}</h4>
                    <div><strong>ID:</strong> {selectedDecision.id}</div>
                    <div><strong>Type:</strong> {selectedDecision.type}</div>
                    <div><strong>Required:</strong> {selectedDecision.required ? 'Yes' : 'No'}</div>
                    <div><strong>Optional:</strong> {selectedDecision.optional ? 'Yes' : 'No'}</div>
                    <div><strong>Prerequisites:</strong> {selectedDecision.prerequisites.join(', ') || 'None'}</div>
                    <div><strong>Unlocks:</strong> {selectedDecision.unlocks.join(', ') || 'None'}</div>
                    <div style={{ marginTop: '10px' }}>
                      <button 
                        onClick={addToCanvas}
                        style={{
                          padding: '5px 10px',
                          background: '#4285f4',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Add to Canvas
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Canvas Data Tab */}
            {tabIndex === 2 && (
              <div>
                <h3>Canvas Data</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <h4>Nodes ({nodes.length})</h4>
                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                      {nodes.map(node => (
                        <div 
                          key={node.id}
                          style={{
                            padding: '5px',
                            borderBottom: '1px solid #eee',
                            fontSize: '0.8rem'
                          }}
                        >
                          <div><strong>{node.data.label}</strong></div>
                          <div style={{ color: '#666' }}>
                            ID: {node.id}, 
                            Pos: ({Math.round(node.position.x)}, {Math.round(node.position.y)})
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4>Edges ({edges.length})</h4>
                    <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                      {edges.map(edge => (
                        <div 
                          key={edge.id}
                          style={{
                            padding: '5px',
                            borderBottom: '1px solid #eee',
                            fontSize: '0.8rem'
                          }}
                        >
                          <div>
                            <strong>{edge.source}</strong> → <strong>{edge.target}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DebugPanel;