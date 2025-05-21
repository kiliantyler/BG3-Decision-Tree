import type { Act, ID, Region } from '.'

export interface Location {
  id: ID
  name: string
  act: Act
  region?: Region // Make region optional during initialization
  registerWithRegion: (region: Region) => void // Method to register with a region
}
