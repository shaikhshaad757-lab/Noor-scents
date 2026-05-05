"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, ArrowRight, Shield, Truck, Package } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "confirm" | "complete">("shipping")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [orderId, setOrderId] = useState("")
  const [user, setUser] = useState<any>(null)

  const shipping = totalPrice >= 500 ? 0 : 60
  const total = totalPrice + shipping

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  })

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login?redirectTo=/checkout"); return }
      setUser(user)

      const { data: profile } = await supabase
        .from("profiles")
        .select("name, phone, email")
        .eq("id", user.id)
        .single()

      if (profile) {
        setForm(f => ({
          ...f,
          name: profile.name ?? "",
          phone: profile.phone ?? "",
          email: profile.email ?? user.email ?? "",
        }))
      }
    }
    load()
  }, [])

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("confirm")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    setError("")

    try {
      const supabase = createClient()

      const { data: address, error: addrErr } = await supabase
        .from("addresses")
        .insert({
          user_id: user.id,
          name: form.name,
          phone: form.phone,
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        })
        .select()
        .single()

      if (addrErr) throw addrErr

      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          address_id: address.id,
          total: total,
          payment_method: "cod",
          payment_status: "pending",
          status: "pending",
        })
        .select()
        .single()

      if (orderErr) throw orderErr

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        quantity: item.quantity,
        price: item.price,
      }))

      const { error: itemsErr } = await supabase
        .from("order_items")
        .insert(orderItems)

      if (itemsErr) throw itemsErr

      for (const item of items) {
        await supabase.rpc("reduce_stock", {
          product_id: item.id,
          qty: item.quantity,
        })
      }

      setOrderId(order.id)
      clearCart()
      setStep("complete")
      window.scrollTo({ top: 0, behavior: "smooth" })

    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && step !== "complete") {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="w-24 h-24 bg-secondary border border-border flex items-center justify-center mx-auto mb-8">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-light mb-4">Nothing to Checkout</h1>
          <p className="text-muted-foreground mb-8">
            Add some fragrances before proceeding to checkout.
          </p>
          <Link href="/shop"
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-black text-[13px] uppercase tracking-[0.2em] hover:opacity-80 transition-all">
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  if (step === "complete") {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-lg">
          <div className="w-24 h-24 bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-primary" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Order Confirmed</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h1 className="text-3xl font-light mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-2 leading-relaxed">
            Your order has been placed successfully.
          </p>
          <p className="text-foreground mb-2">
            Order ID:{" "}
            <span className="text-primary font-mono text-sm">
              #{orderId.slice(0, 8).toUpperCase()}
            </span>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Payment: <span className="text-foreground">Cash on Delivery</span>
          </p>

          <div className="bg-card border border-border p-6 mb-8 text-left rounded-lg">
            <p className="text-[11px] text-muted-foreground tracking-wider uppercase mb-3">
              What's Next
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "You'll receive an order confirmation shortly",
                "Pay when your order is delivered",
                "Expected delivery in 3-5 business days",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account"
              className="px-8 py-3 border border-border text-sm uppercase tracking-widest hover:border-primary transition">
              My Orders
            </Link>
            <Link href="/shop"
              className="px-8 py-3 bg-primary text-black text-sm uppercase tracking-widest hover:opacity-80 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <h1 className="text-4xl font-light tracking-tight mb-10">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {[
            { id: "shipping", label: "Delivery Details", num: 1 },
            { id: "confirm", label: "Review Order", num: 2 },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              {i > 0 && (
                <div className={`w-12 h-px ${step === "confirm" ? "bg-primary" : "bg-border"}`} />
              )}
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 flex items-center justify-center text-sm transition-all ${
                  step === s.id
                    ? "bg-primary text-black"
                    : step === "confirm" && s.id === "shipping"
                    ? "bg-primary text-black"
                    : "bg-secondary border border-border text-muted-foreground"
                }`}>
                  {step === "confirm" && s.id === "shipping"
                    ? <Check className="w-4 h-4" />
                    : s.num}
                </div>
                <span className={`text-sm hidden sm:inline ${
                  step === s.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Form */}
          <div className="lg:col-span-7">

            {/* Step 1 */}
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-5">
                <h2 className="text-[11px] tracking-[0.2em] uppercase mb-4">
                  Delivery Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                      Full Name *
                    </label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                      Phone *
                    </label>
                    <input type="tel" required value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                    Email *
                  </label>
                  <input type="email" required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                    Address Line 1 *
                  </label>
                  <input type="text" required value={form.line1}
                    onChange={e => setForm({ ...form, line1: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="House / Flat number, Street name"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <input type="text" value={form.line2}
                    onChange={e => setForm({ ...form, line2: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="Landmark, Area"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                      City *
                    </label>
                    <input type="text" required value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="Delhi"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                      State *
                    </label>
                    <input type="text" required value={form.state}
                      onChange={e => setForm({ ...form, state: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="UP"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-wider text-muted-foreground uppercase mb-2">
                      Pincode *
                    </label>
                    <input type="text" required value={form.pincode}
                      onChange={e => setForm({ ...form, pincode: e.target.value })}
                      maxLength={6}
                      className="w-full px-4 py-3 bg-card border border-border focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="226001"
                    />
                  </div>
                </div>

                <button type="submit"
                  className="w-full py-3.5 bg-primary text-black text-[13px] uppercase tracking-[0.15em] hover:opacity-80 transition-colors">
                  Review Order →
                </button>
              </form>
            )}

            {/* Step 2 */}
            {step === "confirm" && (
              <div className="space-y-5">
                <h2 className="text-[11px] tracking-[0.2em] uppercase mb-4">
                  Review Your Order
                </h2>

                {/* Delivery Address */}
                <div className="border border-border rounded-lg p-5">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                    Delivery Address
                  </p>
                  <p className="text-sm font-medium">{form.name}</p>
                  <p className="text-sm text-muted-foreground">{form.phone}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {form.line1}{form.line2 ? `, ${form.line2}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {form.city}, {form.state} — {form.pincode}
                  </p>
                  <button
                    onClick={() => setStep("shipping")}
                    className="text-xs text-primary hover:underline mt-2">
                    Edit address
                  </button>
                </div>

                {/* Payment Method */}
                <div className="border border-primary/30 bg-primary/5 rounded-lg p-5">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                    Payment Method
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cash on Delivery (COD)</p>
                      <p className="text-xs text-muted-foreground">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="border border-border rounded-lg p-5">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                    Items ({items.length})
                  </p>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setStep("shipping")}
                    className="sm:flex-1 py-3.5 border border-border text-[13px] uppercase tracking-[0.15em] hover:border-primary transition-colors">
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="sm:flex-[2] py-3.5 bg-primary text-black text-[13px] uppercase tracking-[0.15em] hover:opacity-80 transition-colors disabled:opacity-50">
                    {loading
                      ? "Placing your order..."
                      : `Place Order — ₹${total.toLocaleString("en-IN")}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border sticky top-28 rounded-lg">
              <div className="p-6">
                <h2 className="text-[11px] tracking-[0.2em] uppercase mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 pb-4 border-b border-border max-h-60 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-12 h-14 flex-shrink-0 bg-secondary rounded overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name}
                            className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-foreground/10 text-xs">✦</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm flex-shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-primary" : ""}>
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] text-muted-foreground">
                      Free shipping on orders above ₹500
                    </p>
                  )}
                </div>

                <div className="flex justify-between py-4">
                  <span className="font-light">Total</span>
                  <span className="text-lg text-primary font-light">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 bg-secondary/50 border-t border-border rounded-b-lg space-y-2">
                {[
                  { icon: Shield, text: "100% Authentic Products" },
                  { icon: Truck, text: "3-5 business days delivery" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-[11px] text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}