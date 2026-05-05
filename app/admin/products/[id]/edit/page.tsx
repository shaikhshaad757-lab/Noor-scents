import { createClient } from "@/lib/supabase/server"
import { ProductForm } from "@/components/admin/products-form"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products").select("*").eq("id", id).single()

  if (!product) redirect("/admin/products")

  return (
    <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light tracking-widest uppercase">Edit Product</h1>
        <Link href="/admin/products"
          className="text-xs text-foreground/50 hover:text-primary transition uppercase tracking-widest">
          ← Back
        </Link>
      </div>
      <ProductForm product={product} />
    </div>
  )
}