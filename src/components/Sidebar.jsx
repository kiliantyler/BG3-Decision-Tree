// components/Sidebar.jsx - With optional decision indicators
import { useState } from 'react';

const Sidebar = ({ decisions, availableOnly = false, completed = [] }) => {
  // State for search/filter functionality
  const [searchTerm, setSearchTerm] = useState('');
  // State for filter toggle
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(availableOnly);
  // State for filtering by type (optional/required)
  const [showOptional, setShowOptional] = useState(true);
  const [showRequired, setShowRequired] = useState(true);

  // Function to handle the start of drag
  const onDragStart = (event, nodeType, decision) => {
    // Set the node type data
    event.dataTransfer.setData('application/reactflow', nodeType);

    // Set the decision data
    event.dataTransfer.setData('decision', JSON.stringify(decision));

    // Set effectAllowed for drag operation
    event.dataTransfer.effectAllowed = 'move';
  };

  // Function to check if a decision is available
  const isDecisionAvailable = (decisionId) => {
    // If we're not filtering for available only, all decisions are "available"
    if (!showOnlyAvailable) return true;

    // Get the decision object
    const decision = Object.values(decisions)
      .flat()
      .find((d) => d.id === decisionId);

    if (!decision) return false;

    // A decision is available if all prerequisites are completed
    const prerequisitesMet = decision.prerequisites.every((prereq) =>
      completed.includes(prereq)
    );

    // And it's not already completed itself
    const notCompleted = !completed.includes(decisionId);

    // And it's not mutually exclusive with any completed decisions
    const notExcluded = !completed.some((completedId) => {
      const completedDecision = Object.values(decisions)
        .flat()
        .find((d) => d.id === completedId);
      return (
        completedDecision &&
        completedDecision.mutuallyExclusive?.includes(decisionId)
      );
    });

    return prerequisitesMet && notCompleted && notExcluded;
  };

  // Filter decisions based on search term and required/optional filters
  const filterDecisions = (items) => {
    return items.filter((item) => {
      // Text search filter
      const matchesSearch =
        !searchTerm ||
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Optional/Required filter
      const matchesType =
        (showOptional && item.optional) ||
        (showRequired && item.required && !item.optional);

      return matchesSearch && matchesType;
    });
  };

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
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
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
          </div>
        </div>
      </div>

      <div className="decision-categories">
        {Object.entries(decisions).map(([category, items]) => {
          // Filter items based on search and availability
          const filteredItems = filterDecisions(items).filter(
            (item) => !showOnlyAvailable || isDecisionAvailable(item.id)
          );

          // Skip empty categories
          if (filteredItems.length === 0) return null;

          return (
            <div key={category} className="decision-category">
              <h4>{category}</h4>
              <div className="decision-items">
                {filteredItems.map((item) => {
                  // Determine if this decision is available
                  const isAvailable = isDecisionAvailable(item.id);
                  const isOptional = item.optional === true;
                  const isRequired = item.required === true && !item.optional;

                  // Determine style based on availability and type
                  const itemStyle = {
                    padding: '10px',
                    margin: '8px 0',
                    backgroundColor: isOptional ? '#e0e0e0' : '#ffb84d',
                    border: `1px solid ${isOptional ? '#bebebe' : '#ff9900'}`,
                    borderRadius: '4px',
                    cursor: isAvailable ? 'grab' : 'not-allowed',
                    userSelect: 'none',
                    opacity: isAvailable ? 1 : 0.6,
                  };

                  return (
                    <div
                      key={item.id}
                      className="decision-item"
                      draggable={isAvailable}
                      onDragStart={
                        isAvailable
                          ? (event) =>
                              onDragStart(event, item.type || 'decision', item)
                          : null
                      }
                      style={itemStyle}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '4px',
                        }}
                      >
                        <div
                          className="item-title"
                          style={{ fontWeight: 'bold' }}
                        >
                          {item.label}
                        </div>
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

                      <div
                        className="item-description"
                        style={{ fontSize: '0.8rem', color: '#666' }}
                      >
                        {item.description.substring(0, 60)}...
                      </div>

                      {/* Show prerequisites if not available */}
                      {!isAvailable &&
                        item.prerequisites &&
                        item.prerequisites.length > 0 && (
                          <div
                            className="item-prerequisites"
                            style={{
                              fontSize: '0.7rem',
                              marginTop: '5px',
                              color: '#999',
                            }}
                          >
                            Requires: {item.prerequisites.join(', ')}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
