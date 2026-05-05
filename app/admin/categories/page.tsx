import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CategoriesManager } from "@/components/admin/categories-manager"

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") redirect("/")

  const { data: categories } = await supabase
    .from("categories").select("*").order("slug")

  return (
    <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light tracking-widest uppercase">Manage Categories</h1>
          <p className="text-sm text-foreground/50 mt-1">Update homepage category section images</p>
        </div>
        <Link href="/admin" className="text-xs text-foreground/50 hover:text-primary transition uppercase tracking-widest">
          Dashboard
        </Link>
      </div>
      <CategoriesManager categories={categories ?? []} />
    </div>
  )
}
