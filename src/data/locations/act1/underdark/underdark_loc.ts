import { Act } from '@/data/acts'
import type { Location } from '@/types'
import { Underdark } from '.'

export const UnderdarkLoc: Location = {
  id: 'underdark',
  name: 'Underdark',
  act: Act.I,
  region: Underdark,
}
