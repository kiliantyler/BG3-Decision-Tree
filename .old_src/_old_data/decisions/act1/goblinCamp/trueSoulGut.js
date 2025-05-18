/**

 */

export const trueSoulGut = {
  id: "true_soul_gut",
  type: "decision",
  category: "Act 1 - Goblin Camp",
  label: "True Soul Gut",
  description: "True Soul Gut challenges you to prove your worth through a drinking contest.",
  options: ["Accept the challenge", "Refuse politely", "Attack immediately"],
  prerequisites: ["halsin_rescue"],
  unlocks: [],
  mutuallyExclusive: [],
  optional: true, // Completely optional encounter
  required: false
};

export default trueSoulGut;