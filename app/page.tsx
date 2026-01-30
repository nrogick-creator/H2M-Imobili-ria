import { createSupabaseServer } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Building2, Key, Shield } from "lucide-react"
import type { Property } from "@/lib/types"

export default async function HomePage() {
  const supabase = await createSupabaseServer()

  const { data: featuredProperties } = await supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .eq("status", "available")
    .limit(3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-[#111A17]/60" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance font-serif drop-shadow-lg">
                Seu Imóvel dos Sonhos Está Aqui
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
                Imóveis de alto padrão cuidadosamente selecionados para você. Excelência, sofisticação e atendimento
                personalizado.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#718878] hover:bg-[#244235] text-white shadow-lg">
                  <Link href="/imoveis?type=sale">
                    Ver Imóveis à Venda
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#244235] bg-transparent shadow-lg"
                >
                  <Link href="/imoveis?type=rent">Ver Imóveis para Locação</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        {featuredProperties && featuredProperties.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#111A17] mb-4 font-serif">Imóveis em Destaque</h2>
                <p className="text-lg text-[#718878] max-w-2xl mx-auto">
                  Seleção exclusiva dos nossos melhores imóveis disponíveis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProperties.map((property: Property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="text-center">
                <Button asChild size="lg" variant="outline">
                  <Link href="/imoveis">
                    Ver Todos os Imóveis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-[#F3F8F4]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#111A17] mb-4 font-serif">Por que Escolher a H2M</h2>
              <p className="text-lg text-[#718878] max-w-2xl mx-auto">
                Experiência • Confiança • Resultado
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#718878]/10 rounded-full mb-6">
                  <Building2 className="h-8 w-8 text-[#718878]" />
                </div>
                <h3 className="text-xl font-semibold text-[#111A17] mb-3">Imóveis Selecionados</h3>
                <p className="text-[#718878] leading-relaxed">
                  Portfólio com os melhores imóveis do mercado, rigorosamente avaliados.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#718878]/10 rounded-full mb-6">
                  <Key className="h-8 w-8 text-[#718878]" />
                </div>
                <h3 className="text-xl font-semibold text-[#111A17] mb-3">Atendimento Personalizado</h3>
                <p className="text-[#718878] leading-relaxed">
                  Equipe especializada pronta para atender suas necessidades com excelência.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#718878]/10 rounded-full mb-6">
                  <Shield className="h-8 w-8 text-[#718878]" />
                </div>
                <h3 className="text-xl font-semibold text-[#111A17] mb-3">Segurança e Confiança</h3>
                <p className="text-[#718878] leading-relaxed">
                  Processos transparentes e seguros do início ao fim da sua jornada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#244235] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Pronto para Encontrar seu Próximo Lar?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Entre em contato conosco e descubra como podemos ajudá-lo a realizar seu sonho.
            </p>
            <Button asChild size="lg" className="bg-white text-[#244235] hover:bg-white/90">
              <Link href="/contato">Fale com um Especialista</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
