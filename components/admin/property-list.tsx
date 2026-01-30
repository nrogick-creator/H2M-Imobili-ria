"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { PropertyCard } from "./property-card-admin"
import type { Property } from "@/lib/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface PropertyListProps {
  properties: Property[]
}

export function PropertyList({ properties }: PropertyListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleDelete = async () => {
    if (!deleteId) return

    setDeleting(true)
    try {
      const { error } = await supabase.from("properties").delete().eq("id", deleteId)

      if (error) throw error

      router.refresh()
      setDeleteId(null)
    } catch (error) {
      console.error("[v0] Error deleting property:", error)
      alert("Erro ao deletar imóvel")
    } finally {
      setDeleting(false)
    }
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg border border-border">
        <p className="text-muted-foreground">Nenhum imóvel cadastrado ainda</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} onDelete={() => setDeleteId(property.id)} />
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este imóvel? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deletando..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
