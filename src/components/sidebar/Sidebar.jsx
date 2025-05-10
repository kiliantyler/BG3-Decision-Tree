// components/sidebar/Sidebar.jsx
import { useEffect, useState } from 'react';
import { SidebarDebugPanel } from '../debug';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';

// Debug flag - initially false, will be toggled with CTRL+SHIFT+D
const Sidebar = ({ decisions, availableOnly = false, completed = [] }) => {
  // State for debug mode
  const [DEBUG, setDEBUG] = useState(false);

  // Add event listener for CTRL+SHIFT+D key combination
  useEffect(() => {
    const handleKeyDown = e => {
      // Check for CTRL+SHIFT+D
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault(); // Prevent default browser behavior
        setDEBUG(prevState => !prevState);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // State for search/filter functionality
  const [searchTerm, setSearchTerm] = useState('');

  // State for filter toggle
  const [showUnavailable, setShowUnavailable] = useState(false); // Default to false (off)

  // State for filtering by type (optional/required)
  const [showOptional, setShowOptional] = useState(true);
  const [showRequired, setShowRequired] = useState(true);

  // Track rendering and state
  useEffect(() => {
    if (DEBUG) {
      // Log the key state values to help debug issues
      console.log('Sidebar component state:', {
        availableOnly,
        showUnavailable,
        showOptional,
        showRequired,
        decisionCategories: Object.keys(decisions),
        totalDecisions: Object.values(decisions).flat().length,
        completedDecisions: completed?.length || 0,
      });
    }
  }, [availableOnly, showUnavailable, showOptional, showRequired, decisions, completed]);

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

        // Availability filter - show unavailable items if showUnavailable is true or item is available
        const matchesAvailability = showUnavailable || isDecisionAvailable(item.id);

        // Count if matches all filters
        if (matchesSearch && matchesType && matchesAvailability) {
          count++;
        }
      });
    });

    return count;
  };

  // Function to determine which categories and items to show
  const getCategoriesToShow = () => {
    // Track decisions to show
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

        // Availability filter - show unavailable items if showUnavailable is true or item is available
        const matchesAvailability = showUnavailable || isDecisionAvailable(item.id);

        // Add to filtered items if it matches all filters
        if (matchesSearch && matchesType && matchesAvailability) {
          filteredItems.push(item);
        }
      });

      // Add category if it has items to show
      if (filteredItems.length > 0) {
        categoriesToShow[category] = filteredItems;
      }
    });

    return categoriesToShow;
  };

  // Calculate counts for display
  const { available, total } = getTotalCounts();
  const displayCount = countDisplayedDecisions();
  const categoriesToShow = getCategoriesToShow();

  if (DEBUG) {
    console.log('Sidebar rendering stats:', {
      displayCount,
      categoriesShown: Object.keys(categoriesToShow).length,
      filtering: {
        showUnavailable,
        showOptional,
        showRequired,
        searchTerm: searchTerm ? `"${searchTerm}"` : 'none',
      },
    });
  }

  return (
    <aside className="sidebar">
      <SidebarHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showRequired={showRequired}
        setShowRequired={setShowRequired}
        showOptional={showOptional}
        setShowOptional={setShowOptional}
        showUnavailable={showUnavailable}
        setShowUnavailable={setShowUnavailable}
      />

      {/* Render categories and decision items */}
      <div className="decision-categories">
        <SidebarContent
          categoriesToShow={categoriesToShow}
          isDecisionAvailable={isDecisionAvailable}
          onDragStart={onDragStart}
          displayCount={displayCount}
        />
      </div>

      {/* Debug panel (only visible if DEBUG is true) */}
      {DEBUG && (
        <SidebarDebugPanel
          showUnavailable={showUnavailable}
          showRequired={showRequired}
          showOptional={showOptional}
          total={total}
          available={available}
          displayCount={displayCount}
          categoriesCount={Object.keys(decisions).length}
          completedCount={completed.length}
        />
      )}
    </aside>
  );
};

export default Sidebar;
