import { createSupabaseServer } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Bed, Bath, Maximize, MapPin, Share2, Heart } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import Link from "next/link"


export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createSupabaseServer()

  const { data: property } = await supabase.from("properties").select("*").eq("id", id).single()

  if (!property) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(property.price)

  const formatBRL = (value: number | null) =>
  value && value > 0
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
      }).format(value)
    : null

const formattedCondominio = formatBRL(property.condominio)
const formattedIPTU = formatBRL(property.iptu)


  const typeLabel = property.type === "sale" ? "Venda" : "Locação"
  const propertyTypeLabels = {
    apartment: "Apartamento",
    house: "Casa",
    commercial: "Comercial",
    land: "Terreno",
    penthouse: "Cobertura",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Image Gallery */}
        <section className="relative w-full flex justify-center bg-muted">
            <Carousel className="relative w-full max-w-[1200px]"> 
            <CarouselContent> 
              {(property.images?.length ? property.images : ["/placeholder.svg?height=800&width=1200"]).map(
                (image, index) => (
                  <CarouselItem key={index}> 
                    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]"> 
                      <Image
                        src={image}
                        alt={`${property.title} - imagem ${index + 1}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </CarouselItem>
                )
              )}
              
            </CarouselContent>

            <CarouselPrevious className="!left-2 !top-1/2 -translate-y-1/2" /> 
            <CarouselNext className="!right-2 !top-1/2 -translate-y-1/2" /> 
          </Carousel>
          
          <div className="absolute top-6 left-6 flex gap-2">
            <Badge className="bg-[#718878] hover:bg-[#244235] text-white">{typeLabel}</Badge>
            {property.featured && (
              <Badge variant="secondary" className="bg-white/90 text-[#244235]">
                Destaque
              </Badge>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    {propertyTypeLabels[property.property_type as keyof typeof propertyTypeLabels]}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#111A17] mb-4 text-balance font-serif">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>
                      {property.address}, {property.city} - {property.state}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 py-6 border-y border-border mb-6">
                  {property.bedrooms !== null && property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-[#718878]" />
                      <div>
                        <p className="text-sm text-muted-foreground">Quartos</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms !== null && property.bathrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-[#718878]" />
                      <div>
                        <p className="text-sm text-muted-foreground">Banheiros</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-[#718878]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Área</p>
                      <p className="font-semibold">{property.area}m²</p>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold text-[#111A17] mb-4">Sobre o Imóvel</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-[#F3F8F4] rounded-lg p-6">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Valor</p>
                    <p className="text-3xl font-bold text-[#244235]">{formattedPrice}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {formattedCondominio && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Condomínio</span>
                        <span className="font-semibold text-foreground">
                          {formattedCondominio}
                        </span>
                      </div>
                    )}

                    {formattedIPTU && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">IPTU</span>
                        <span className="font-semibold text-foreground">
                          {formattedIPTU}
                        </span>
                      </div>
                    )}
                  </div>


                  <div className="space-y-3">
                    <Link href="/contato">
                      <Button className="w-full bg-[#718878] hover:bg-[#244235] text-white" size="lg">
                        Agendar Visita
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-3">Interessado neste imóvel?</p>
                    <p className="text-sm font-medium text-foreground">
                      Entre em contato com nossos especialistas para mais informações e agendamento de visitas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
