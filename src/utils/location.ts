import type { Act, ID, Location, Region } from '@/types'

/**
 * Creates a location with the necessary methods to register itself with a region
 */
export function createLocation(params: {
  id: ID
  name: string
  act: Act
  region: Region
}): Location {
  const { region, ...locationParams } = params

  const location: Location = {
    ...locationParams,
    region,
    registerWithRegion: function (region: Region) {
      // Set the region property
      this.region = region
      // Register this location with the region
      region.registerLocation(this)
    },
  }

  // Register with the provided region immediately
  if (region) {
    location.registerWithRegion(region)
  }

  return location
}
