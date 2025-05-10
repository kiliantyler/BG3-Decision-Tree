// src/components/DiagnosticSidebar.jsx - For debugging data issues
import React, { useEffect, useState } from 'react';

const DiagnosticSidebar = ({ decisions, availableOnly, completed }) => {
  const [stats, setStats] = useState({
    categoryCount: 0,
    totalDecisions: 0,
    categorizedCount: {}
  });
  
  // Run diagnostics on the data when component mounts or decisions change
  useEffect(() => {
    // Check the decisions object
    const categoryCount = Object.keys(decisions || {}).length;
    const categorizedCount = {};
    let totalDecisions = 0;

    // Count decisions in each category
    Object.entries(decisions || {}).forEach(([category, items]) => {
      const itemCount = Array.isArray(items) ? items.length : 0;
      categorizedCount[category] = itemCount;
      totalDecisions += itemCount;
    });

    // Update stats
    setStats({
      categoryCount,
      totalDecisions,
      categorizedCount
    });

    // Log to console for debugging
    console.log("🔍 DIAGNOSTIC: Decisions passed to Sidebar", {
      categoryCount,
      totalDecisions,
      categories: Object.keys(decisions || {}),
      categorizedCount,
      sampleCategory: categoryCount > 0 ? 
        Object.entries(decisions)[0][0] : 'None',
      sampleDecisions: categoryCount > 0 ? 
        Object.entries(decisions)[0][1].slice(0, 2) : []
    });
    
    // Check if decisions object is empty
    if (categoryCount === 0) {
      console.error("❌ ERROR: No decisions are being passed to the Sidebar component!");
    }
    
    // Check if decisions object has the expected structure
    const hasValidStructure = Object.entries(decisions || {}).every(
      ([_, items]) => Array.isArray(items)
    );
    
    if (!hasValidStructure) {
      console.error("❌ ERROR: Decisions object does not have the expected structure!");
    }
    
    // Check if data is being loaded asynchronously
    if (categoryCount === 0 && Object.keys(decisions || {}).length === 0) {
      console.warn("⚠️ WARNING: Decisions may be loading asynchronously. Check for race conditions.");
    }
  }, [decisions]);

  // Render the diagnostic information
  return (
    <div className="sidebar" style={{ 
      padding: '15px',
      background: '#f8f8f8',
      overflow: 'auto',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>
      <h2 style={{ color: '#d32f2f' }}>🔍 Diagnostic Mode</h2>
      <p>This component replaces the sidebar to debug data issues.</p>
      
      <div style={{ 
        padding: '10px', 
        background: '#fff', 
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h3>Props Received:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><strong>decisions:</strong> Object with {stats.categoryCount} categories</li>
          <li><strong>availableOnly:</strong> {String(availableOnly)}</li>
          <li><strong>completed:</strong> Array with {completed?.length || 0} items</li>
        </ul>
      </div>
      
      <div style={{ 
        padding: '10px', 
        background: '#fff', 
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h3>Decision Statistics:</h3>
        <p>Total decisions across all categories: <strong>{stats.totalDecisions}</strong></p>
        
        <h4>Categories:</h4>
        {stats.categoryCount === 0 ? (
          <p style={{ color: 'red' }}>No categories found!</p>
        ) : (
          <ul style={{ maxHeight: '200px', overflow: 'auto' }}>
            {Object.entries(stats.categorizedCount).map(([category, count]) => (
              <li key={category}>
                <strong>{category}:</strong> {count} decisions
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div style={{ 
        padding: '10px', 
        background: '#fff', 
        border: '1px solid #ddd',
        borderRadius: '4px' 
      }}>
        <h3>Sample Data:</h3>
        {stats.categoryCount === 0 ? (
          <p style={{ color: 'red' }}>No sample data available!</p>
        ) : (
          <div>
            <h4>First Category: {Object.keys(decisions)[0]}</h4>
            <pre style={{ 
              maxHeight: '200px', 
              overflow: 'auto',
              background: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px'
            }}>
              {JSON.stringify(Object.values(decisions)[0].slice(0, 3), null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => {
            console.log("🔍 DIAGNOSTIC: Full decisions data", decisions);
            alert(`Logged full decisions data to console.
Categories: ${stats.categoryCount}
Total Decisions: ${stats.totalDecisions}`);
          }}
          style={{
            padding: '10px 15px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Log Full Data to Console
        </button>
      </div>
    </div>
  );
};

export default DiagnosticSidebar;