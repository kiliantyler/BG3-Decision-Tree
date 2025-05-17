import { Act } from '@/data/acts'
import type { Region } from '@/types/region'
import {
  BlightedVillage,
  Forest,
  RavagedBeach,
  RisenRoad,
  SecludedCove,
  SunlitWetlands,
  WaukeensRest,
  WildernessLoc,
} from '.'

export const Wilderness: Region = {
  id: 'wilderness',
  name: 'Wilderness',
  act: Act.I,
  sublocations: [
    WildernessLoc,
    RisenRoad,
    SunlitWetlands,
    WaukeensRest,
    BlightedVillage,
    Forest,
    RavagedBeach,
    SecludedCove,
  ],
}
