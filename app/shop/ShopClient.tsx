"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { SlidersHorizontal, X } from "lucide-react"

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

const CATEGORY_FILTERS = [
  { id: "", label: "All" },
  { id: "perfume", label: "Perfumes" },
  { id: "ittar", label: "Ittar" },
  { id: "gift", label: "Gift Sets" },
]

const GENDER_FILTERS = [
  { id: "", label: "All" },
  { id: "men", label: "For Men" },
  { id: "women", label: "For Women" },
  { id: "unisex", label: "Unisex" },
]

export function ShopClient({
  products,
  activeCategory,
  activeGender,
}: {
  products: Product[]
  activeCategory: string
  activeGender: string
}) {
  const [sort, setSort] = useState("newest")
  const [selCategory, setSelCategory] = useState(activeCategory)
  const [selGender, setSelGender] = useState(activeGender)
  const [priceRange, setPriceRange] = useState(10000)
  const [addedId, setAddedId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { addItem } = useCart()

  const filtered = products
    .filter(p => !selCategory || p.category === selCategory)
    .filter(p => !selGender || p.gender === selGender)
    .filter(p => (p.discount_price ?? p.price) <= priceRange)
    .sort((a, b) => {
      const pa = a.discount_price ?? a.price
      const pb = b.discount_price ?? b.price
      if (sort === "low") return pa - pb
      if (sort === "high") return pb - pa
      return 0
    })

  const handleAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discount_price ?? product.price,
      image: product.images?.[0] ?? "",
      quantity: 1,
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const Sidebar = () => (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Category</p>
        <ul className="space-y-1">
          {CATEGORY_FILTERS.map(f => (
            <li key={f.id}>
              <button
                onClick={() => { setSelCategory(f.id); setSidebarOpen(false) }}
                className={`text-sm w-full text-left py-1.5 transition-colors ${
                  selCategory === f.id ? "text-primary font-medium" : "text-foreground/60 hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Gender</p>
        <ul className="space-y-1">
          {GENDER_FILTERS.map(f => (
            <li key={f.id}>
              <button
                onClick={() => { setSelGender(f.id); setSidebarOpen(false) }}
                className={`text-sm w-full text-left py-1.5 transition-colors ${
                  selGender === f.id ? "text-primary font-medium" : "text-foreground/60 hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">
          Max Price: ₹{priceRange.toLocaleString("en-IN")}
        </p>
        <input
          type="range" min={100} max={10000} step={100}
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-foreground/40 mt-1">
          <span>₹100</span><span>₹10,000</span>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Sort By</p>
        <div className="space-y-1">
          {[
            { value: "newest", label: "Newest First" },
            { value: "low", label: "Price: Low to High" },
            { value: "high", label: "Price: High to Low" },
          ].map(opt => (
            <button key={opt.value} onClick={() => setSort(opt.value)}
              className={`text-sm w-full text-left py-1.5 transition-colors ${
                sort === opt.value ? "text-primary font-medium" : "text-foreground/60 hover:text-primary"
              }`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setSelCategory(""); setSelGender(""); setPriceRange(10000) }}
        className="text-xs text-red-500 hover:underline uppercase tracking-widest"
      >
        Clear All Filters
      </button>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto pb-16">

      <div className="text-center mb-10">
        <h1 className="text-3xl font-light tracking-[0.3em] uppercase mb-2">Our Collection</h1>
        <p className="text-sm text-foreground/50">{filtered.length} products</p>
      </div>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {[
          { label: "All", cat: "", gen: "" },
          { label: "Perfumes", cat: "perfume", gen: "" },
          { label: "Ittar", cat: "ittar", gen: "" },
          { label: "Gift Sets", cat: "gift", gen: "" },
          { label: "For Men", cat: "", gen: "men" },
          { label: "For Women", cat: "", gen: "women" },
        ].map(f => {
          const isActive = selCategory === f.cat && selGender === f.gen
          return (
            <button key={f.label}
              onClick={() => { setSelCategory(f.cat); setSelGender(f.gen) }}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-widest border transition-all ${
                isActive
                  ? "bg-primary text-black border-primary"
                  : "border-border text-foreground/60 hover:border-primary hover:text-primary"
              }`}>
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="lg:hidden mb-4">
        <button onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-border text-sm hover:border-primary transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          More Filters & Sort
        </button>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-72 bg-card border-r border-border p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm uppercase tracking-widest">Filters</p>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block lg:w-56 shrink-0">
          <div className="sticky top-24"><Sidebar /></div>
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/30 text-4xl mb-4">✦</p>
              <p className="text-sm text-foreground/40 mb-2">No products found</p>
              <button
                onClick={() => { setSelCategory(""); setSelGender(""); setPriceRange(10000) }}
                className="text-xs text-primary hover:underline uppercase tracking-widest">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(product => (
                <div key={product.id}
                  className="group border border-border hover:border-primary/50 transition-all duration-300 bg-card">
                  <Link href={`/shop/${product.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-foreground/10">✦</span>
                        </div>
                      )}
                      {product.discount_price && (
                        <span className="absolute top-2 left-2 bg-primary text-black text-[10px] px-2 py-0.5 uppercase tracking-wider">
                          Sale
                        </span>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <span className="text-xs uppercase tracking-widest text-foreground/60">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-primary/70">{product.category}</span>
                      <span className="text-[10px] text-foreground/30">·</span>
                      <span className="text-[10px] uppercase tracking-widest text-foreground/40">{product.gender}</span>
                    </div>
                    <Link href={`/shop/${product.slug}`}>
                      <p className="text-sm font-light truncate hover:text-primary transition-colors mb-2">
                        {product.name}
                      </p>
                    </Link>
                    <div className="flex items-center gap-2 mb-2">
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
                      onClick={() => handleAdd(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-2 text-[11px] uppercase tracking-widest border transition-all duration-300 ${
                        addedId === product.id
                          ? "bg-primary text-black border-primary"
                          : "border-border hover:border-primary hover:text-primary"
                      } disabled:opacity-30`}>
                      {addedId === product.id ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}