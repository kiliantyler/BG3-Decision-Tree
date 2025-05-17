import type { Act, ID, Location } from '.'

export interface Region {
  id: ID
  name: string
  act: Act
  sublocations?: Location[]
}
