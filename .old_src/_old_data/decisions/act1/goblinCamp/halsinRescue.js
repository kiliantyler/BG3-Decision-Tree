/**

 */

export const halsinRescue = {
  id: "halsin_rescue",
  type: "decision",
  category: "Act 1 - Goblin Camp",
  label: "Halsin Rescue",
  description: "You discover Halsin is being kept prisoner in bear form.",
  options: ["Free him immediately", "Wait for a distraction", "Leave him for now"],
  prerequisites: ["goblin_camp_discovery"],
  unlocks: ["true_soul_gut"],
  mutuallyExclusive: [],
  optional: true, // Can skip rescuing Halsin
  required: false
};

export default halsinRescue;