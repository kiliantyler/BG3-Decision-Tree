// components/sidebar/SidebarContent.jsx
import React, { useEffect } from 'react';
import ActSection from './ActSection';

// Debug flag - set to true to see detailed logging
const DEBUG = true;

const SidebarContent = ({
  categoriesToShow,
  isDecisionAvailable,
  onDragStart,
  displayCount,
  allSectionsExpanded,
}) => {
  // Log when allSectionsExpanded changes
  useEffect(() => {
    console.log('SidebarContent - allSectionsExpanded changed to:', allSectionsExpanded);

    // Handle null as a special case (intermediate state during button clicks)
    if (allSectionsExpanded === null) {
      console.log('SidebarContent - Received intermediate null state, waiting for next update');
    }
  }, [allSectionsExpanded]);

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

  // Group categories by Act
  const actCategories = {};

  Object.entries(categoriesToShow).forEach(([category, items]) => {
    // Extract the Act name from the category (e.g., "Act 1 - Location" -> "Act 1")
    const actMatch = category.match(/^(Act \d+)/);
    if (actMatch) {
      const act = actMatch[1];
      if (!actCategories[act]) {
        actCategories[act] = {};
      }
      actCategories[act][category] = items;
    } else {
      // Handle categories that don't follow the Act pattern
      if (!actCategories['Other']) {
        actCategories['Other'] = {};
      }
      actCategories['Other'][category] = items;
    }
  });

  // Render Act sections with their categories
  return (
    <div style={{ paddingBottom: '60px' }}>
      {Object.entries(actCategories).map(([act, categories]) => {
        console.log(
          `SidebarContent - Rendering ActSection for ${act} with allSectionsExpanded:`,
          allSectionsExpanded
        );
        // Force a key change when allSectionsExpanded changes to ensure a re-render
        return (
          <ActSection
            key={`${act}-${allSectionsExpanded}`}
            act={act}
            categories={categories}
            isDecisionAvailable={isDecisionAvailable}
            onDragStart={onDragStart}
            isExpanded={allSectionsExpanded}
            allSectionsExpanded={allSectionsExpanded}
          />
        );
      })}
    </div>
  );
};

export default SidebarContent;
