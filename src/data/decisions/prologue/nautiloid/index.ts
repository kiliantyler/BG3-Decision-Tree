import type { Region } from '@/types'
import { Ship } from './ship'

export * from './ship'

export const Nautiloid: Region = {
  name: 'Nautiloid',
  description: 'The Mindflayer ship you start on',
  wikiUrl: 'https://bg3.wiki/wiki/Nautiloid',

  Ship,
}
