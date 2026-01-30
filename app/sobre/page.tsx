import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Building2, Users, Award, TrendingUp } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-[#F3F8F4] to-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[#111A17] mb-4 font-serif">Sobre a H2M</h1>
            <p className="text-lg text-[#718878] max-w-2xl">Excelência em imóveis há mais de 15 anos</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-[#111A17] mb-6 font-serif">Nossa História</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Fundada em 2009, a H2M Imobiliária nasceu com o propósito de transformar a experiência de compra e
                    locação de imóveis de alto padrão. Nossa missão sempre foi oferecer não apenas propriedades
                    excepcionais, mas um serviço personalizado que atenda às expectativas mais exigentes.
                  </p>
                  <p>
                    Com mais de 15 anos de atuação no mercado imobiliário, consolidamos nossa posição como referência em
                    imóveis de luxo, sempre priorizando a transparência, profissionalismo e satisfação dos nossos
                    clientes.
                  </p>
                  <p>
                    Nosso portfólio cuidadosamente selecionado inclui apartamentos sofisticados, casas exclusivas,
                    coberturas premium e espaços comerciais de alto padrão nas melhores localizações.
                  </p>
                </div>
              </div>
              <div className="bg-[#F3F8F4] h-96 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#718878]/10 rounded-full mb-4">
                  <Building2 className="h-8 w-8 text-[#718878]" />
                </div>
                <h3 className="text-3xl font-bold text-[#111A17] mb-2">500+</h3>
                <p className="text-muted-foreground">Imóveis Negociados</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#718878]/10 rounded-full mb-4">
                  <Users className="h-8 w-8 text-[#718878]" />
                </div>
                <h3 className="text-3xl font-bold text-[#111A17] mb-2">1000+</h3>
                <p className="text-muted-foreground">Clientes Satisfeitos</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#718878]/10 rounded-full mb-4">
                  <Award className="h-8 w-8 text-[#718878]" />
                </div>
                <h3 className="text-3xl font-bold text-[#111A17] mb-2">15+</h3>
                <p className="text-muted-foreground">Anos de Experiência</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#718878]/10 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-[#718878]" />
                </div>
                <h3 className="text-3xl font-bold text-[#111A17] mb-2">98%</h3>
                <p className="text-muted-foreground">Taxa de Satisfação</p>
              </div>
            </div>

            <div className="bg-[#244235] text-white rounded-lg p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 font-serif">Nossos Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Excelência</h3>
                  <p className="text-white/80 leading-relaxed">
                    Buscamos a perfeição em cada detalhe, oferecendo apenas o melhor aos nossos clientes.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Confiança</h3>
                  <p className="text-white/80 leading-relaxed">
                    Transparência e ética são a base de todos os nossos relacionamentos comerciais.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Personalização</h3>
                  <p className="text-white/80 leading-relaxed">
                    Cada cliente é único e merece um atendimento sob medida para suas necessidades.
                  </p>
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
