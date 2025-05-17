import type { Region } from '.'
import type { ID } from './id'

export interface Act {
  id: ID
  name: string
  regions: Region[]
}
