import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AboutManager } from "@/components/admin/about-manager"
import Link from "next/link"

export default async function AdminAboutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") redirect("/")

  const { data: about } = await supabase
    .from("about").select("*").single()

  return (
    <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light tracking-widest uppercase">Edit About Section</h1>
          <p className="text-sm text-foreground/50 mt-1">Update the About Us page content</p>
        </div>
        <Link href="/admin" className="text-xs text-foreground/50 hover:text-primary transition uppercase tracking-widest">
          Dashboard
        </Link>
      </div>
      <AboutManager about={about} />
    </div>
  )
}
