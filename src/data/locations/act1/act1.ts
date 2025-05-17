import {
  AstralPlaneAct1,
  AstralPlaneAct1Loc,
  BlightedVillage,
  CrecheYllek,
  EmeraldGrove,
  Forest,
  GoblinCamp,
  MountainPass,
  Nautiloid,
  NautiloidLoc,
  OvergrownRuins,
  RavagedBeach,
  RisenRoad,
  RosymornMonastery,
  RosymornMonasteryTrail,
  RosymornMT,
  SecludedCove,
  SunlitWetlands,
  Underdark,
  WaukeensRest,
  Wilderness,
} from '.'

export const Act1Regions = {
  NAUTILOID: Nautiloid,
  ROSYMORN: RosymornMT,
  UNDERDARK: Underdark,
  WILDERNESS: Wilderness,
  ASTRALPLANEACT1: AstralPlaneAct1,
}

export type Act1Regions = (typeof Act1Regions)[keyof typeof Act1Regions]

export const Act1Locations = {
  // Astral Plane
  ASTRALPLANEACT1: AstralPlaneAct1Loc,
  // Nautiloid
  NAUTILOID: NautiloidLoc,
  // Wilderness
  BLIGHTEDVILLAGE: BlightedVillage,
  EMERALDGROVE: EmeraldGrove,
  FOREST: Forest,
  GOBLINCAMP: GoblinCamp,
  MOUNTAINPASS: MountainPass,
  OVERGROWNRUINS: OvergrownRuins,
  RAVAGEDBEACH: RavagedBeach,
  RISENROAD: RisenRoad,
  SECLUDEDCOVE: SecludedCove,
  SUNLITWETLANDS: SunlitWetlands,
  WAUKEENSREST: WaukeensRest,
  // Underdark

  // Rosymorn Monastery Trail
  CRECHEYLLEK: CrecheYllek,
  ROSYMORNMONASTERY: RosymornMonastery,
  ROSYMORNMONASTERYTRAIL: RosymornMonasteryTrail,
}

export type Act1Locations = (typeof Act1Locations)[keyof typeof Act1Locations]
