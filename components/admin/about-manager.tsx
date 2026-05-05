"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Upload, Check, Loader, Eye } from "lucide-react"
import Link from "next/link"

interface About {
  id: string
  title: string
  description: string
  image: string
}

export function AboutManager({ about }: { about: About | null }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: about?.title ?? "About Noor Scents",
    description: about?.description ?? "",
    image: about?.image ?? "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(about?.image ?? "")
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return form.image
    setUploading(true)
    const supabase = createClient()
    const ext = imageFile.name.split(".").pop()
    const fileName = `about-${Date.now()}.${ext}`
    const { data, error } = await supabase.storage
      .from("categories")
      .upload(fileName, imageFile, { upsert: true })
    if (error) throw new Error("Image upload failed: " + error.message)
    const { data: urlData } = supabase.storage
      .from("categories")
      .getPublicUrl(data.path)
    setUploading(false)
    return urlData.publicUrl
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess(false)

    try {
      const supabase = createClient()
      const imageUrl = await uploadImage()

      let dbError

      if (about?.id) {
        const { error } = await supabase
          .from("about")
          .update({
            title: form.title,
            description: form.description,
            image: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("id", about.id)
        dbError = error
      } else {
        const { error } = await supabase
          .from("about")
          .insert({
            title: form.title,
            description: form.description,
            image: imageUrl,
          })
        dbError = error
      }

      if (dbError) throw new Error(dbError.message)

      setForm(prev => ({ ...prev, image: imageUrl }))
      setImageFile(null)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      router.refresh()

    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  const inputClass = "w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
  const labelClass = "text-xs uppercase tracking-widest text-foreground/60 block mb-2"

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <label className={labelClass}>Page Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className={inputClass}
          placeholder="About Noor Scents"
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          rows={7}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="Write about your brand story, values, history..."
        />
        <p className="text-[11px] text-foreground/30 mt-1">
          {form.description.length} characters
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className={labelClass}>About Image (Optional)</label>
        <div className="flex gap-5 items-start">

          {/* Preview */}
          <div className="w-36 h-28 flex-shrink-0 border border-border overflow-hidden bg-secondary">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="About preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <span className="text-foreground/20 text-xl">✦</span>
                <span className="text-[10px] text-foreground/30 uppercase tracking-widest">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Upload */}
          <div className="space-y-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <div className="inline-flex items-center gap-2 px-4 py-2.5 border border-border hover:border-primary hover:text-primary text-xs uppercase tracking-widest transition cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                {imagePreview ? "Change Image" : "Upload Image"}
              </div>
            </label>
            {imageFile && (
              <p className="text-[11px] text-foreground/40">{imageFile.name}</p>
            )}
            <p className="text-[11px] text-foreground/30">
              Recommended: 800×600px or larger
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 text-xs px-4 py-3 rounded flex items-center gap-2">
          <Check className="w-4 h-4" />
          About section updated successfully! Changes are live on the website.
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-black text-xs uppercase tracking-widest hover:opacity-80 transition disabled:opacity-50"
        >
          {saving || uploading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              {uploading ? "Uploading Image..." : "Saving..."}
            </>
          ) : success ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>

        <Link
          href="/about"
          target="_blank"
          className="flex items-center gap-2 px-5 py-3 border border-border hover:border-primary text-xs uppercase tracking-widest transition"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Link>
      </div>

    </div>
  )
}