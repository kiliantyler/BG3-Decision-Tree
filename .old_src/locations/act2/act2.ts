import {
  GrandMausoleum,
  LastLightInn,
  MoonriseTowers,
  ReithwinTown,
  RuinedBattlefield,
  ShadowCursedLands,
  ShadowCursedLandsLoc,
  Shadowfell,
  ShadowfellLoc,
} from '.'

export const Act2Regions = {
  Shadowfell: Shadowfell,
  ShadowCursedLands: ShadowCursedLands,
}

export type Act2Regions = (typeof Act2Regions)[keyof typeof Act2Regions]

export const Act2Locations = {
  // Shadowfell
  Shadowfell: ShadowfellLoc,
  // Shadow-Cursed Lands
  ShadowCursedLands: ShadowCursedLandsLoc,
  GrandMausoleum: GrandMausoleum,
  LastLightInn: LastLightInn,
  MoonriseTowers: MoonriseTowers,
  ReithwinTown: ReithwinTown,
  RuinedBattlefield: RuinedBattlefield,
}

export type Act2Locations = (typeof Act2Locations)[keyof typeof Act2Locations]
