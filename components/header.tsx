import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-25 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="H2M Imobiliária" width={50} height={50} className="h-30 w-35" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/imoveis?type=sale"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Comprar
          </Link>
          <Link
            href="/imoveis?type=rent"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Alugar
          </Link>
          <Link
            href="/sobre"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/admin">Admin</Link>
          </Button>
          <Button asChild className="bg-[#718878] hover:bg-[#244235] text-white">
            <Link href="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
