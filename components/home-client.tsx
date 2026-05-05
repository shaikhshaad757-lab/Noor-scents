"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Check, Truck, Shield } from "lucide-react"
import { useCart } from "@/context/cart-context"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  discount_price: number | null
  stock: number
  category: string
  gender: string
  images: string[]
  description: string
}

interface CategoryImage {
  slug: string
  image: string
}

const FILTERS = [
  { label: "All", category: "", gender: "" },
  { label: "Perfumes", category: "perfume", gender: "" },
  { label: "Ittar", category: "ittar", gender: "" },
  { label: "Gift Sets", category: "gift", gender: "" },
  { label: "For Men", category: "", gender: "men" },
  { label: "For Women", category: "", gender: "women" },
]

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discount_price ?? product.price,
      image: product.images?.[0] ?? "",
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : null

  return (
    <div className="group border border-border hover:border-primary/50 transition-all duration-300 bg-card">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl text-foreground/10">✦</span>
            </div>
          )}
          {discount && (
            <span className="absolute top-2 left-2 bg-primary text-black text-[10px] px-2 py-0.5 uppercase tracking-wider">
              -{discount}%
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-foreground/60">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-widest text-primary/70">
            {product.category}
          </span>
          <span className="text-[10px] text-foreground/30">·</span>
          <span className="text-[10px] uppercase tracking-widest text-foreground/40">
            {product.gender}
          </span>
        </div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-light mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">
            ₹{(product.discount_price ?? product.price).toLocaleString("en-IN")}
          </span>
          {product.discount_price && (
            <span className="text-xs text-foreground/30 line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className={`w-full py-2 text-[11px] uppercase tracking-widest border transition-all duration-300 ${
            added
              ? "bg-primary text-black border-primary"
              : "border-border hover:border-primary hover:text-primary"
          } disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

export function HomeClient({
  products,
  categoryImages = [],
}: {
  products: Product[]
  categoryImages?: CategoryImage[]
}) {
  const [activeFilter, setActiveFilter] = useState({ category: "", gender: "" })
  const [email, setEmail] = useState("")
  const [subMsg, setSubMsg] = useState("")
  const [subLoading, setSubLoading] = useState(false)

  const getCategoryImage = (slug: string, fallback: string) => {
    const found = categoryImages.find(c => c.slug === slug)
    if (found?.image && found.image.trim() !== "") return found.image
    return fallback
  }

  const filtered = products.filter(p => {
    if (activeFilter.category && p.category !== activeFilter.category) return false
    if (activeFilter.gender && p.gender !== activeFilter.gender) return false
    return true
  })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubLoading(true)
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setSubMsg(data.success ? "Thank you for subscribing! 🎉" : data.error)
    setSubLoading(false)
    if (data.success) setEmail("")
  }

  return (
    <div className="min-h-screen">
      {/* Top Banner */}
      <div className="bg-primary text-black text-center py-2.5 text-[11px] uppercase tracking-[0.2em]">
        Free Shipping on orders above ₹1000 &nbsp;|&nbsp; Cash on Delivery Available
      </div>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&h=1080&fit=crop"
            alt="Noor Scents"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-[11px] tracking-[0.4em] uppercase">
                Premium Attar & Perfume Collection
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-8">
              <span className="block">Discover</span>
              <span className="block text-gradient-gold">Timeless</span>
              <span className="block">Elegance</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/60 font-light leading-relaxed mb-10 max-w-xl">
              Pure attars and luxury perfumes crafted from the finest ingredients.
              Authentic fragrances that last all day, every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-black text-[13px] uppercase tracking-[0.2em] hover:opacity-80 transition-all duration-500">
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/shop?category=ittar"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-foreground/20 text-foreground text-[13px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-500">
                Shop Ittar
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>

        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-8">
          {[
            { value: "100+", label: "Fragrances" },
            { value: "50+", label: "Years Legacy" },
            { value: "25k+", label: "Happy Clients" },
          ].map(stat => (
            <div key={stat.label} className="text-right">
              <p className="text-2xl font-light text-primary">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-5 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6">
            {[
              { icon: Truck, text: "Free Shipping Above ₹1000" },
              { icon: Shield, text: "100% Authentic Products" },
              { icon: Check, text: "Cash on Delivery Available" },
              { icon: Star, text: "Premium Quality Guaranteed" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-[11px] text-foreground/60 tracking-[0.1em] uppercase">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-28" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Our Collection</span>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
              Find Your Perfect Scent
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTERS.map(filter => {
              const isActive =
                activeFilter.category === filter.category &&
                activeFilter.gender === filter.gender
              return (
                <button
                  key={filter.label}
                  onClick={() => setActiveFilter({
                    category: filter.category,
                    gender: filter.gender,
                  })}
                  className={`px-5 py-2 text-[11px] uppercase tracking-widest border transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-black border-primary"
                      : "border-border text-foreground/60 hover:border-primary hover:text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl text-foreground/10 mb-4">✦</p>
              <p className="text-foreground/40 text-sm mb-2">No products yet</p>
              <p className="text-foreground/30 text-xs">Add products from the admin panel</p>
              <Link href="/admin"
                className="inline-block mt-4 text-xs text-primary hover:underline uppercase tracking-widest">
                Go to Admin →
              </Link>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl text-foreground/10 mb-4">✦</p>
              <p className="text-foreground/40 text-sm">No products in this category</p>
              <button
                onClick={() => setActiveFilter({ category: "", gender: "" })}
                className="mt-4 text-xs text-primary hover:underline uppercase tracking-widest"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/shop"
                className="group inline-flex items-center gap-2 text-[13px] text-foreground/60 hover:text-primary tracking-wider uppercase transition-colors">
                View All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section — Dynamic from Admin */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-primary text-[11px] tracking-[0.3em] uppercase">
                Browse By Category
              </span>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="text-3xl font-light tracking-tight">Shop By Category</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Perfumes",
                desc: "Long-lasting luxury sprays",
                href: "/shop?category=perfume",
                slug: "perfume",
                fallback: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=600&fit=crop",
              },
              {
                title: "Ittar",
                desc: "Pure alcohol-free attar oils",
                href: "/shop?category=ittar",
                slug: "ittar",
                fallback: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop",
              },
              {
                title: "Gift Sets",
                desc: "Curated fragrance collections",
                href: "/shop?category=gift",
                slug: "gift",
                fallback: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop",
              },
            ].map(cat => (
              <Link key={cat.slug} href={cat.href}
                className="group relative aspect-[4/3] overflow-hidden">
                <img
                  src={getCategoryImage(cat.slug, cat.fallback)}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-light mb-1">{cat.title}</h3>
                  <p className="text-sm text-foreground/60 mb-3">{cat.desc}</p>
                  <div className="flex items-center gap-2 text-[12px] text-primary tracking-widest uppercase">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1595425959155-db8f3e8ee9d1?w=1920&h=800&fit=crop"
            alt="Philosophy"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/85" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary text-[11px] tracking-[0.4em] uppercase">Our Philosophy</span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light leading-[1.2] tracking-tight mb-8">
            Purity over Projection,<br />
            <span className="text-gradient-gold">Authenticity over Enhancement</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed">
            Every Noor Scents fragrance is crafted using only the finest ingredients.
            No shortcuts. No compromises. Pure luxury, accessible to all.
          </p>
          <Link href="/about"
            className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-primary text-black text-[13px] uppercase tracking-[0.2em] hover:opacity-80 transition-all">
            Our Story
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Testimonials</span>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="text-3xl font-light tracking-tight">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Arjun Mehta",
                city: "Mumbai",
                text: "Absolutely love the quality! The oud attar lasts all day and gets so many compliments.",
                rating: 5,
              },
              {
                name: "Fatima Sheikh",
                city: "Lucknow",
                text: "Best attar I have tried in years. Pure, authentic and the packaging is beautiful.",
                rating: 5,
              },
              {
                name: "Rahul Verma",
                city: "Delhi",
                text: "Ordered the gift set for my wife — she absolutely loved it. Fast delivery too!",
                rating: 5,
              },
            ].map((r, i) => (
              <div key={i} className="bg-background border border-border p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground/70 font-light leading-relaxed mb-6 text-sm">
                  "{r.text}"
                </p>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-foreground/50">{r.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Stay Connected</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="text-3xl font-light tracking-tight mb-4">Join the Noor Circle</h2>
          <p className="text-foreground/60 font-light mb-10">
            Subscribe for exclusive offers, early access to new releases, and fragrance insights.
          </p>
          <form onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-background border border-border text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30"
            />
            <button type="submit" disabled={subLoading}
              className="px-8 py-4 bg-primary text-black text-[13px] uppercase tracking-[0.15em] hover:opacity-80 transition disabled:opacity-50">
              {subLoading ? "..." : "Subscribe"}
            </button>
          </form>
          {subMsg && (
            <p className={`mt-4 text-sm ${subMsg.includes("🎉") ? "text-green-600" : "text-red-500"}`}>
              {subMsg}
            </p>
          )}
          <p className="mt-6 text-[11px] text-foreground/40">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* WhatsApp */}
      <a
        href="https://wa.me/918303433075?text=Hi! I am interested in Noor Scents fragrances."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.054 23.448a.75.75 0 00.922.922l5.584-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.951-1.355l-.355-.212-3.312.876.876-3.312-.212-.355A9.695 9.695 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
        </svg>
      </a>

    </div>
  )
}