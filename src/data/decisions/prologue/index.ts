import type { ActType } from '@/types'
import { Nautiloid } from './nautiloid'

export * from './nautiloid'

export const Prologue: ActType = {
  name: 'Prologue',
  description: 'The prologue of the game, set on the Nautiloid ship',
  wikiUrl: 'https://bg3.wiki/wiki/Escape_the_Nautiloid',

  Nautiloid,
}
