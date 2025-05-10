// src/components/Sidebar.jsx - Complete robust revision to fix unavailable nodes issue
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

// Debug flag - set to true to see detailed logging
const DEBUG = true;

const Sidebar = ({ decisions, availableOnly = false, completed = [] }) => {
  // State for search/filter functionality
  const [searchTerm, setSearchTerm] = useState('');

  // State for filter toggle
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(availableOnly);

  // State for filtering by type (optional/required)
  const [showOptional, setShowOptional] = useState(true);
  const [showRequired, setShowRequired] = useState(true);

  // Track rendering and state
  useEffect(() => {
    if (DEBUG) {
      // Log the key state values to help debug issues
      console.log('Sidebar component state:', {
        availableOnly,
        showOnlyAvailable,
        showOptional,
        showRequired,
        decisionCategories: Object.keys(decisions),
        totalDecisions: Object.values(decisions).flat().length,
        completedDecisions: completed?.length || 0,
      });
    }
  }, [availableOnly, showOnlyAvailable, showOptional, showRequired, decisions, completed]);

  // Function to handle the start of drag
  const onDragStart = (event, nodeType, decision) => {
    // Only allow dragging if the decision is available
    if (!isDecisionAvailable(decision.id)) {
      if (DEBUG) console.log(`Prevented dragging unavailable decision: ${decision.id}`);
      event.preventDefault();
      return;
    }

    // Set the node type data
    event.dataTransfer.setData('application/reactflow', nodeType);

    // Set the decision data
    event.dataTransfer.setData('decision', JSON.stringify(decision));

    // Set effectAllowed for drag operation
    event.dataTransfer.effectAllowed = 'move';

    if (DEBUG) console.log(`Started dragging decision: ${decision.id}`);
  };

  // Function to check if a decision is available
  const isDecisionAvailable = decisionId => {
    // Find the decision
    const allDecisions = Object.values(decisions).flat();
    const decision = allDecisions.find(d => d.id === decisionId);

    if (!decision) {
      if (DEBUG) console.log(`Decision not found: ${decisionId}`);
      return false;
    }

    // A decision is available if all prerequisites are completed
    const prerequisitesMet = (decision.prerequisites || []).every(prereq =>
      completed.includes(prereq)
    );

    // And it's not already completed itself
    const notCompleted = !completed.includes(decisionId);

    // And it's not mutually exclusive with any completed decisions
    const notExcluded = !completed.some(completedId => {
      const completedDecision = allDecisions.find(d => d.id === completedId);
      return (
        completedDecision &&
        completedDecision.mutuallyExclusive &&
        completedDecision.mutuallyExclusive.includes(decisionId)
      );
    });

    const isAvailable = prerequisitesMet && notCompleted && notExcluded;

    if (DEBUG && !isAvailable) {
      console.log(`Decision ${decisionId} is unavailable because:`, {
        prerequisitesMet,
        notCompleted,
        notExcluded,
      });
    }

    return isAvailable;
  };

  // Get all decisions regardless of availability
  const getAllDecisions = () => {
    return Object.values(decisions).flat();
  };

  // Count both total and available decisions
  const getTotalCounts = () => {
    const allDecisions = getAllDecisions();
    const available = allDecisions.filter(d => isDecisionAvailable(d.id)).length;
    const total = allDecisions.length;

    return { available, total };
  };

  // Calculate which decisions to show
  const countDisplayedDecisions = () => {
    let count = 0;

    // Check each category
    Object.entries(decisions).forEach(([, items]) => {
      // Apply filters to each item
      items.forEach(item => {
        // Skip items without required fields
        if (!item || !item.id || !item.label) return;

        // Text search filter
        const matchesSearch =
          !searchTerm ||
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

        // Optional/Required filter
        const matchesType =
          (showOptional && item.optional) || (showRequired && item.required && !item.optional);

        // Availability filter - only apply if showOnlyAvailable is true
        const matchesAvailability = !showOnlyAvailable || isDecisionAvailable(item.id);

        // Count if matches all filters
        if (matchesSearch && matchesType && matchesAvailability) {
          count++;
        }
      });
    });

    return count;
  };

  // Function to render the sidebar content
  const renderSidebarContent = () => {
    // Track decisions to show
    let displayCount = 0;
    const categoriesToShow = {};

    // First pass: determine which items to show in which categories
    Object.entries(decisions).forEach(([category, items]) => {
      const filteredItems = [];

      // Check each item against filters
      items.forEach(item => {
        // Skip items without required fields
        if (!item || !item.id || !item.label) return;

        // Text search filter
        const matchesSearch =
          !searchTerm ||
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

        // Optional/Required filter
        const matchesType =
          (showOptional && item.optional) || (showRequired && item.required && !item.optional);

        // Availability filter - only apply if showOnlyAvailable is true
        const matchesAvailability = !showOnlyAvailable || isDecisionAvailable(item.id);

        // Add to filtered items if it matches all filters
        if (matchesSearch && matchesType && matchesAvailability) {
          filteredItems.push(item);
          displayCount++;
        }
      });

      // Add category if it has items to show
      if (filteredItems.length > 0) {
        categoriesToShow[category] = filteredItems;
      }
    });

    if (DEBUG) {
      console.log('Sidebar rendering stats:', {
        displayCount,
        categoriesShown: Object.keys(categoriesToShow).length,
        filtering: {
          showOnlyAvailable,
          showOptional,
          showRequired,
          searchTerm: searchTerm ? `"${searchTerm}"` : 'none',
        },
      });
    }

    // Return content based on filtered data
    if (displayCount === 0) {
      return (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999',
          }}
        >
          No decisions match the current filters.
        </div>
      );
    }

    // Render categories and items
    return Object.entries(categoriesToShow).map(([category, items]) => (
      <div key={category} className="decision-category">
        <h4>{category}</h4>
        <div className="decision-items">
          {items.map(item => {
            // Determine if this decision is available
            const isAvailable = isDecisionAvailable(item.id);
            const isOptional = item.optional === true;
            const isRequired = item.required === true && !item.optional;

            // Enhanced styling for available/unavailable items
            const itemStyle = {
              padding: '10px',
              margin: '8px 0',
              backgroundColor: isAvailable ? (isOptional ? '#e0e0e0' : '#ffb84d') : '#f8f8f8',
              border: isAvailable
                ? `1px solid ${isOptional ? '#bebebe' : '#ff9900'}`
                : '1px dashed #999',
              borderRadius: '4px',
              cursor: isAvailable ? 'grab' : 'not-allowed',
              userSelect: 'none',
              opacity: isAvailable ? 1 : 0.6,
              boxShadow: 'none',
              position: 'relative',
              transition: 'all 0.2s ease',
            };

            return (
              <div
                key={item.id}
                className={`decision-item ${isAvailable ? 'available' : 'unavailable'} ${
                  isOptional ? 'optional' : 'required'
                }`}
                draggable={true} // Always set draggable, but we'll prevent it in onDragStart if unavailable
                onDragStart={event => onDragStart(event, item.type || 'decision', item)}
                style={itemStyle}
                onMouseEnter={e => {
                  if (isAvailable) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={e => {
                  if (isAvailable) {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <div className="item-title" style={{ fontWeight: 'bold' }}>
                    {item.label}
                  </div>

                  {/* Status badges */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {!isAvailable && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          backgroundColor: '#999',
                          color: '#fff',
                          borderRadius: '10px',
                        }}
                      >
                        Locked
                      </span>
                    )}
                    {isOptional && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          backgroundColor: '#bebebe',
                          color: '#fff',
                          borderRadius: '10px',
                        }}
                      >
                        Optional
                      </span>
                    )}
                    {isRequired && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          backgroundColor: '#ff9900',
                          color: '#fff',
                          borderRadius: '10px',
                        }}
                      >
                        Required
                      </span>
                    )}
                  </div>
                </div>

                <div className="item-description" style={{ fontSize: '0.8rem', color: '#666' }}>
                  {item.description?.substring(0, 60)}...
                </div>

                {/* Show prerequisites if not available */}
                {!isAvailable && item.prerequisites && item.prerequisites.length > 0 && (
                  <div
                    className="item-prerequisites"
                    style={{
                      fontSize: '0.7rem',
                      marginTop: '5px',
                      color: '#999',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>Requires:</span>{' '}
                    {item.prerequisites.join(', ')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  // Calculate counts for display
  const { available, total } = getTotalCounts();
  const displayCount = countDisplayedDecisions();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Baldur's Gate 3 Decisions</h3>
        <p>Drag items to the canvas to create your flowchart</p>

        {/* Search and filter controls */}
        <div className="sidebar-controls">
          <input
            type="text"
            placeholder="Search decisions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={showOnlyAvailable}
                onChange={() => {
                  const newValue = !showOnlyAvailable;
                  setShowOnlyAvailable(newValue);
                  if (DEBUG) console.log(`Changed showOnlyAvailable to ${newValue}`);
                }}
                style={{ marginRight: '8px' }}
              />
              Show only available decisions
            </label>

            <div style={{ display: 'flex', gap: '10px', marginLeft: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={showRequired}
                  onChange={() => setShowRequired(!showRequired)}
                  style={{ marginRight: '8px' }}
                />
                Required
              </label>

              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={showOptional}
                  onChange={() => setShowOptional(!showOptional)}
                  style={{ marginRight: '8px' }}
                />
                Optional
              </label>
            </div>
          </div>

          <div
            className="legend"
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '0.8rem',
              padding: '8px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              marginBottom: '12px',
            }}
          >
            {/* Display decision counts */}
            <div
              style={{
                fontSize: '0.7rem',
                marginBottom: '6px',
                color: '#666',
                textAlign: 'right',
              }}
            >
              Showing {displayCount} of {total} decisions ({available} available,{' '}
              {total - available} locked)
            </div>

            <ThemeToggle />

            <div style={{ fontWeight: 'bold', marginBottom: '4px', marginTop: '10px' }}>
              Legend:
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#ffb84d',
                  border: '1px solid #ff9900',
                  borderRadius: '3px',
                  display: 'inline-block',
                  marginRight: '6px',
                }}
              ></span>
              <span>Required Quest</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#e0e0e0',
                  border: '1px solid #bebebe',
                  borderRadius: '3px',
                  display: 'inline-block',
                  marginRight: '6px',
                }}
              ></span>
              <span>Optional Side Quest</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#f8f8f8',
                  border: '1px dashed #999',
                  borderRadius: '3px',
                  display: 'inline-block',
                  marginRight: '6px',
                  opacity: 0.6,
                }}
              ></span>
              <span>Unavailable Decision</span>
            </div>
          </div>
        </div>
      </div>

      {/* Render categories and decision items */}
      <div className="decision-categories">{renderSidebarContent()}</div>

      {/* Debug panel (only visible if DEBUG is true) */}
      {DEBUG && (
        <div
          style={{
            margin: '20px 0',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            fontSize: '0.8rem',
            color: '#666',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Debug Info:</div>
          <div>
            Filter Settings:
            {showOnlyAvailable ? ' Show Available Only,' : ' Show All,'}
            {showRequired ? ' Required,' : ''}
            {showOptional ? ' Optional' : ''}
          </div>
          <div>
            Decisions: {total} total, {available} available
          </div>
          <div>Displaying: {displayCount} decisions</div>
          <div>Categories: {Object.keys(decisions).length}</div>
          <div>Completed Decisions: {completed.length}</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
