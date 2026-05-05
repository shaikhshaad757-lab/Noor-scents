"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

export function ProductDetailClient({
  product,
  related,
}: {
  product: any
  related: any[]
}) {
  const { addItem } = useCart()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const price = product.discount_price ?? product.price
  const discount = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : null

  // Helper function to check if an image URL is valid (safe against null/undefined)
  const isValidImage = (url: any) => typeof url === "string" && url.trim() !== ""

  const handleAddToCart = () => {
    // Safely check for the first image using our helper function
    const cartImage = isValidImage(product.images?.[0]) ? product.images[0] : ""
    
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: cartImage,
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    // Safely check for the first image using our helper function
    const cartImage = isValidImage(product.images?.[0]) ? product.images[0] : ""
    
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: cartImage,
      quantity,
    })
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-16">

      <div className="grid md:grid-cols-2 gap-10 mb-16">

        {/* Product Images */}
        <div className="space-y-3">
          <div className="aspect-square bg-card border border-border rounded-lg overflow-hidden">
            {isValidImage(product.images?.[selectedImage]) ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                <span className="text-6xl text-foreground/10">✦</span>
              </div>
            )}
          </div>

          {/* Image Thumbnails (Only show if there are multiple valid images) */}
          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img: string, i: number) => {
                if (!isValidImage(img)) return null; // Skip empty images
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 border rounded overflow-hidden transition-all ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt={`${product.name} - view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-light tracking-wide mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-light">₹{price}</span>
              {product.discount_price && (
                <>
                  <span className="text-base text-foreground/40 line-through">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {discount}% off
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              product.stock > 10
                ? "bg-green-500"
                : product.stock > 0
                ? "bg-amber-500"
                : "bg-red-500"
            }`} />
            <span className="text-xs text-foreground/60">
              {product.stock > 10
                ? "In Stock"
                : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-foreground/60 leading-relaxed border-t border-border pt-4">
              {product.description}
            </p>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <p className="text-xs uppercase tracking-widest text-foreground/50">
              Quantity
            </p>
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center hover:bg-card transition text-lg"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                disabled={product.stock === 0}
                className="w-9 h-9 flex items-center justify-center hover:bg-card transition text-lg disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full py-3.5 bg-primary text-black text-xs uppercase tracking-widest hover:opacity-80 transition disabled:opacity-30"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3.5 border text-xs uppercase tracking-widest transition ${
                added
                  ? "border-green-500 text-green-600"
                  : "border-border hover:border-primary hover:text-primary"
              } disabled:opacity-30`}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>

          {/* Features */}
          <div className="flex items-center gap-2 text-xs text-foreground/50 pt-2">
            <span>✓</span>
            <span>Cash on Delivery available</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-lg font-light tracking-widest uppercase mb-6 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => (
              <Link key={p.id} href={`/shop/${p.slug}`}
                className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 transition">
                <div className="aspect-square bg-card overflow-hidden">
                  {isValidImage(p.images?.[0]) ? (
                    <img src={p.images[0]} alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                      <span className="text-3xl text-foreground/10">✦</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-sm text-foreground/60 mt-0.5">
                    ₹{p.discount_price ?? p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}