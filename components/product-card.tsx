"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Eye, Star } from "lucide-react"
import { type Perfume } from "@/lib/data"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

interface ProductCardProps {
  product: Perfume
  variant?: "default" | "featured"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addItem } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      size: product.sizes[product.sizes.length - 1].size,
    })
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {/* Main Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Secondary Image on Hover */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.bestseller && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.15em] font-medium">
              <Star className="w-3 h-3 fill-current" />
              Bestseller
            </div>
          )}
          {product.featured && !product.bestseller && (
            <div className="px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-[0.15em] font-medium">
              New
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
              isAdding 
                ? "bg-primary text-primary-foreground" 
                : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {isAdding ? "Added" : "Add to Bag"}
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className="w-12 flex items-center justify-center bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-300"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-5 space-y-2">
        <p className="text-[11px] text-primary tracking-[0.2em] uppercase">
          {product.brand}
        </p>
        <h3 className="text-lg font-light tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-[13px] text-muted-foreground line-clamp-1 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-baseline gap-3 pt-1">
          <span className="text-lg text-foreground font-light">
            ${product.price}
          </span>
          <span className="text-[11px] text-muted-foreground tracking-wider">
            From ${product.sizes[0].price}
          </span>
        </div>
      </div>
    </Link>
  )
}
