import { createSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { PropertyList } from "@/components/admin/property-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: properties } = await supabase.from("properties").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-[#F3F8F4]">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111A17] font-serif">Gerenciar Imóveis</h1>
            <p className="text-muted-foreground mt-2">Adicione, edite ou remova imóveis do catálogo</p>
          </div>
          <Button asChild className="bg-[#718878] hover:bg-[#244235] text-white">
            <Link href="/admin/imoveis/novo">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Imóvel
            </Link>
          </Button>
        </div>

        <PropertyList properties={properties || []} />
      </main>
    </div>
  )
}
