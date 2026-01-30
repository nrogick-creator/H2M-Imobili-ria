"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Eye } from "lucide-react"
import type { Property } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"


interface PropertyCardAdminProps {
  property: Property
  onDelete: () => void
}

export function PropertyCard({ property, onDelete }: PropertyCardAdminProps) {
    console.log("IMAGENS DO IMÓVEL:", property.images)
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
    <Card className="overflow-hidden border-border/50 bg-white">
      <div className="w-full max-w-full">
  <Carousel className="w-full relative">
    <CarouselContent>
      {(property.images?.length ? property.images : ["/placeholder.svg"]).map(
        (image, index) => (
          
          <CarouselItem key={index}>
            <div className="relative w-full aspect-[4/3] md:aspecti-[16/9]">
              <Image
                src={image}
                alt={`${property.title} - imagem ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
          
        )
      )}
    </CarouselContent>

    <CarouselPrevious className="!left-2 !top-1/2 -translate-y-1/2"/>
    <CarouselNext className="!right-2 !top-1/2 -translate-y-1/2"/>
  </Carousel>

  <div className="absolute top-3 left-3 flex gap-2 z-10">
    <Badge className="bg-[#718878] hover:bg-[#244235] text-white">
      {typeLabel}
    </Badge>
    {property.featured && (
      <Badge variant="secondary" className="bg-white/90 text-[#244235]">
        Destaque
      </Badge>
    )}
  </div>
</div>


      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{propertyTypeLabels[property.property_type]}</p>
        <h3 className="text-lg font-semibold text-balance line-clamp-2 mb-2">{property.title}</h3>
        <p className="text-xl font-bold text-[#244235]">{formattedPrice}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {property.city}, {property.state}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
          <Link href={`/imoveis/${property.id}`} target="_blank">
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
          <Link href={`/admin/imoveis/${property.id}/editar`}>
            <Pencil className="h-4 w-4 mr-1" />
            Editar
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-destructive hover:text-destructive bg-transparent"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
