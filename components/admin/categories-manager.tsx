"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Upload, Check, Loader } from "lucide-react"

interface Category {
  id: string
  slug: string
  label: string
  image: string
}

export function CategoriesManager({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<Record<string, string>>(
    Object.fromEntries(categories.map(c => [c.slug, c.image]))
  )

  const handleUpload = async (slug: string, file: File) => {
    setLoading(slug)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      const ext = file.name.split(".").pop()
      const fileName = `category-${slug}-${Date.now()}.${ext}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("categories")
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw new Error("Upload failed: " + uploadError.message)

      const { data: urlData } = supabase.storage
        .from("categories")
        .getPublicUrl(uploadData.path)

      const publicUrl = urlData.publicUrl

      const { error: dbError } = await supabase
        .from("categories")
        .update({ image: publicUrl, updated_at: new Date().toISOString() })
        .eq("slug", slug)

      if (dbError) throw new Error("DB update failed: " + dbError.message)

      setImages(prev => ({ ...prev, [slug]: publicUrl }))
      setSuccess(slug)
      setTimeout(() => setSuccess(null), 3000)
      router.refresh()

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded">
          {error}
        </div>
      )}

      {categories.map(cat => (
        <div key={cat.slug} className="border border-border p-6">
          <div className="flex items-start gap-6">

            {/* Image Preview */}
            <div className="w-36 h-28 flex-shrink-0 border border-border overflow-hidden bg-secondary">
              {images[cat.slug] ? (
                <img
                  src={images[cat.slug]}
                  alt={cat.label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <span className="text-foreground/20 text-2xl">✦</span>
                  <span className="text-foreground/30 text-[10px] uppercase tracking-widest">
                    No Image
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-sm font-medium uppercase tracking-widest mb-1">
                {cat.label}
              </p>
              <p className="text-xs text-foreground/40 mb-1 font-mono">
                Category: {cat.slug}
              </p>
              <p className="text-xs text-foreground/40 mb-5">
                Shown in "Shop By Category" section on homepage
              </p>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={loading === cat.slug}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handleUpload(cat.slug, file)
                    e.target.value = ""
                  }}
                />
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 border text-xs uppercase tracking-widest transition ${
                  loading === cat.slug
                    ? "border-border text-foreground/30 cursor-not-allowed"
                    : success === cat.slug
                    ? "border-green-500 text-green-600 bg-green-50"
                    : "border-primary text-primary hover:bg-primary hover:text-black"
                }`}>
                  {loading === cat.slug ? (
                    <>
                      <Loader className="w-3.5 h-3.5 animate-spin" />
                      Uploading...
                    </>
                  ) : success === cat.slug ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Updated!
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      {images[cat.slug] ? "Change Image" : "Upload Image"}
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      ))}

      <div className="border border-border/50 p-4 bg-card">
        <p className="text-xs text-foreground/40 leading-relaxed">
          <span className="text-primary">Tip:</span> Use landscape images (4:3 ratio) for best results.
          Recommended size: 800×600px or larger. Images are stored in Supabase Storage.
        </p>
      </div>
    </div>
  )
}