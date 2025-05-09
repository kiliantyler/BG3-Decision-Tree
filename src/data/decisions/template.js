/**
 * Decision Template
 * 
 * This is a template for creating new decision files.
 * Copy this file and fill in the values for your specific decision.
 */

export const decisionTemplate = {
  // Core fields (required)
  id: "unique_decision_id",               // Unique identifier (e.g., "nautiloid_start")
  type: "decision",                       // Usually "decision" (or "outcome" for end states)
  category: "Act X - Location",           // Category for sidebar grouping
  label: "Decision Name",                 // Short display name
  description: "Detailed description...", // Full description of the situation
  options: [                              // Array of possible choices
    "Option 1",
    "Option 2",
    "Option 3"
  ],
  prerequisites: ["prerequisite_id"],     // Decisions that must be completed first
  unlocks: ["unlocked_id_1", "unlocked_id_2"], // Decisions this unlocks
  mutuallyExclusive: [],                  // Decisions that become unavailable
  optional: false,                        // Is this a side quest? (true/false)
  required: true,                         // Is this required for progression? (true/false)

  // Optional metadata fields (can add your own)
  location: "Specific location",          // Where in the game world
  characters: ["Character 1", "Character 2"], // NPCs involved
  consequenceNotes: "Notes about consequences...", // Developer notes

  // Custom metadata (add whatever is useful)
  metadata: {
    difficulty: "easy",                   // Custom fields
    timeSensitive: false,
    relatedQuests: ["quest_1", "quest_2"]
  }
};

export default decisionTemplate;