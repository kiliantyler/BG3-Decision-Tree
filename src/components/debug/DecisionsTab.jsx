// components/debug/DecisionsTab.jsx
import React, { useRef, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { useTheme } from '../../hooks/useTheme';
import { themes } from '../../styles/themes/dracula';

/**
 * Decisions tab content for the debug panel
 */
const DecisionsTab = ({
  searchTerm,
  setSearchTerm,
  filteredDecisions,
  selectedDecision,
  setSelectedDecision,
  addToCanvas,
}) => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickedItemRef = useRef(null);

  // Get current theme
  const { theme } = useTheme();
  const themeColors = themes[theme];

  // Handle decision click
  const handleDecisionClick = (decision, event) => {
    setSelectedDecision(decision);
    clickedItemRef.current = event.currentTarget;
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle add to canvas from modal
  const handleAddToCanvas = () => {
    addToCanvas();
    setIsModalOpen(false);
  };

  // Create modal message content
  const getModalContent = () => {
    if (!selectedDecision) return '';

    return (
      <>
        <div>
          <strong>ID:</strong> {selectedDecision.id}
        </div>
        <div>
          <strong>Type:</strong> {selectedDecision.type}
        </div>
        <div>
          <strong>Required:</strong>{' '}
          <span style={{ color: selectedDecision.required ? 'var(--green)' : 'var(--comment)' }}>
            {selectedDecision.required ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <strong>Optional:</strong>{' '}
          <span style={{ color: selectedDecision.optional ? 'var(--green)' : 'var(--comment)' }}>
            {selectedDecision.optional ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <strong>Prerequisites:</strong>{' '}
          <span style={{ color: 'var(--cyan)' }}>
            {selectedDecision.prerequisites.join(', ') || 'None'}
          </span>
        </div>
        <div>
          <strong>Unlocks:</strong>{' '}
          <span style={{ color: 'var(--orange)' }}>
            {selectedDecision.unlocks.join(', ') || 'None'}
          </span>
        </div>
        <div style={{ marginTop: '10px' }}>{selectedDecision.description}</div>
      </>
    );
  };

  return (
    <div>
      <h3>All Decisions</h3>
      <input
        type="text"
        placeholder="Search decisions..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: `1px solid ${themeColors.border}`,
          borderRadius: '4px',
          background: themeColors.currentLine,
          color: themeColors.foreground,
        }}
      />

      <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
        {filteredDecisions.map(decision => (
          <div
            key={decision.id}
            onClick={event => handleDecisionClick(decision, event)}
            style={{
              padding: '8px',
              borderBottom: `1px solid ${themeColors.border}`,
              cursor: 'pointer',
              background:
                selectedDecision?.id === decision.id
                  ? theme === 'dark'
                    ? themeColors.selection
                    : themeColors.currentLine
                  : 'transparent',
            }}
          >
            <div>
              <strong>{decision.label}</strong> ({decision.id})
            </div>
            <div style={{ fontSize: '0.8rem', color: themeColors.comment }}>
              {decision.description.substring(0, 50)}...
            </div>
          </div>
        ))}
      </div>

      {/* Decision Details Modal */}
      {selectedDecision && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleAddToCanvas}
          title={selectedDecision.label}
          message={getModalContent()}
          confirmText="Add to Canvas"
          cancelText="Close"
          buttonRef={clickedItemRef}
        />
      )}
    </div>
  );
};

export default DecisionsTab;
