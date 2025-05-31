import type { ReactNode } from 'react'
import type { Act, ID, Region } from '.'

export interface Location {
  id: ID
  name: string
  act: Act
  region?: Region // Make region optional during initialization
  registerWithRegion: (region: Region) => void // Method to register with a region
}

export interface LocationProps {
  location: Location
  isSelected?: boolean
  isVisited?: boolean
  className?: string
  children?: ReactNode
  onClick?: (location: Location) => void
}

export interface LocationListProps {
  locations: Location[]
  currentLocation?: Location
  visitedLocations?: ID[]
  onLocationSelect?: (location: Location) => void
  className?: string
}

export interface LocationContextValue {
  locations: Location[]
  currentLocation: Location | null
  visitedLocations: ID[]
  selectLocation: (location: Location) => void
  markLocationAsVisited: (locationId: ID) => void
}
