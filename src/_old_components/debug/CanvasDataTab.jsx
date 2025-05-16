// components/debug/CanvasDataTab.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/colorThemes';

/**
 * Canvas Data tab content for the debug panel
 */
const CanvasDataTab = ({ nodes, edges }) => {
  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '10px' }}>
        <h3>Canvas Data</h3>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: '10px', overflow: 'hidden' }}>
        <div style={{ flex: 1 }}>
          <h4>Nodes ({nodes.length})</h4>
          <div style={{ height: 'calc(100% - 30px)', overflowY: 'auto' }}>
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
          <div style={{ height: 'calc(100% - 30px)', overflowY: 'auto' }}>
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
