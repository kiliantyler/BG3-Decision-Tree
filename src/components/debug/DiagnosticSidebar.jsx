// components/debug/DiagnosticSidebar.jsx
import React from 'react';

const DiagnosticSidebar = ({ data }) => {
  // If no data is provided, show a message
  if (!data) {
    return (
      <div className="diagnostic-sidebar">
        <h3>No diagnostic data available</h3>
      </div>
    );
  }

  return (
    <div className="diagnostic-sidebar">
      <h3>Diagnostic Information</h3>

      {/* Display general stats */}
      <div className="diagnostic-section">
        <h4>General Stats</h4>
        <ul>
          <li>
            <strong>Total Nodes:</strong> {data.nodes?.length || 0}
          </li>
          <li>
            <strong>Total Edges:</strong> {data.edges?.length || 0}
          </li>
          <li>
            <strong>Completed Decisions:</strong> {data.completedDecisions?.length || 0}
          </li>
        </ul>
      </div>

      {/* Display node details */}
      {data.nodes && data.nodes.length > 0 && (
        <div className="diagnostic-section">
          <h4>Node Details</h4>
          <div className="scrollable-content">
            {data.nodes.map(node => (
              <div key={node.id} className="node-item">
                <div className="node-header">
                  <strong>{node.data.label}</strong> ({node.id})
                </div>
                <div className="node-details">
                  <div>
                    <small>Type: {node.type}</small>
                  </div>
                  <div>
                    <small>
                      Position: ({Math.round(node.position.x)}, {Math.round(node.position.y)})
                    </small>
                  </div>
                  {node.data.selectedOption && (
                    <div>
                      <small>Selected: {node.data.selectedOption}</small>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display edge details */}
      {data.edges && data.edges.length > 0 && (
        <div className="diagnostic-section">
          <h4>Edge Details</h4>
          <div className="scrollable-content">
            {data.edges.map(edge => (
              <div key={edge.id} className="edge-item">
                <small>
                  {edge.source} → {edge.target}
                </small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display completed decisions */}
      {data.completedDecisions && data.completedDecisions.length > 0 && (
        <div className="diagnostic-section">
          <h4>Completed Decisions</h4>
          <div className="scrollable-content">
            <ul>
              {data.completedDecisions.map(id => (
                <li key={id}>
                  <small>{id}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticSidebar;
