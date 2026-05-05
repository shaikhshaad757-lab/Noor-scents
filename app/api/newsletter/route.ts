import { adminclient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    const supabase = adminclient()

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.toLowerCase().trim() })

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already subscribed!" },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Something went wrong" },
      { status: 500 }
    )
  }
}