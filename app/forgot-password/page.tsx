"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg font-light mb-2">Email bhej diya! ✓</p>
          <p className="text-sm text-foreground/50 mb-6">
            Apna inbox check karo — reset link aa gaya hoga.
          </p>
          <Link href="/login" className="text-xs text-primary hover:underline uppercase tracking-widest">
            Login pe wapas jao
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-light tracking-[0.3em] text-center mb-2">NOOR</h1>
        <p className="text-center text-sm text-foreground/50 tracking-widest uppercase mb-10">
          Reset Password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-foreground/60 block mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="aap@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Bhej raha hoon..." : "Reset Link Bhejo"}
          </button>
        </form>

        <p className="text-center mt-6">
          <Link href="/login" className="text-xs text-foreground/50 hover:text-primary transition">
            Wapas Login
          </Link>
        </p>
      </div>
    </div>
  )
}