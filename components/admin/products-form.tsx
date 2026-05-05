"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Trash2 } from "lucide-react"

interface Product {
  id?: string
  name: string
  slug: string
  description: string
  price: number | string
  discount_price: number | string
  stock: number | string
  category: string
  gender: string
  images: string[]
  is_active: boolean
}

const generateSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim()

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter()
  const isEdit = !!product?.id

  const [form, setForm] = useState<Product>({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    discount_price: product?.discount_price ?? "",
    stock: product?.stock ?? "",
    category: product?.category ?? "perfume",
    gender: product?.gender ?? "unisex",
    images: product?.images ?? [],
    is_active: product?.is_active ?? true,
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>(product?.images ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setImageFiles(prev => [...prev, ...files])
    files.forEach(f => {
      const reader = new FileReader()
      reader.onload = ev => {
        setImagePreview(prev => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(f)
    })
  }

  const removeImage = (index: number) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const uploadImages = async (): Promise<string[]> => {
    const supabase = createClient()
    const urls: string[] = [...(form.images ?? [])]
    for (const file of imageFiles) {
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`
      const { data, error } = await supabase.storage.from("products").upload(fileName, file)
      if (error) throw new Error("Image upload failed: " + error.message)
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(data.path)
      urls.push(urlData.publicUrl)
    }
    return urls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const supabase = createClient()
      const imageUrls = await uploadImages()
      const payload = {
        name: form.name,
        slug: form.slug || generateSlug(form.name),
        description: form.description,
        price: Number(form.price),
        discount_price: form.discount_price ? Number(form.discount_price) : null,
        stock: Number(form.stock),
        category: form.category,
        gender: form.gender,
        images: imageUrls,
        is_active: form.is_active,
      }

      if (isEdit) {
        const { error } = await supabase.from("products").update(payload).eq("id", product!.id)
        if (error) throw error
        setSuccess("Product updated successfully!")
      } else {
        const { error } = await supabase.from("products").insert(payload)
        if (error) throw error
        setSuccess("Product added successfully!")
      }

      setTimeout(() => router.push("/admin/products"), 1000)
    } catch (err: any) {
      setError(err.message ?? "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return
    const supabase = createClient()
    await supabase.from("products").delete().eq("id", product!.id)
    router.push("/admin/products")
  }

  const inputClass = "w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
  const labelClass = "text-xs uppercase tracking-widest text-foreground/60 block mb-2"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className={labelClass}>Product Name *</label>
        <input type="text" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })}
          className={inputClass} placeholder="e.g. Royal Oud Attar" />
      </div>

      <div>
        <label className={labelClass}>Slug (URL)</label>
        <input type="text" value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
          className={`${inputClass} font-mono`} placeholder="royal-oud-attar" />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} resize-none`} placeholder="Product description..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Price (₹) *</label>
          <input type="number" required min="0" value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className={inputClass} placeholder="999" />
        </div>
        <div>
          <label className={labelClass}>Discount Price (₹)</label>
          <input type="number" min="0" value={form.discount_price}
            onChange={e => setForm({ ...form, discount_price: e.target.value })}
            className={inputClass} placeholder="799" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Stock *</label>
        <input type="number" required min="0" value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
          className={inputClass} placeholder="50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category *</label>
          <select value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className={inputClass}>
            <option value="perfume">Perfume</option>
            <option value="ittar">Ittar</option>
            <option value="gift">Gift Set</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Gender *</label>
          <select value={form.gender}
            onChange={e => setForm({ ...form, gender: e.target.value })}
            className={inputClass}>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Product Images</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange}
          className="w-full text-sm text-foreground/60 file:mr-4 file:py-2 file:px-4 file:border file:border-border file:text-xs file:uppercase file:tracking-wider file:bg-transparent file:cursor-pointer hover:file:border-primary transition" />
        {imagePreview.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {imagePreview.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt="" className="w-20 h-20 object-cover border border-border rounded" />
                <button type="button" onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="is_active" checked={form.is_active}
          onChange={e => setForm({ ...form, is_active: e.target.checked })}
          className="w-4 h-4 accent-primary" />
        <label htmlFor="is_active" className="text-xs uppercase tracking-widest text-foreground/60">
          Active (visible in shop)
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 text-xs px-4 py-3 rounded">{success}</div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="flex-1 bg-primary text-black py-3 text-xs uppercase tracking-widest hover:opacity-80 transition disabled:opacity-50">
          {loading ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete}
            className="px-5 py-3 border border-red-300 text-red-500 text-xs uppercase tracking-widest hover:bg-red-50 transition flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </form>
  )
}