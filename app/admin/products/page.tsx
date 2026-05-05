import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  // Use admin client to bypass RLS for role check
  const adminClient = createAdminClient()
  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") {
    redirect("/?error=not-admin")
  }

  // ... baaki same code

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
          <Link href="/admin"
            className="px-4 py-2 border border-border text-xs uppercase tracking-widest hover:border-primary transition">
            ← Dashboard
          </Link>
          <Link href="/admin/products/new"
            className="px-5 py-2 bg-primary text-black text-xs uppercase tracking-widest hover:opacity-80 transition">
            + Add New
          </Link>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Perfume", "Ittar", "Gift"].map(cat => (
          <span key={cat}
            className="px-3 py-1 text-[11px] uppercase tracking-widest border border-border text-foreground/50">
            {cat}
          </span>
        ))}
      </div>

      <div className="border border-border">
        {products?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/40 text-sm mb-4">No products yet</p>
            <Link href="/admin/products/new"
              className="text-xs text-primary hover:underline uppercase tracking-widest">
              Add your first product →
            </Link>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-card text-[11px] uppercase tracking-widest text-foreground/40">
              <div className="col-span-1">Image</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Gender</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1">Stock</div>
              <div className="col-span-1">Action</div>
            </div>

            {products?.map((product, i) => (
              <div key={product.id}
                className={`flex md:grid md:grid-cols-12 gap-4 items-center px-5 py-4 ${
                  i !== 0 ? "border-t border-border" : ""
                }`}>
                <div className="col-span-1">
                  <div className="w-12 h-12 bg-secondary border border-border overflow-hidden flex-shrink-0">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name}
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-foreground/20 text-sm">✦</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-4 flex-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className={`text-[10px] mt-0.5 ${product.is_active ? "text-green-600" : "text-red-500"}`}>
                    {product.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="text-xs px-2 py-0.5 border border-border capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="col-span-1 hidden md:block">
                  <span className="text-xs text-foreground/60 capitalize">{product.gender}</span>
                </div>
                <div className="col-span-2 hidden md:block">
                  <p className="text-sm">₹{product.price.toLocaleString("en-IN")}</p>
                  {product.discount_price && (
                    <p className="text-xs text-primary">₹{product.discount_price.toLocaleString("en-IN")}</p>
                  )}
                </div>
                <div className="col-span-1 hidden md:block">
                  <p className={`text-sm ${product.stock === 0 ? "text-red-500" : "text-foreground"}`}>
                    {product.stock}
                  </p>
                </div>
                <div className="col-span-1 flex-shrink-0">
                  <Link href={`/admin/products/${product.id}/edit`}
                    className="text-xs px-3 py-1.5 border border-border hover:border-primary hover:text-primary transition block text-center">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}