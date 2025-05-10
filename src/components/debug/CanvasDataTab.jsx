// components/debug/CanvasDataTab.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/dracula';

/**
 * Canvas Data tab content for the debug panel
 */
const CanvasDataTab = ({ nodes, edges }) => {
  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  return (
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
                  borderBottom: `1px solid ${themeColors.border}`,
                  fontSize: '0.8rem',
                }}
              >
                <div>
                  <strong style={{ color: themeColors.cyan }}>{node.data.label}</strong>
                </div>
                <div style={{ color: themeColors.comment }}>
                  ID: {node.id}, Pos: ({Math.round(node.position.x)}, {Math.round(node.position.y)})
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
                  borderBottom: `1px solid ${themeColors.border}`,
                  fontSize: '0.8rem',
                }}
              >
                <div>
                  <strong style={{ color: themeColors.green }}>{edge.source}</strong>{' '}
                  <span style={{ color: themeColors.comment }}>→</span>{' '}
                  <strong style={{ color: themeColors.orange }}>{edge.target}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasDataTab;
