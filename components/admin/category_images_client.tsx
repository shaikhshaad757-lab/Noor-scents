"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CategoryImage {
  id: string
  category: string
  image_url: string
}

const CATEGORY_LABELS: Record<string, string> = {
  perfume: "Perfumes",
  ittar: "Ittar",
  gift: "Gift Sets",
}

export function CategoryImagesClient({
  categories,
}: {
  categories: CategoryImage[]
}) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previews, setPreviews] = useState<Record<string, string>>(
    Object.fromEntries(categories.map(c => [c.category, c.image_url]))
  )

  const handleImageUpload = async (
    category: string,
    file: File
  ) => {
    setLoading(category)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()

      // Upload to storage
      const fileName = `category-${category}-${Date.now()}.${file.name.split(".").pop()}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(uploadData.path)

      const publicUrl = urlData.publicUrl

      // Update category_images table
      const { error: dbError } = await supabase
        .from("category_images")
        .update({ image_url: publicUrl, updated_at: new Date().toISOString() })
        .eq("category", category)

      if (dbError) throw dbError

      setPreviews(prev => ({ ...prev, [category]: publicUrl }))
      setSuccess(category)
      setTimeout(() => setSuccess(null), 2000)
      router.refresh()

    } catch (err: any) {
      setError(err.message ?? "Upload failed")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded">
          {error}
        </div>
      )}

      {["perfume", "ittar", "gift"].map(cat => (
        <div key={cat} className="border border-border p-6">
          <div className="flex items-start gap-6">

            {/* Preview */}
            <div className="w-32 h-32 flex-shrink-0 border border-border overflow-hidden bg-secondary">
              {previews[cat] ? (
                <img
                  src={previews[cat]}
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-foreground/20 text-2xl">✦</span>
                </div>
              )}
            </div>

            {/* Info + Upload */}
            <div className="flex-1">
              <p className="text-sm font-medium uppercase tracking-widest mb-1">
                {CATEGORY_LABELS[cat]}
              </p>
              <p className="text-xs text-foreground/50 mb-4">
                This image appears in the "Shop By Category" section on the homepage.
              </p>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handleImageUpload(cat, file)
                  }}
                />
                <div className={`inline-flex items-center gap-2 px-4 py-2 border text-xs uppercase tracking-widest transition ${
                  loading === cat
                    ? "border-primary text-primary opacity-50 cursor-not-allowed"
                    : success === cat
                    ? "border-green-500 text-green-600"
                    : "border-border hover:border-primary hover:text-primary"
                }`}>
                  {loading === cat
                    ? "Uploading..."
                    : success === cat
                    ? "Updated ✓"
                    : "Upload Image"}
                </div>
              </label>

              {previews[cat] && (
                <p className="text-[10px] text-foreground/30 mt-2 truncate max-w-xs">
                  {previews[cat]}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="border border-border p-4 bg-card">
        <p className="text-xs text-foreground/50 leading-relaxed">
          <span className="text-primary">Tip:</span> Use landscape images (4:3 ratio) for best results.
          Recommended size: 800x600px or larger.
        </p>
      </div>
    </div>
  )
}