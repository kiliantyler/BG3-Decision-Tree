/**

 */

export const druidGroveArrival = {
  id: "druid_grove_arrival",
  type: "decision",
  category: "Act 1 - Wilderness",
  label: "Druid Grove Arrival",
  description: "You arrive at the Druid Grove gate guarded by Zevlor.",
  options: ["Ask for entry", "Demand entry", "Look for another way in"],
  prerequisites: ["crash_site_awakening"],
  unlocks: ["druid_grove_inside", "goblin_camp_discovery"],
  mutuallyExclusive: [],
  optional: false, // Need to progress through druid grove
  required: true
};

export default druidGroveArrival;