// components/sidebar/ActSection.jsx
import React, { useEffect, useState } from 'react';
import CategorySection from './CategorySection';
import SectionTitle from './SectionTitle';

const ActSection = ({
  act,
  categories,
  isDecisionAvailable,
  onDragStart,
  isExpanded: propIsExpanded,
  allSectionsExpanded,
}) => {
  // State to track if the act section is expanded or collapsed
  // Use the prop value if provided, otherwise default to true
  const [isExpanded, setIsExpanded] = useState(
    propIsExpanded !== undefined ? propIsExpanded : true
  );

  // State to track expanded/collapsed state of each category
  const [categoryExpandedState, setCategoryExpandedState] = useState({});

  // Initialize category expanded states when categories change
  // This should run first to set up the initial state
  useEffect(() => {
    console.log(
      `ActSection ${act} - Initializing category states for categories:`,
      Object.keys(categories)
    );

    // Only initialize if we don't already have states for these categories
    // and if allSectionsExpanded is undefined (meaning it's the initial render)
    if (allSectionsExpanded === undefined) {
      const initialState = {};
      Object.keys(categories).forEach(category => {
        // Default to true (expanded)
        initialState[category] = true;
      });
      setCategoryExpandedState(initialState);
      console.log(`ActSection ${act} - Initialized categoryExpandedState:`, initialState);
    }
  }, [categories, act, allSectionsExpanded]);

  // Update isExpanded when the prop changes
  useEffect(() => {
    if (propIsExpanded !== undefined) {
      setIsExpanded(propIsExpanded);
      console.log(`ActSection ${act} - propIsExpanded changed to:`, propIsExpanded);
    }
  }, [propIsExpanded, act]);

  // Update all states when allSectionsExpanded changes
  // This should override any other state changes
  useEffect(() => {
    // Always run this effect when allSectionsExpanded changes, even if it's undefined
    console.log(`ActSection ${act} - allSectionsExpanded changed to:`, allSectionsExpanded);

    // Handle null as a special case (intermediate state during button clicks)
    if (allSectionsExpanded === null) {
      console.log(`ActSection ${act} - Received intermediate null state, waiting for next update`);
      return;
    }

    // For boolean values (true/false), update the states
    if (allSectionsExpanded !== undefined) {
      // Update the Act section expanded state
      setIsExpanded(allSectionsExpanded);

      // Force update all category expanded states
      const newState = {};
      Object.keys(categories).forEach(category => {
        newState[category] = allSectionsExpanded;
      });

      // Set the new state
      setCategoryExpandedState(newState);
      console.log(`ActSection ${act} - categoryExpandedState updated to:`, newState);
    }
  }, [allSectionsExpanded, act, categories]);

  // Debug log for categoryExpandedState changes
  useEffect(() => {
    console.log(`ActSection ${act} - categoryExpandedState is now:`, categoryExpandedState);
  }, [categoryExpandedState, act]);

  // Toggle expanded/collapsed state for the act
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle expanded/collapsed state for a specific category
  const toggleCategoryExpanded = category => {
    setCategoryExpandedState(prevState => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="act-section">
      <SectionTitle
        title={act}
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        isActHeader={true}
      />
      {isExpanded && (
        <div className="act-content">
          {Object.entries(categories).map(([category, items]) => (
            <CategorySection
              key={category}
              category={category}
              items={items}
              isDecisionAvailable={isDecisionAvailable}
              onDragStart={onDragStart}
              isExpanded={
                categoryExpandedState[category] !== undefined
                  ? categoryExpandedState[category]
                  : true
              }
              onToggleExpanded={() => toggleCategoryExpanded(category)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActSection;
