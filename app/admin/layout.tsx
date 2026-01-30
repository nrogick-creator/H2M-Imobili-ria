import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - H2M Imobiliária",
  description: "Painel administrativo da H2M Imobiliária",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
