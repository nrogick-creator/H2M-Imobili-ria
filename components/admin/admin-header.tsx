import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "./logout-button"

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="H2M Imobiliária" width={40} height={40} className="h-10 w-auto" />
          <span className="font-semibold text-[#111A17]">Admin</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/" target="_blank">
              Ver Site
            </Link>
          </Button>
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
