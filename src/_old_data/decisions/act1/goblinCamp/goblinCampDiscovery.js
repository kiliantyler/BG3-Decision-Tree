/**

 */

export const goblinCampDiscovery = {
  id: "goblin_camp_discovery",
  type: "decision",
  category: "Act 1 - Goblin Camp",
  label: "Discover the Goblin Camp",
  description: "You learn about a nearby goblin camp that is planning to attack the grove.",
  options: ["Infiltrate the camp", "Attack directly", "Avoid the camp for now"],
  prerequisites: ["druid_grove_arrival"],
  unlocks: ["goblin_leaders", "halsin_rescue", "act1_finale"],
  mutuallyExclusive: [],
  optional: false, // Need to discover goblin camp for main quest
  required: true
};

export default goblinCampDiscovery;