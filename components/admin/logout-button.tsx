"use client"

import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout}>
      <LogOut className="h-4 w-4 mr-2" />
      Sair
    </Button>
  )
}
