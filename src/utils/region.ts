import type { Act, ID, Location, Region } from '@/types'

/**
 * Creates a region with the necessary methods to handle location registration
 */
export function createRegion(params: {
  id: ID
  name: string
  act: Act
}): Region {
  const region: Region = {
    ...params,
    sublocations: [],
    registerLocation: function (location: Location) {
      // Add the location to the sublocations array if it's not already there
      if (!this.sublocations.some(loc => loc.id === location.id)) {
        this.sublocations.push(location)
      }
    },
  }

  return region
}
