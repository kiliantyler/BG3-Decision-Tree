import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import {
  ArcaneTower,
  DecrepiVillage,
  DreadHollow,
  EbonlakeGrotto,
  FesteringCove,
  Grymforge,
  SeluniteOutpost,
  Storehouse,
  UnderdarkLoc,
} from '.'

export const Underdark: Region = {
  id: 'underdark',
  name: 'Underdark',
  act: Act.I,
  sublocations: [
    UnderdarkLoc,
    ArcaneTower,
    EbonlakeGrotto,
    DecrepiVillage,
    DreadHollow,
    FesteringCove,
    SeluniteOutpost,
    Storehouse,
    Grymforge,
  ],
}
