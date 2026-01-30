import { createSupabaseServer } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import type { Property, ListingType, PropertyType } from "@/lib/types"
import { Search } from "lucide-react"

interface SearchParams {
  type?: ListingType
  property_type?: PropertyType
  city?: string
}

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createSupabaseServer()

  let query = supabase
    .from("properties")
    .select("*")
    .eq("status", "available")
    .order("created_at", { ascending: false })

  if (params.type) {
    query = query.eq("type", params.type)
  }

  if (params.property_type) {
    query = query.eq("property_type", params.property_type)
  }

  if (params.city) {
    query = query.ilike("city", `%${params.city}%`)
  }

  const { data: properties } = await query

  const typeLabel = params.type === "sale" ? "Venda" : params.type === "rent" ? "Locação" : "Todos"
  const title = `Imóveis para ${typeLabel}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-[#F3F8F4] to-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[#111A17] mb-4 font-serif">{title}</h1>
            <p className="text-lg text-[#718878]">
              {properties?.length || 0} {properties?.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="bg-white border border-border rounded-lg p-6 mb-8">
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  variant={!params.type ? "default" : "outline"}
                  className={!params.type ? "bg-[#718878] hover:bg-[#244235]" : ""}
                >
                  <a href="/imoveis">Todos</a>
                </Button>
                <Button
                  asChild
                  variant={params.type === "sale" ? "default" : "outline"}
                  className={params.type === "sale" ? "bg-[#718878] hover:bg-[#244235]" : ""}
                >
                  <a href="/imoveis?type=sale">Venda</a>
                </Button>
                <Button
                  asChild
                  variant={params.type === "rent" ? "default" : "outline"}
                  className={params.type === "rent" ? "bg-[#718878] hover:bg-[#244235]" : ""}
                >
                  <a href="/imoveis?type=rent">Locação</a>
                </Button>

                <div className="w-px bg-border mx-2" />

                <Button
                  asChild
                  variant={params.property_type === "apartment" ? "default" : "outline"}
                  className={params.property_type === "apartment" ? "bg-[#718878] hover:bg-[#244235]" : ""}
                >
                  <a href={`/imoveis?${params.type ? `type=${params.type}&` : ""}property_type=apartment`}>
                    Apartamentos
                  </a>
                </Button>
                <Button
                  asChild
                  variant={params.property_type === "house" ? "default" : "outline"}
                  className={params.property_type === "house" ? "bg-[#718878] hover:bg-[#244235]" : ""}
                >
                  <a href={`/imoveis?${params.type ? `type=${params.type}&` : ""}property_type=house`}>Casas</a>
                </Button>
                <Button
                  asChild
                  variant={params.property_type === "penthouse" ? "default" : "outline"}
                  className={params.property_type === "penthouse" ? "bg-[#718878] hover:bg-[#244235]" : ""}
                >
                  <a href={`/imoveis?${params.type ? `type=${params.type}&` : ""}property_type=penthouse`}>
                    Coberturas
                  </a>
                </Button>
              </div>
            </div>

            {/* Properties Grid */}
            {properties && properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property: Property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum imóvel encontrado</h3>
                <p className="text-muted-foreground mb-6">Tente ajustar seus filtros de busca</p>
                <Button asChild>
                  <a href="/imoveis">Ver todos os imóveis</a>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
