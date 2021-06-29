import { Location } from "./location";

export interface Stage {
  id: string,
  name: string,
  dirtRally2LocationId: string,
  createdAt: Date,
  updatedAt: Date,
  slug: string
  location: Location,
}