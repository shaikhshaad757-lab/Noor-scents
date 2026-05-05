import { createClient } from "@/lib/supabase/server"
import { ShopClient } from "./ShopClient"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; gender?: string; q?: string }>
}) {
  const { category, gender, q } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (category) query = query.eq("category", category)
  if (gender) query = query.eq("gender", gender)
  if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`)

  const { data: products } = await query

  return (
    <ShopClient
      products={products ?? []}
      activeCategory={category ?? ""}
      activeGender={gender ?? ""}
    />
  )
}