import type { Location } from '@types'
import { RecruitUs } from './recruitUs'
import { SaveShadowheart } from './saveShadowheart'

export * from './chooseCharacter'
export * from './recruitUs'
export * from './saveShadowheart'

export const Ship: Location = {
  name: 'Ship',
  description: 'The entire Nautiloid ship',
  wikiUrl: 'https://bg3.wiki/wiki/Nautiloid',
  RecruitUs,
  SaveShadowheart,
}
