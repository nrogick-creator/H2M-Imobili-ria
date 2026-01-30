import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#111A17] text-[#F3F8F4]">
      <div className="container mx-auto px-4 py-12">

          <div className="flex flex-col items-center text-center mb-12">
            <Image
              src="/logo.png"
              alt="H2M Imobiliária"
              width={120}
              height={120}
              className="h-32 w-32 brightness-0 invert"
            />
            <p className="mt-4 text-sm text-[#F3F8F4]/70 leading-relaxed">
              CRESCI/RJ Nº 11.290
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start text-center md:text-left max-w-5xl mx-auto">
          <div className="w-full">
            <h3 className="font-semibold text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/imoveis?type=sale"
                  className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors"
                >
                  Comprar
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?type=rent"
                  className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors"
                >
                  Alugar
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h3 className="font-semibold text-lg mb-4 whitespace-nowrap">Tipos de Imóveis</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/imoveis?property_type=apartment"
                  className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors"
                >
                  Apartamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?property_type=house"
                  className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors"
                >
                  Casas
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?property_type=penthouse"
                  className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors"
                >
                  Coberturas
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?property_type=commercial"
                  className="text-sm text-[#F3F8F4]/70 hover:text-[#F3F8F4] transition-colors"
                >
                  Comerciais
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h3 className="font-semibold text-lg mb-4 whitespace-nowrap">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-[#718878]" />
                <span className="text-sm text-[#F3F8F4]/70">
                  Av. Olegário Maciel, 460 - Sala 210
                  <br />
                  Barra da Tijuca - Rio de Janeiro
                  < br />
                  CEP: 22621-200
                </span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#718878]" />
                <span className="text-sm text-[#F3F8F4]/70">(21) 3284-8520</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#718878]" />
                <span className="text-sm text-[#F3F8F4]/70">juridico@h2mimobiliaria.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F3F8F4]/10 mt-10 pt-8 text-center">
          <p className="text-sm text-[#F3F8F4]/50">
            © {new Date().getFullYear()} H2M Imobiliária. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
