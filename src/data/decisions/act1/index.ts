import type { ActType } from '@/types'
import { AstralPlane } from './astralplane'
import { Rosymorn } from './rosymorn'
import { Underdark } from './underdark'
import { Wilderness } from './wilderness'

export const Act1: ActType = {
  name: 'Act 1',
  description: 'The first act of the game',
  wikiUrl: 'https://bg3.wiki/wiki/Act_One',

  // Regions in this act
  Wilderness,
  AstralPlane,
  Rosymorn,
  Underdark,
}
