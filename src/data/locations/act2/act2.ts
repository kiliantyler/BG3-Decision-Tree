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
  SHADOWFELL: Shadowfell,
  SHADOWCURSE: ShadowCursedLands,
}

export type Act2Regions = (typeof Act2Regions)[keyof typeof Act2Regions]

export const Act2Locations = {
  // Shadowfell
  SHADOWFELL: ShadowfellLoc,
  // Shadow-Cursed Lands
  SHADOWCURSE: ShadowCursedLandsLoc,
  GRANDMAUSOLEUM: GrandMausoleum,
  LASTLIGHT: LastLightInn,
  MOONRISE: MoonriseTowers,
  REITHWIN: ReithwinTown,
  RUINEDBATTLEFIELD: RuinedBattlefield,
}

export type Act2Locations = (typeof Act2Locations)[keyof typeof Act2Locations]
