// Export all decisions for easy import elsewhere
// Act 1 decisions
import {
  AstralCrystal,
  MindflayerPod,
  PsychicEcho,
} from './act1/astralplane/decisions'
import {
  DefenseMechanism,
  JoinTadpoles,
  SaveCompanion,
} from './act1/nautiloid/decisions'
import { Intro } from './act1/nautiloid/intro'
import {
  AncientCells,
  MonasteryEntrance,
  SacredScrolls,
} from './act1/rosymorn/decisions'
import {
  BuletteLair,
  DeepDuergars,
  MyconidColony,
  SussurCave,
} from './act1/underdark/decisions'
import {
  BlightedVillage,
  DruidGroveConflict,
  GoblinCamp,
  OwlbearCub,
} from './act1/wilderness/decisions'

// Act 2 decisions
import {
  CursedArtifact,
  CursedLands,
  HauntedVillage,
  ShadowCult,
} from './act2/shadowcursed/decisions'
import {
  DarkPortal,
  LostSpirit,
  ShadowLord,
  ShadowNexus,
} from './act2/shadowfell/decisions'

// Act 3 decisions
import {
  AstralKeys,
  ElderBrain,
  Planeshift,
} from './act3/astralplane/decisions'
import {
  DealWithDevil,
  ForbiddenLibrary,
  InfernalContract,
} from './act3/houseofhope/decisions'
import {
  DocksSecret,
  SlumsRebellion,
  ThievesGuild,
} from './act3/lowercity/decisions'
import {
  ForgottenTavern,
  Marketplace,
  RefugeeCrisis,
} from './act3/rivington/decisions'
import {
  ForgottenShrine,
  SmugglersTunnels,
  UndergroundColiseum,
} from './act3/underground/decisions'
import {
  GrandBall,
  HighJustice,
  ImperialDecree,
  NobleFactions,
} from './act3/uppercity/decisions'
import {
  BridgeGuards,
  BridgeSabotage,
  TollDispute,
} from './act3/wyrmscrossing/decisions'

// Helper function to add region information to decisions
function addRegionInfo(decision: any, region: string) {
  return { ...decision, region }
}

// Create a flat array of all decisions with region information
export const allDecisions = [
  // Act 1 decisions
  // Nautiloid region
  addRegionInfo(Intro, 'Nautiloid'),
  addRegionInfo(JoinTadpoles, 'Nautiloid'),
  addRegionInfo(SaveCompanion, 'Nautiloid'),
  addRegionInfo(DefenseMechanism, 'Nautiloid'),

  // Wilderness region
  addRegionInfo(DruidGroveConflict, 'Wilderness'),
  addRegionInfo(GoblinCamp, 'Wilderness'),
  addRegionInfo(OwlbearCub, 'Wilderness'),
  addRegionInfo(BlightedVillage, 'Wilderness'),

  // Underdark region
  addRegionInfo(MyconidColony, 'Underdark'),
  addRegionInfo(BuletteLair, 'Underdark'),
  addRegionInfo(DeepDuergars, 'Underdark'),
  addRegionInfo(SussurCave, 'Underdark'),

  // Rosymorn region
  addRegionInfo(MonasteryEntrance, 'Rosymorn Monastery'),
  addRegionInfo(AncientCells, 'Rosymorn Monastery'),
  addRegionInfo(SacredScrolls, 'Rosymorn Monastery'),

  // Astral Plane region (Act 1)
  addRegionInfo(MindflayerPod, 'Astral Plane'),
  addRegionInfo(AstralCrystal, 'Astral Plane'),
  addRegionInfo(PsychicEcho, 'Astral Plane'),

  // Act 2 decisions
  // Shadowfell region
  addRegionInfo(ShadowLord, 'Shadowfell'),
  addRegionInfo(DarkPortal, 'Shadowfell'),
  addRegionInfo(LostSpirit, 'Shadowfell'),
  addRegionInfo(ShadowNexus, 'Shadowfell'),

  // Shadow-cursed Lands region
  addRegionInfo(CursedLands, 'Shadow-cursed Lands'),
  addRegionInfo(HauntedVillage, 'Shadow-cursed Lands'),
  addRegionInfo(CursedArtifact, 'Shadow-cursed Lands'),
  addRegionInfo(ShadowCult, 'Shadow-cursed Lands'),

  // Act 3 decisions
  // Lower City region
  addRegionInfo(ThievesGuild, 'Lower City'),
  addRegionInfo(DocksSecret, 'Lower City'),
  addRegionInfo(SlumsRebellion, 'Lower City'),

  // Upper City region
  addRegionInfo(NobleFactions, 'Upper City'),
  addRegionInfo(GrandBall, 'Upper City'),
  addRegionInfo(ImperialDecree, 'Upper City'),
  addRegionInfo(HighJustice, 'Upper City'),

  // Astral Plane region (Act 3)
  addRegionInfo(AstralKeys, 'Astral Plane'),
  addRegionInfo(ElderBrain, 'Astral Plane'),
  addRegionInfo(Planeshift, 'Astral Plane'),

  // House of Hope region
  addRegionInfo(DealWithDevil, 'House of Hope'),
  addRegionInfo(InfernalContract, 'House of Hope'),
  addRegionInfo(ForbiddenLibrary, 'House of Hope'),

  // Underground region
  addRegionInfo(UndergroundColiseum, 'Underground'),
  addRegionInfo(SmugglersTunnels, 'Underground'),
  addRegionInfo(ForgottenShrine, 'Underground'),

  // Rivington region
  addRegionInfo(Marketplace, 'Rivington'),
  addRegionInfo(RefugeeCrisis, 'Rivington'),
  addRegionInfo(ForgottenTavern, 'Rivington'),

  // Wyrm's Crossing region
  addRegionInfo(BridgeGuards, "Wyrm's Crossing"),
  addRegionInfo(TollDispute, "Wyrm's Crossing"),
  addRegionInfo(BridgeSabotage, "Wyrm's Crossing"),
]

