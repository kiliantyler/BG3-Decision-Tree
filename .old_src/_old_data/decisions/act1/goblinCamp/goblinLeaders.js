/**

 */

export const goblinLeaders = {
  id: "goblin_leaders",
  type: "decision",
  category: "Act 1 - Goblin Camp",
  label: "Goblin Leaders",
  description: "You've infiltrated the goblin camp and can approach their leaders.",
  options: ["Challenge them to combat", "Try to negotiate", "Sneak around and sabotage"],
  prerequisites: ["goblin_camp_discovery"],
  unlocks: [],
  mutuallyExclusive: [],
  optional: true, // Can skip dealing with leaders
  required: false
};

export default goblinLeaders;