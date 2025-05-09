/**
 * Us or Them Decision - Nautiloid Ship
 * 
 * The player must decide whether to save the tieflings or
 * help the mindflayers against the Githyanki assault.
 */

export const usOrThem = {
  id: "nautiloid_us_or_them",
  type: "decision",
  category: "Act 1 - Nautiloid Ship",
  label: "Us or Them",
  description: "The nautiloid crashes. Commander Zhalk is fighting some devils. Who do you help?",
  options: ["Help Commander Zhalk", "Help the devils", "Help neither"],
  prerequisites: ["nautiloid_laezel"],
  unlocks: ["crash_site_awakening"],
  mutuallyExclusive: [],
  optional: false, // This encounter must be resolved to progress
  required: true,

  // Additional metadata
  location: "Nautiloid Ship - Main Deck",
  characters: ["Tiefling Captives", "Mindflayers", "Githyanki Raiders"],
  consequenceNotes: "Saving tieflings improves standing with tieflings in Act 1. Helping mindflayers gives no long-term benefit but grants immediate resources."
};

export default usOrThem;