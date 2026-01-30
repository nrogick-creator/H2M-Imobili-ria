import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"
import type { Property } from "@/lib/types"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(property.price)

  const typeLabel = property.type === "sale" ? "Venda" : "Locação"
  const propertyTypeLabels = {
    apartment: "Apartamento",
    house: "Casa",
    commercial: "Comercial",
    land: "Terreno",
    penthouse: "Cobertura",
  }

  return (
    <Link href={`/imoveis/${property.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
        <div className="relative h-64 overflow-hidden bg-muted">
          <Image
            src={property.images[0] || "/placeholder.svg?height=400&width=600"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-[#718878] hover:bg-[#244235] text-white">{typeLabel}</Badge>
            {property.featured && (
              <Badge variant="secondary" className="bg-white/90 text-[#244235]">
                Destaque
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-2">
            <p className="text-sm text-muted-foreground">{propertyTypeLabels[property.property_type]}</p>
            <h3 className="text-xl font-semibold text-balance line-clamp-2 group-hover:text-[#718878] transition-colors">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {property.city}, {property.state}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {property.bedrooms !== null && property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== null && property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area}m²</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <p className="text-2xl font-bold text-[#244235]">{formattedPrice}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