// Group decisions by act and region for sidebar display
export function getDecisionsByActAndRegion() {
  // Create a hierarchical structure of decisions by act and region
  const actGroups: Record<
    string,
    {
      act: any
      regions: Record<string, any[]>
    }
  > = {}

  // Group decisions by act and region
  allDecisions.forEach(decision => {
    const actId = decision.act.id
    const regionName = (decision as any).region || 'Unknown'

    // Initialize act group if it doesn't exist
    if (!actGroups[actId]) {
      actGroups[actId] = {
        act: decision.act,
        regions: {},
      }
    }

    // Initialize region group if it doesn't exist
    if (!actGroups[actId].regions[regionName]) {
      actGroups[actId].regions[regionName] = []
    }

    // Add decision to the appropriate region
    actGroups[actId].regions[regionName].push(decision)
  })

  // Convert to array format for easier iteration in React
  return Object.values(actGroups).map(actGroup => ({
    ...actGroup,
    regions: Object.entries(actGroup.regions).map(([name, decisions]) => ({
      name,
      decisions,
    })),
  }))
}

// Export all individual decisions for direct imports
export {
  AncientCells,
  AstralCrystal,
  AstralKeys,
  BlightedVillage,
  BridgeGuards,
  BridgeSabotage,
  BuletteLair,
  CursedArtifact,
  CursedLands,
  DarkPortal,
  DealWithDevil,
  DeepDuergars,
  DefenseMechanism,
  DocksSecret,
  DruidGroveConflict,
  ElderBrain,
  ForbiddenLibrary,
  ForgottenShrine,
  ForgottenTavern,
  GoblinCamp,
  GrandBall,
  HauntedVillage,
  HighJustice,
  ImperialDecree,
  InfernalContract,
  // Act 1
  Intro,
  JoinTadpoles,
  LostSpirit,
  Marketplace,
  MindflayerPod,
  MonasteryEntrance,
  MyconidColony,
  NobleFactions,
  OwlbearCub,
  Planeshift,
  PsychicEcho,
  RefugeeCrisis,
  SacredScrolls,
  SaveCompanion,
  ShadowCult,
  // Act 2
  ShadowLord,
  ShadowNexus,
  SlumsRebellion,
  SmugglersTunnels,
  SussurCave,
  // Act 3
  ThievesGuild,
  TollDispute,
  UndergroundColiseum,
}
