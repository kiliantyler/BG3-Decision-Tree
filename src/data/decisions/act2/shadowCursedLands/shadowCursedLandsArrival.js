/**

 */

export const shadowCursedLandsArrival = {
  id: "shadow_cursed_lands_arrival",
  type: "decision",
  category: "Act 2 - Shadow-Cursed Lands",
  label: "Arrival in Shadow-Cursed Lands",
  description: "You arrive in the shadow-cursed lands, a region blighted by darkness.",
  options: ["Head toward the Last Light Inn", "Explore the nearby ruins", "Follow the mountain path"],
  prerequisites: ["act1_finale"],
  unlocks: ["last_light_inn", "moonrise_towers_entrance"],
  mutuallyExclusive: [],
  optional: false, // Main story progression
  required: true
};

export default shadowCursedLandsArrival;