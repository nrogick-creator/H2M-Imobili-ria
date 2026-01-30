import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3F8F4] to-white p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-[#718878] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#111A17] mb-4 font-serif">Página Não Encontrada</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-[#718878] hover:bg-[#244235] text-white">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/imoveis">
              <Search className="h-4 w-4 mr-2" />
              Ver Imóveis
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
