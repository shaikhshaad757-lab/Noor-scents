"use client"

import Link from "next/link"
import { useState } from "react"
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

export function ProductCard({ product }: { product: Product }) {
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
              <span className="text-4xl text-foreground/10">✦</span>
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
      <div className="p-3">
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
