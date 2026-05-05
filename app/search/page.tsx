"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useCart } from "@/context/cart-context"

function SearchResults() {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") ?? ""
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { addItem } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    if (!q) return
    const search = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .or(`name.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`)
      setProducts(data ?? [])
      setLoading(false)
    }
    search()
  }, [q])

  const handleAdd = (product: any) => {
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

  return (
    <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-16">
      <h1 className="text-2xl font-light tracking-widest uppercase mb-2">Search</h1>
      {q && (
        <p className="text-sm text-foreground/50 mb-8">
          {loading ? "Searching..." : `${products.length} results for "${q}"`}
        </p>
      )}
      {!q && (
        <p className="text-sm text-foreground/40 mt-8 text-center">
          Type something in the search bar above
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="group border border-border hover:border-primary/50 transition bg-card">
            <Link href={`/shop/${product.slug}`}>
              <div className="aspect-square overflow-hidden bg-secondary">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-foreground/10 text-4xl">✦</span>
                  </div>
                )}
              </div>
            </Link>
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-1">{product.category}</p>
              <Link href={`/shop/${product.slug}`}>
                <p className="text-sm font-light truncate hover:text-primary transition mb-1">{product.name}</p>
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">₹{(product.discount_price ?? product.price).toLocaleString("en-IN")}</span>
                {product.discount_price && (
                  <span className="text-xs text-foreground/30 line-through">₹{product.price.toLocaleString("en-IN")}</span>
                )}
              </div>
              <button onClick={() => handleAdd(product)} disabled={product.stock === 0}
                className={`w-full py-1.5 text-[11px] uppercase tracking-widest border transition ${
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
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  )
}