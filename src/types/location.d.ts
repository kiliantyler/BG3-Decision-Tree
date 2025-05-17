export interface Sublocation {
  id: string
  name: string
  location: Location
}

export interface Location {
  id: string
  name: string
  sublocations?: Sublocation[]
}

export type AnyLocation = Location | Sublocation
