/**
 * Mindflayer Pod - Starting Decision
 * 
 * This is the first decision in the game, where the player awakens
 * in a mindflayer pod aboard the nautiloid ship.
 */

export const mindflayerPod = {
  id: "nautiloid_start",
  type: "decision",
  category: "Act 1 - Nautiloid Ship",
  label: "Mindflayer Pod",
  description: "You find yourself trapped in a mindflayer pod. What do you do?",
  options: ["Try to break free", "Wait and observe", "Call for help"],
  prerequisites: [], // Starting point, no prerequisites
  unlocks: ["nautiloid_laezel", "nautiloid_us_or_them"],
  mutuallyExclusive: [],
  optional: false, // This is the starting point, so not optional
  required: true,

  // Additional metadata (optional)
  location: "Nautiloid Ship - Upper Deck",
  characters: ["Player Character"],
  consequenceNotes: "This decision doesn't significantly impact the story, but sets up the initial gameplay experience."
};

export default mindflayerPod;