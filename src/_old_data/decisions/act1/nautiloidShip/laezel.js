/**
 * Laezel Encounter - Nautiloid Ship
 * 
 * The player encounters Laezel, a Githyanki warrior, who is also
 * trapped on the nautiloid ship.
 */

export const laezel = {
  id: "nautiloid_laezel",
  type: "decision",
  category: "Act 1 - Nautiloid Ship",
  label: "Encounter with Lae'zel",
  description: "You meet Lae'zel, a Githyanki warrior. How do you approach her?",
  options: ["Offer to cooperate", "Challenge her authority", "Keep your distance"],
  prerequisites: ["nautiloid_start"],
  unlocks: ["nautiloid_us_or_them"],
  mutuallyExclusive: [],
  optional: false, // This is optional, you can skip meeting Lae'zel
  required: true, // This is not required to progress

  // Additional metadata
  location: "Nautiloid Ship - Upper Deck",
  characters: ["Laezel"],
  consequenceNotes: "Freeing Laezel adds her as a potential companion. Ignoring her means you'll encounter her later in the wilderness."
};

export default laezel;