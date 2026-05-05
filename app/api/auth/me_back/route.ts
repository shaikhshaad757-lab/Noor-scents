import { adminclient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// This is the fix: forces Next.js to run this route dynamically
export const dynamic = "force-dynamic"

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 })
  }

  const adminDb = adminclient()
  const { data: profile } = await adminDb
    .from("profiles")
    .select("name, email, phone, role")
    .eq("id", user.id)
    .single()

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: profile?.name,
    phone: profile?.phone,
    role: profile?.role ?? "user",
  })
}