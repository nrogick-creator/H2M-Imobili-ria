export type PropertyType = "apartment" | "house" | "commercial" | "land" | "penthouse"
export type ListingType = "sale" | "rent"
export type PropertyStatus = "available" | "pending" | "sold" | "rented"

export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: ListingType
  property_type: PropertyType
  bedrooms: number | null
  bathrooms: number | null
  area: number
  address: string
  city: string
  state: string
  zip_code: string | null
  condominio: number | null
  iptu: number | null
  latitude: number | null
  longitude: number | null
  images: string[]
  featured: boolean
  status: PropertyStatus
  created_at: string
  updated_at: string
}
