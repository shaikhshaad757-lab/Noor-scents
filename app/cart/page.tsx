"use client"

import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  const shipping = totalPrice >= 500 ? 0 : 60
  const total = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <div className="w-24 h-24 bg-secondary border border-border flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-light mb-4">Your Bag is Empty</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            You haven't added any fragrances yet. Let's fix that!
          </p>
          <Link href="/shop"
            className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-black text-[13px] uppercase tracking-[0.2em] hover:opacity-80 transition-all duration-300">
            Explore Collection
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span>Shopping Bag</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <h1 className="text-4xl font-light tracking-tight">Shopping Bag</h1>
          <p className="text-muted-foreground text-sm">
            {items.length} item{items.length !== 1 ? "s" : ""} in your bag
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border text-[11px] text-muted-foreground tracking-[0.15em] uppercase">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-border">
              {items.map((item) => (
                <div key={item.id}
                  className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">

                  {/* Product Info */}
                  <div className="sm:col-span-6 flex gap-4">
                    <div className="w-20 h-24 flex-shrink-0 bg-secondary overflow-hidden rounded">
                      {item.image ? (
                        <img src={item.image} alt={item.name}
                          className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl text-foreground/10">✦</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-base font-light">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 mt-3 text-[11px] text-muted-foreground hover:text-red-500 tracking-wider uppercase transition-colors">
                        <X className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-2 flex justify-start sm:justify-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <div className="w-10 h-9 flex items-center justify-center border-y border-border text-sm">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 hidden sm:block text-right text-muted-foreground text-sm">
                    ₹{item.price.toLocaleString("en-IN")}
                  </div>

                  {/* Total */}
                  <div className="sm:col-span-2 text-right">
                    <span className="text-base font-light">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link href="/shop"
                className="group inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary tracking-wider uppercase transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border sticky top-28">
              <div className="p-6">
                <h2 className="text-[11px] tracking-[0.2em] uppercase mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 pb-4 border-b border-border">
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
                  <span className="text-base font-light">Total</span>
                  <span className="text-lg text-primary font-light">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link href="/checkout"
                  className="block w-full py-3.5 bg-primary text-black text-[13px] uppercase tracking-[0.15em] text-center hover:opacity-80 transition-colors">
                  Proceed to Checkout
                </Link>
              </div>

              <div className="px-6 py-4 bg-secondary/50 border-t border-border space-y-2">
                {[
                  { icon: Truck, text: "Free shipping on orders above ₹500" },
                  { icon: Shield, text: "100% authentic products" },
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