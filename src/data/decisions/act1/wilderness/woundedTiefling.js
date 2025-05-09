/**

 */

export const woundedTiefling = {
  id: "wounded_tiefling",
  type: "decision",
  category: "Act 1 - Wilderness",
  label: "Wounded Tiefling",
  description: "You encounter a wounded tiefling being attacked by goblins.",
  options: ["Help the tiefling", "Side with the goblins", "Try to defuse the situation"],
  prerequisites: ["crash_site_awakening"],
  unlocks: [],
  mutuallyExclusive: [],
  optional: true, // Can skip this encounter
  required: false
};

export default woundedTiefling;