import { createClient } from "@/lib/supabase/server"
import { HomeClient } from "@/components/home-client"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  const { data: categoryImages } = await supabase
    .from("categories")
    .select("slug, image")

  return (
    <HomeClient
      products={products ?? []}
      categoryImages={categoryImages ?? []}
    />
  )
}