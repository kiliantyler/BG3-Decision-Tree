/**

 */

export const owlbearCub = {
  id: "owlbear_cub",
  type: "decision",
  category: "Act 1 - Wilderness",
  label: "Owlbear Cub",
  description: "You find an owlbear cub in its den. The mother is dead nearby.",
  options: ["Adopt the cub", "Leave it alone", "End its suffering"],
  prerequisites: ["crash_site_awakening"],
  unlocks: [],
  mutuallyExclusive: [],
  optional: true, // Completely optional side encounter
  required: false
};

export default owlbearCub;