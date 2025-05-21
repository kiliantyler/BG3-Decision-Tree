import type { Act, ID, Location } from '.'

export interface Region {
  id: ID
  name: string
  act: Act
  sublocations: Location[] // Make this required, initialized as empty array
  registerLocation: (location: Location) => void // Method to register a location
}
