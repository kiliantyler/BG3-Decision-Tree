/**

 */

export const crashSiteAwakening = {
  id: "crash_site_awakening",
  type: "decision",
  category: "Act 1 - Wilderness",
  label: "Crash Site Awakening",
  description: "You wake up at the crash site. The nautiloid has been destroyed.",
  options: ["Search the area", "Head toward smoke in the distance", "Rest and recover"],
  prerequisites: ["nautiloid_us_or_them"],
  unlocks: ["wounded_tiefling", "druid_grove_arrival", "owlbear_cub"],
  mutuallyExclusive: [],
  optional: false, // Must progress past crash site
  required: true
};

export default crashSiteAwakening;