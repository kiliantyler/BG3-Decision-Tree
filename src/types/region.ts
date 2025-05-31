import type { ReactNode } from 'react'
import type { Act, ID, Location } from '.'

export interface Region {
  id: ID
  name: string
  act: Act
  sublocations: Location[] // Make this required, initialized as empty array
  registerLocation: (location: Location) => void // Method to register a location
}

export interface RegionProps {
  region: Region
  isExpanded?: boolean
  isSelected?: boolean
  className?: string
  children?: ReactNode
  onSelect?: (region: Region) => void
  onToggleExpand?: (region: Region) => void
}

export interface RegionListProps {
  regions: Region[]
  currentRegion?: Region
  expandedRegions?: ID[]
  onRegionSelect?: (region: Region) => void
  className?: string
}

export interface RegionContextValue {
  regions: Region[]
  currentRegion: Region | null
  expandedRegions: ID[]
  selectRegion: (region: Region) => void
  toggleRegionExpanded: (regionId: ID) => void
  getRegionLocations: (regionId: ID) => Location[]
}
