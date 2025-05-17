import {
  BlightedVillage,
  EmeraldGrove,
  Forest,
  GoblinCamp,
  MountainPass,
  Nautoloid,
  RavagedBeach,
  RisenRoad,
  Rosymorn,
  SecludedCove,
  SunlitWetlands,
  Underdark,
  WaukeensRest,
  Wilderness,
} from '.'

export const Act1Locations = {
  NAUTOLOID: Nautoloid,
  WILDERNESS: Wilderness,
  EMERALDGROVE: EmeraldGrove,
  GOBLINCAMP: GoblinCamp,
  ROSYMORN: Rosymorn,
  MOUNTAINPASS: MountainPass,
  UNDERDARK: Underdark,
}

export type Act1Locations = (typeof Act1Locations)[keyof typeof Act1Locations]

export const Act1Sublocations = {
  RAVAGEDBEACH: RavagedBeach,
  SECLUDEDCOVE: SecludedCove,
  FOREST: Forest,
  BLIGHTEDVILLAGE: BlightedVillage,
  RISENROAD: RisenRoad,
  WAUKEENSREST: WaukeensRest,
  SUNLITWETLANDS: SunlitWetlands,
}

export type Act1Sublocations = (typeof Act1Sublocations)[keyof typeof Act1Sublocations]
