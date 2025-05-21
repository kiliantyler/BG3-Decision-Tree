import {
  ArfursMansion,
  AstralPlaneAct3,
  AstralPlaneAct3Loc,
  BaldursMouth,
  BasiliskGate,
  BloomridgePark,
  BlushingMermaid,
  Candulhallows,
  Circus,
  CountingHouse,
  DancingAxe,
  DevilsFee,
  ElerrathinsHome,
  ElfsongTavern,
  FelogyrsFireworks,
  FlymmCargo,
  ForgeOfTheNine,
  Graveyard,
  HouseOfGrief,
  HouseOfHope,
  HouseOfHopeLoc,
  LadyJannathsEstate,
  Lodge,
  LowerCity,
  LowerCityLoc,
  LowerCitySewers,
  LustrousLass,
  OldGarlowsPlace,
  OpenHandTemple,
  PhilgravesMansion,
  RequisitionedBarn,
  Rivington,
  RivingtonGeneral,
  RivingtonLoc,
  SharessCaress,
  SorcerousSundries,
  SouthSpan,
  SteelWatchFoundry,
  StormshoreTabernacle,
  SwordCoast,
  SzarrPalace,
  UndercityRuins,
  Underground,
  UndergroundLoc,
  UpperCity,
  UpperCityLoc,
  WaterQueensHouse,
  WineFestival,
  WyrmsCrossing,
  WyrmsCrossingLoc,
  WyrmsRockFortress,
} from '.'

export const Act3Regions = {
  AstralPlane: AstralPlaneAct3,
  HouseOfHope: HouseOfHope,
  LowerCity: LowerCity,
  Rivington: Rivington,
  Underground: Underground,
  UpperCity: UpperCity,
  WyrmsCrossing: WyrmsCrossing,
}

export type Act3Regions = (typeof Act3Regions)[keyof typeof Act3Regions]

export const Act3Locations = {
  // Astral Plane
  AstralPlane: AstralPlaneAct3Loc,

  // House of Hope
  HouseOfHope: HouseOfHopeLoc,

  // Lower City
  LowerCity: LowerCityLoc,
  BaldursMouth: BaldursMouth,
  BasiliskGate: BasiliskGate,
  BloomridgePark: BloomridgePark,
  BlushingMermaid: BlushingMermaid,
  Candulhallows: Candulhallows,
  CountingHouse: CountingHouse,
  DevilsFee: DevilsFee,
  ElerrathinsHome: ElerrathinsHome,
  ElfsongTavern: ElfsongTavern,
  FelogyrsFireworks: FelogyrsFireworks,
  FlymmCargo: FlymmCargo,
  ForgeOfTheNine: ForgeOfTheNine,
  Graveyard: Graveyard,
  HouseOfGrief: HouseOfGrief,
  LadyJannathsEstate: LadyJannathsEstate,
  Lodge: Lodge,
  LustrousLass: LustrousLass,
  OldGarlowsPlace: OldGarlowsPlace,
  PhilgravesMansion: PhilgravesMansion,
  SorcerousSundries: SorcerousSundries,
  SteelWatchFoundry: SteelWatchFoundry,
  StormshoreTabernacle: StormshoreTabernacle,
  SzarrPalace: SzarrPalace,
  WaterQueensHouse: WaterQueensHouse,
  WineFestival: WineFestival,

  // Rivington
  Rivington: RivingtonLoc,
  ArfursMansion: ArfursMansion,
  Circus: Circus,
  OpenHandTemple: OpenHandTemple,
  RequisitionedBarn: RequisitionedBarn,
  RivingtonGeneral: RivingtonGeneral,
  SouthSpan: SouthSpan,
  SwordCoast: SwordCoast,

  // Underground
  Underground: UndergroundLoc,
  LowerCitySewers: LowerCitySewers,
  UndercityRuins: UndercityRuins,

  // Upper City
  UpperCity: UpperCityLoc,

  // Wyrm's Crossing
  WyrmsCrossing: WyrmsCrossingLoc,
  DancingAxe: DancingAxe,
  SharessCaress: SharessCaress,
  WyrmsRockFortress: WyrmsRockFortress,
}

export type Act3Locations = (typeof Act3Locations)[keyof typeof Act3Locations]
