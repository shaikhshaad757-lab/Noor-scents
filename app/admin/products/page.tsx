import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") redirect("/")

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light tracking-widest uppercase">Products</h1>
          <p className="text-sm text-foreground/50 mt-1">{products?.length ?? 0} total products</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className="px-4 py-2 border border-border text-xs uppercase tracking-widest hover:border-primary transition">
            Dashboard
          </Link>
          <Link href="/admin/products/new" className="px-5 py-2 bg-primary text-black text-xs uppercase tracking-widest hover:opacity-80 transition">
            + Add New
          </Link>
        </div>
      </div>
      <div className="border border-border">
        {!products || products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/40 text-sm mb-4">No products yet</p>
            <Link href="/admin/products/new" className="text-xs text-primary hover:underline uppercase tracking-widest">
              Add your first product
            </Link>
          </div>
        ) : (
          products.map((product: any, i: number) => (
            <div key={product.id} className={`flex items-center gap-4 px-5 py-4 ${i !== 0 ? "border-t border-border" : ""}`}>
              <div className="w-12 h-12 bg-secondary border border-border overflow-hidden flex-shrink-0">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-foreground/20 text-sm">+</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-foreground/40 capitalize">{product.category} - {product.gender}</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm">Rs.{product.price}</p>
                <p className="text-xs text-foreground/40">Stock: {product.stock}</p>
              </div>
              <Link href={`/admin/products/${product.id}/edit`} className="text-xs px-3 py-1.5 border border-border hover:border-primary hover:text-primary transition">
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
