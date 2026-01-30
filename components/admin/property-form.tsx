"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Property } from "@/lib/types"

interface PropertyFormProps {
  property?: Property
}

type PropertyFormData = {
  title: string
  description: string
  price: number
  condominio: number
  iptu: number
  type: string
  property_type: string
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  city: string
  state: string
  zip_code: string
  images: File[]
  existingImages: string[]
  featured: boolean
  status: string

}


export function PropertyForm({ property }: PropertyFormProps) {

  const [formData, setFormData] = useState<PropertyFormData>({
    title: property?.title || "",
    description: property?.description || "",
    price: property?.price || 0,
    condominio: property?.condominio || 0,
    iptu: property?.iptu || 0,
    type: property?.type || "sale",
    property_type: property?.property_type || "apartment",
    bedrooms: property?.bedrooms || 0,
    bathrooms: property?.bathrooms || 0,
    area: property?.area || 0,
    address: property?.address || "",
    city: property?.city || "",
    state: property?.state || "",
    zip_code: property?.zip_code || "",
    existingImages: property?.images || [],
    images: [],
    featured: property?.featured || false,
    status: property?.status || "available",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("Imagens novas selecionadas:", formData.images.length)
      console.log("Imagens eexistentes:", formData.existingImages.length)

      let uploadedImageUrls: string[] = []

      if (formData.images.length > 0) {
        const uploadPromises = formData.images.map(async (file, index) => {
          console.log(`Upload ${index + 1}/${formData.images.length}:`, file.name)

          const fileExt = file.name.split(".").pop()
          const fileName = `properties/${crypto.randomUUID()}.${fileExt}`

          const { error: uploadError } = await supabase.storage
            .from("properties")
            .upload(fileName, file, {
              contentType: file.type,
              upsert: false,
            })

          if (uploadError) {
            throw uploadError
          }

          const { data } = supabase.storage
            .from("properties")
            .getPublicUrl(fileName)

          return data.publicUrl
        })
        uploadedImageUrls = await Promise.all(uploadPromises)
      }

      const finalImages = [...(formData.existingImages || []), ...uploadedImageUrls]

      // 2️⃣ Dados para o banco
      const dataToSave = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        condominio: formData.condominio,
        iptu: formData.iptu,
        type: formData.type,
        property_type: formData.property_type,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        featured: formData.featured,
        status: formData.status,
        images: finalImages,
      }

      if (property) {
        const { error } = await supabase
          .from("properties")
          .update(dataToSave)
          .eq("id", property.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from("properties")
          .insert([dataToSave])

        if (error) throw error
      }

      alert("Imóvel salvo com sucesso!")
    } catch (error) {
      alert("Erro ao salvar imóvel")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-white border-border/50">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Título do Imóvel *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Ex: Apartamento Luxuoso em Área Nobre"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                placeholder="Descreva o imóvel com detalhes..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Transação *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Venda</SelectItem>
                  <SelectItem value="rent">Locação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property_type">Tipo de Imóvel *</Label>
              <Select
                value={formData.property_type}
                onValueChange={(value) => setFormData({ ...formData, property_type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartamento</SelectItem>
                  <SelectItem value="house">Casa</SelectItem>
                  <SelectItem value="penthouse">Cobertura</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="land">Terreno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value === "" ? 0 : Number(e.target.value), })}
                required
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condominio">Condomínio (R$)</Label> 
              <Input
                id="condominio"
                type="number"
                step="0.01"
                value={formData.condominio} 
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    condominio: e.target.value === "" ? 0 : Number(e.target.value),
                  })
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="iptu">IPTU (R$)</Label>
              <Input
                id="iptu"
                type="number"
                step="0.01"
                value={formData.iptu} 
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    iptu: e.target.value === "" ? 0 : Number(e.target.value), 
                  })
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área (m²) *</Label>
              <Input
                id="area"
                type="number"
                step="0.01"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value === "" ? 0 : Number(e.target.value), })}
                required
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Quartos</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value === "" ? 0 : Number(e.target.value), })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Banheiros</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value === "" ? 0 : Number(e.target.value), })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Endereço *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="Ex: Av. Principal, 1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                placeholder="Ex: São Paulo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
                placeholder="Ex: SP"
                maxLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip_code">CEP</Label>
              <Input
                id="zip_code"
                value={formData.zip_code}
                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                placeholder="00000-000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponível</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="sold">Vendido</SelectItem>
                  <SelectItem value="rented">Alugado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="images">Upload da Imagem</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFormData({ ...formData, images: e.target.files ? Array.from(e.target.files) : [],})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Imóvel em destaque
              </Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 p-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin")}
            disabled={loading}
            className="flex-1"
          >
            Cancelar
          </Button>
          <button type="submit" disabled={loading} className="bg-[#718878] hover:bg-[#244235] text-white flex-1">
            {loading ? "Salvando..." : property ? "Atualizar Imóvel" : "Adicionar Imóvel"}
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
