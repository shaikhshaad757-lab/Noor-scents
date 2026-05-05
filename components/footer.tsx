"use client"

import Link from "next/link"
import { useState } from "react"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.054 23.448a.75.75 0 00.922.922l5.584-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.951-1.355l-.355-.212-3.312.876.876-3.312-.212-.355A9.695 9.695 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?category=Men Perfume", label: "Men — Perfumes" },
  { href: "/shop?category=Men Attar", label: "Men — Attar" },
  { href: "/shop?category=Women Perfume", label: "Women — Perfumes" },
  { href: "/shop?category=Women Attar", label: "Women — Attar" },
  { href: "/shop?category=Gift Set", label: "Gift Sets" },
]

const infoLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/policies/shipping", label: "Shipping Policy" },
  { href: "/policies/refund", label: "Refund Policy" },
  { href: "/policies/privacy", label: "Privacy Policy" },
]

const badges = [
  { emoji: "🚚", title: "Free Delivery", sub: "On orders above ₹1000" },
  { emoji: "✅", title: "100% Authentic", sub: "Genuine products only" },
  { emoji: "💵", title: "Cash on Delivery", sub: "Pay at your doorstep" },
  { emoji: "🔒", title: "Secure Payments", sub: "Encrypted & safe" },
  { emoji: "🌿", title: "Cruelty Free", sub: "Never tested on animals" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setMsg(data.success ? "Subscribed successfully! 🎉" : data.error)
    setLoading(false)
    if (data.success) setEmail("")
  }

  return (
    <footer className="bg-card border-t border-border">

      {/* Trust Badges */}
      <div className="border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {badges.map(b => (
              <div key={b.title} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{b.emoji}</span>
                <p className="text-xs font-medium uppercase tracking-wider">{b.title}</p>
                <p className="text-[11px] text-foreground/50">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link href="/">
              <span className="text-2xl font-light tracking-[0.4em] text-gradient-gold">
                NOOR
              </span>
            </Link>
            <p className="mt-3 text-xs text-foreground/40 uppercase tracking-widest">
              Premium Attar & Perfume Collection
            </p>
            <p className="mt-4 text-sm text-foreground/50 leading-relaxed">
              Blending ancient oriental perfumery with modern Indian identity.
              Pure attars and luxury perfumes crafted for the connoisseur.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://instagram.com/noor.scents.official"
                target="_blank" rel="noopener noreferrer"
                className="p-2 border border-border hover:border-primary text-foreground/50 hover:text-primary transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/918303433075"
                target="_blank" rel="noopener noreferrer"
                className="p-2 border border-border hover:border-primary text-foreground/50 hover:text-primary transition-all duration-300">
                <WhatsAppIcon />
              </a>
              <a href="mailto:noorscents123.android@gmail.com"
                className="p-2 border border-border hover:border-primary text-foreground/50 hover:text-primary transition-all duration-300">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-foreground/40">
                <MapPin className="w-3 h-3" />
                Jajmau, Kanpur, Uttar Pradesh, India
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 mb-6">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 mb-6">Information</h3>
            <ul className="space-y-3">
              {infoLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 mb-6">Newsletter</h3>
            <p className="text-sm text-foreground/50 mb-4 leading-relaxed">
              Get exclusive offers and new arrivals first.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30"
              />
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-primary text-black text-[11px] uppercase tracking-widest hover:opacity-80 transition disabled:opacity-50">
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {msg && (
              <p className={`text-xs mt-2 ${msg.includes("🎉") ? "text-green-600" : "text-red-500"}`}>
                {msg}
              </p>
            )}
            <div className="mt-6 space-y-2.5">
              <a href="tel:+918303433075"
                className="flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +91 83034 33075
              </a>
              <a href="mailto:noorscents123.android@gmail.com"
                className="flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" />
                noorscents123.android@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-foreground/40">
            © 2026 Noor Scents. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: "/policies/privacy", label: "Privacy" },
              { href: "/policies/shipping", label: "Shipping" },
              { href: "/policies/refund", label: "Refunds" },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="text-[11px] text-foreground/40 hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}