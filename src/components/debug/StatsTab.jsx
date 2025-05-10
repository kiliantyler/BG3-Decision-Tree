// components/debug/StatsTab.jsx
import React from 'react';
import * as DataManager from '../../data/enhancedDataManager';

/**
 * Stats tab content for the debug panel
 */
const StatsTab = ({ decisions, nodes, edges, completedDecisions }) => {
  return (
    <div>
      <h3>Decision Tree Stats</h3>
      <div style={{ marginBottom: '10px' }}>
        <div>
          <strong>Total Decisions:</strong> {decisions.length}
        </div>
        <div>
          <strong>Categories:</strong> {Object.keys(DataManager.decisionsByCategory).length}
        </div>
        <div>
          <strong>Nodes on Canvas:</strong> {nodes.length}
        </div>
        <div>
          <strong>Edges on Canvas:</strong> {edges.length}
        </div>
        <div>
          <strong>Completed Decisions:</strong> {completedDecisions.length}
        </div>
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
  );
};

export default StatsTab;
