/**
 * Shadowheart Encounter - Nautiloid Ship
 *
 * The player encounters Shadowheart, a , who is also
 * trapped on the nautiloid ship in a mindflayer pod.
 */

export const shart = {
  id: "nautiloid_shart",
  type: "decision",
  category: "Act 1 - Nautiloid Ship",
  label: "Shadowheart Pod",
  description: "Shadowheart is trapped in a mindflayer pod. Do you free her?",
  options: [
    "Free Shadowheart",
    "Leave Shadowheart",
  ],
  prerequisites: ["nautiloid_start"],
  unlocks: [],
  mutuallyExclusive: [],
  optional: true,
  required: false,

  location: "Nautiloid Ship - Inside",
  characters: ["Shadowheart"], // NPCs involved
  consequenceNotes: "Notes about consequences...",
};

export default shart;
