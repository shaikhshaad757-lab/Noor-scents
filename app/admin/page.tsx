import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()
  if (profile?.role !== "admin") redirect("/")

  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })

  const { count: orderCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })

  return (
    <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto pb-12">
      <h1 className="text-3xl font-light tracking-widest uppercase mb-2">Admin Panel</h1>
      <p className="text-sm text-foreground/50 mb-10">Welcome, {user.email}</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border border-border p-6">
          <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Total Products</p>
          <p className="text-4xl font-light text-primary">{productCount ?? 0}</p>
        </div>
        <div className="border border-border p-6">
          <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Total Orders</p>
          <p className="text-4xl font-light text-primary">{orderCount ?? 0}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/products/new" className="flex flex-col items-center justify-center gap-2 p-8 bg-primary text-black hover:opacity-80 transition text-center">
          <span className="text-3xl">+</span>
          <span className="text-sm uppercase tracking-widest font-medium">Add New Product</span>
          <span className="text-xs opacity-70">Add perfume, ittar or gift set</span>
        </Link>
        <Link href="/admin/products" className="flex flex-col items-center justify-center gap-2 p-8 border border-border hover:border-primary transition text-center">
          <span className="text-3xl">📦</span>
          <span className="text-sm uppercase tracking-widest">All Products</span>
          <span className="text-xs text-foreground/50">View, edit, delete products</span>
        </Link>
        <Link href="/admin/orders" className="flex flex-col items-center justify-center gap-2 p-8 border border-border hover:border-primary transition text-center">
          <span className="text-3xl">🛒</span>
          <span className="text-sm uppercase tracking-widest">Orders</span>
          <span className="text-xs text-foreground/50">Manage customer orders</span>
        </Link>
        <Link href="/admin/categories" className="flex flex-col items-center justify-center gap-2 p-8 border border-border hover:border-primary transition text-center">
          <span className="text-3xl">🖼️</span>
          <span className="text-sm uppercase tracking-widest">Category Images</span>
          <span className="text-xs text-foreground/50">Change homepage images</span>
        </Link>
        <Link href="/admin/about" className="flex flex-col items-center justify-center gap-2 p-8 border border-border hover:border-primary transition text-center">
          <span className="text-3xl">📝</span>
          <span className="text-sm uppercase tracking-widest">Edit About Page</span>
          <span className="text-xs text-foreground/50">Update brand story and image</span>
        </Link>
        <Link href="/" className="flex flex-col items-center justify-center gap-2 p-6 border border-border hover:border-primary transition text-center">
          <span className="text-sm uppercase tracking-widest text-foreground/60">View Live Site</span>
        </Link>
      </div>
    </div>
  )
}
