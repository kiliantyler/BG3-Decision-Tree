/**

 */

export const act1Finale = {
  id: "act1_finale",
  type: "decision",
  category: "Act 1 - Finale",
  label: "Dealing with the Druids and Tieflings",
  description: "You must decide how to resolve the conflict between the druids, tieflings, and goblins.",
  options: ["Side with the tieflings", "Side with the druids", "Try to save everyone", "Side with the goblins"],
  prerequisites: ["goblin_camp_discovery"],
  unlocks: ["shadow_cursed_lands_arrival"],
  mutuallyExclusive: [],
  optional: false, // Must resolve Act 1 to progress
  required: true
};

export default act1Finale;