"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AccountPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState("")
  const [form, setForm] = useState({ name: "", phone: "" })

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }

      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      const { data: o } = await supabase
        .from("orders")
        .select("*, order_items(product_name, quantity, price)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setProfile(p)
      setOrders(o ?? [])
      setForm({ name: p?.name ?? "", phone: p?.phone ?? "" })
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from("profiles")
      .update({ name: form.name, phone: form.phone })
      .eq("id", user!.id)
    setSuccess("Profile update ho gaya!")
    setSaving(false)
    setTimeout(() => setSuccess(""), 3000)
  }

  const STATUS_COLOR: Record<string, string> = {
    pending: "text-amber-600",
    confirmed: "text-blue-600",
    shipped: "text-purple-600",
    delivered: "text-green-600",
    cancelled: "text-red-500",
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-foreground/40 tracking-widest">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto pb-12">
      <h1 className="text-2xl font-light tracking-widest uppercase mb-8">My Account</h1>

      {/* Profile Section */}
      <div className="border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xs uppercase tracking-widest text-foreground/50 mb-4">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="text-xl font-medium text-primary uppercase">
              {profile?.name?.charAt(0) || profile?.email?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{profile?.name}</p>
            <p className="text-sm text-foreground/50">{profile?.email}</p>
            {profile?.role === "admin" && (
              <Link href="/admin"
                className="text-xs text-primary hover:underline mt-1 block">
                Admin Panel →
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-foreground/60 block mb-2">
              Full Name
            </label>
            <input
              type="text" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-foreground/60 block mb-2">
              Phone
            </label>
            <input
              type="tel" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="9876543210"
            />
          </div>

          {success && (
            <p className="text-green-600 text-xs">{success}</p>
          )}

          <button onClick={handleSave} disabled={saving}
            className="px-6 py-2.5 bg-primary text-black text-xs uppercase tracking-widest hover:opacity-80 transition disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-xs uppercase tracking-widest text-foreground/50 mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-foreground/40 mb-4">Abhi koi order nahi</p>
            <Link href="/shop"
              className="text-xs text-primary hover:underline uppercase tracking-widest">
              Shop karo →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id}
                className="border border-border rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-mono text-foreground/40">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-foreground/50 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total}</p>
                    <p className={`text-xs capitalize mt-0.5 ${STATUS_COLOR[order.status]}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-foreground/50 space-y-0.5">
                  {order.order_items?.map((item: any, i: number) => (
                    <p key={i}>{item.product_name} × {item.quantity}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}