import type { Act, ID, Region } from '.'

export interface Location {
  id: ID
  name: string
  act: Act
  region: Region
}
