import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-[#F3F8F4] to-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[#111A17] mb-4 font-serif">Entre em Contato</h1>
            <p className="text-lg text-[#718878]">Estamos prontos para ajudá-lo a encontrar o imóvel ideal</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-[#111A17] mb-6 font-serif">Fale com Nossos Especialistas</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" type="tel" placeholder="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Como podemos ajudar?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" rows={5} placeholder="Conte-nos mais sobre o que você procura..." />
                  </div>
                  <Button type="submit" className="w-full bg-[#718878] hover:bg-[#244235] text-white">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#111A17] mb-6 font-serif">Informações de Contato</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#718878]/10 rounded-full flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-[#718878]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111A17] mb-1">Endereço</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Av. Olegário Maciel, 460 - Sala 210
                            <br />
                            Barra da Tijuca - Rio de Janeiro
                            <br />
                            CEP: 22621-200
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#718878]/10 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-[#718878]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111A17] mb-1">Telefone</h3>
                          <p className="text-muted-foreground">(21) 3284-8520</p>
                        
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#718878]/10 rounded-full flex items-center justify-center">
                          <Mail className="h-6 w-6 text-[#718878]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111A17] mb-1">Email</h3>
                          <p className="text-muted-foreground">juridico@h2mimobiliaria.com</p>
                          
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#718878]/10 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-[#718878]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111A17] mb-1">Horário de Atendimento</h3>
                          <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                          <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                        </div>
                      </CardContent>
                    </Card>
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
