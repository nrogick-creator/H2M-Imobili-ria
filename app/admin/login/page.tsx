import { LoginForm } from "@/components/admin/login-form"
import Image from "next/image"
import { createSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F3F8F4] to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="H2M Imobiliária" width={80} height={80} className="h-20 w-auto mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#111A17] font-serif">Painel Administrativo</h1>
          <p className="text-muted-foreground mt-2">Entre com suas credenciais para acessar</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
