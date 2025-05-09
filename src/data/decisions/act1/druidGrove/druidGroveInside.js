/**

 */

export const druidGroveInside = {
  id: "druid_grove_inside",
  type: "decision",
  category: "Act 1 - Druid Grove",
  label: "Inside the Grove",
  description: "You're inside the Druid Grove. There are various individuals to talk to.",
  options: ["Talk to Halsin", "Investigate the refugees", "Look into the ritual"],
  prerequisites: ["druid_grove_arrival"],
  unlocks: [],
  mutuallyExclusive: [],
  optional: true, // Can skip interactions inside grove
  required: false
};

export default druidGroveInside;