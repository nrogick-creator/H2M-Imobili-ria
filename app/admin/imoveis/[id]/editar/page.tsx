import { createSupabaseServer } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { PropertyForm } from "@/components/admin/property-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EditarImovelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: property } = await supabase.from("properties").select("*").eq("id", id).single()

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#F3F8F4]">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-[#111A17] font-serif">Editar Imóvel</h1>
          <p className="text-muted-foreground mt-2">Atualize os dados do imóvel</p>
        </div>

        <PropertyForm property={property} />
      </main>
    </div>
  )
}
