// Import all decisions from their respective files
import type { ActType, Location, Region } from '../types'
import { ChooseCharacter } from './nautiloid/chooseCharacter'
import { RecruitUs } from './nautiloid/recruitUs'
import { SaveShadowheart } from './nautiloid/saveShadowheart'

// Create a location with properly typed structure
const MainDeck: Location = {
  name: 'Main Deck',
  description: 'The main deck of the Nautiloid ship',

  // Decisions in this location
  ChooseCharacter,
  SaveShadowheart,
  RecruitUs,
}

// Create a region with properly typed structure
const Nautiloid: Region = {
  name: 'Nautiloid',
  description: 'The Mindflayer ship you start on',

  // Locations in this region
  MainDeck,
}

// Create Act1 with properly typed structure
export const Act1: ActType = {
  name: 'Act 1',
  description: 'The first act of the game',

  // Regions in this act
  Nautiloid,
}

// Access examples:
// Direct decision access: Act1.Nautiloid.MainDeck.SaveShadowheart
// Direct option access: Act1.Nautiloid.MainDeck.SaveShadowheart.OpenPod
// Options array access: Act1.Nautiloid.MainDeck.SaveShadowheart.options
