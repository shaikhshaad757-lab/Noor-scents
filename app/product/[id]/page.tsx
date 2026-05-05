import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function OldProductPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", params.id)
    .single()

  if (product?.slug) {
    redirect(`/shop/${product.slug}`)
  }

  redirect("/shop")
}