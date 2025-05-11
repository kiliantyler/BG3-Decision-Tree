// components/flowchart/DecisionNode.jsx - Enhanced with focus capability
import React, { useEffect, useState } from 'react';
import BaseNode from './BaseNode';

const DecisionNode = ({ data, isConnectable }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChangingDecision, setIsChangingDecision] = useState(false);

  // Initialize selected option from data if available
  useEffect(() => {
    if (data.selectedOption && !selectedOption) {
      setSelectedOption(data.selectedOption);
    }
  }, [data.selectedOption]);

  // Determine if this is an optional node
  const isOptional = data.optional === true;

  // Handle option selection and completion
  const handleOptionSelect = option => {
    // If changing a decision, first confirm
    if (selectedOption && !isChangingDecision) {
      setIsChangingDecision(true);
      return;
    }

    // Reset the changing state
    setIsChangingDecision(false);

    // Set the new option
    setSelectedOption(option);

    // If the node has a completion callback, call it
    if (data.onComplete && typeof data.onComplete === 'function') {
      data.onComplete(data.id, option, selectedOption !== null);
    }
  };

  // Cancel decision change
  const cancelDecisionChange = () => {
    setIsChangingDecision(false);
  };

  // Background color based on type and completion status
  const getBgColor = () => {
    if (selectedOption) return 'var(--completedNode)'; // Completed
    if (isOptional) return 'var(--optionalNode)'; // Optional
    return 'var(--requiredNode)'; // Required
  };

  // Border color based on type and completion status
  const getBorderColor = () => {
    if (selectedOption) return 'var(--completedBorder)'; // Completed
    if (isOptional) return 'var(--optionalBorder)'; // Optional
    return 'var(--requiredBorder)'; // Required
  };

  // Handle node removal
  const handleRemoveNode = () => {
    if (data.onRemove && typeof data.onRemove === 'function') {
      data.onRemove(data.id);
    }
  };

  // Determine if the remove button should be shown
  const showRemoveButton = isOptional || !selectedOption;

  // Create a data object with the selectedOption for the BaseNode
  const nodeData = {
    ...data,
    selectedOption: selectedOption,
  };

  // Create a custom renderer for the node content
  const renderCustomContent = () => {
    return (
      <>
        {/* Decision change warning */}
        {isChangingDecision && (
          <div
            className="decision-warning"
            style={{
              backgroundColor: 'var(--warningBackground)',
              color: 'var(--warningText)',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '10px',
              fontSize: '0.85rem',
              border: '1px solid var(--warningBorder)',
            }}
          >
            <strong>Warning:</strong> Changing this decision may remove connected nodes.
            <div
              style={{
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <button
                onClick={cancelDecisionChange}
                style={{
                  padding: '4px 8px',
                  backgroundColor: 'var(--buttonBackground)',
                  border: '1px solid var(--buttonBorder)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setIsChangingDecision(false);
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: 'var(--red)',
                  color: 'var(--badgeText)',
                  border: '1px solid var(--red)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Change Decision
              </button>
            </div>
          </div>
        )}

        {/* Options section - show when not selected or when changing */}
        {data.options && data.options.length > 0 && (!selectedOption || isChangingDecision) && (
          <div
            className="node-options"
            style={{
              fontSize: '0.9rem',
              background: 'var(--nodeOptionsBackground)',
              borderRadius: '6px',
              padding: '8px 10px',
              marginTop: '10px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {isChangingDecision ? 'Select new option:' : 'Choose an option:'}
            </div>
            {data.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{
                  cursor: 'pointer',
                  padding: '5px 8px',
                  margin: '3px 0',
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'var(--nodeOptionBackground)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = 'var(--nodeOptionHoverBackground)';
                  e.target.style.border = isOptional
                    ? '1px solid var(--optionalBorder)'
                    : '1px solid var(--requiredBorder)';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = 'var(--nodeOptionBackground)';
                  e.target.style.border = '1px solid transparent';
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* Selected option display */}
        {selectedOption && !isChangingDecision && (
          <div
            className="selected-option"
            style={{
              fontSize: '0.9rem',
              marginTop: '8px',
              padding: '8px',
              background: 'var(--selectedOptionBackground)',
              borderRadius: '6px',
              border: '1px dashed var(--green)',
            }}
          >
            <strong>You chose:</strong> {selectedOption}
            {/* Change decision button */}
            <button
              onClick={() => setIsChangingDecision(true)}
              style={{
                display: 'block',
                marginTop: '8px',
                padding: '4px 8px',
                backgroundColor: 'var(--buttonBackground)',
                border: '1px solid var(--buttonBorder)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Change Decision
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <BaseNode
      data={nodeData}
      isConnectable={isConnectable}
      className={`decision-node ${selectedOption ? 'completed' : ''} ${
        isOptional ? 'optional' : 'required'
      }`}
      style={{
        padding: '15px',
        borderRadius: '8px',
        background: getBgColor(),
        border: `2px solid ${getBorderColor()}`,
        width: '220px',
        boxShadow: '0 4px 6px var(--boxShadow)',
      }}
      onRemove={handleRemoveNode}
      showRemoveButton={showRemoveButton}
      isExpandable={true}
      showBadges={true}
      nodeType="decision"
    >
      {renderCustomContent()}
    </BaseNode>
  );
};

export default React.memo(DecisionNode);
