import { ProductForm } from "@/components/admin/products-form"
import Link from "next/link"

export default function NewProductPage() {
  return (
    <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light tracking-widest uppercase">Add New Product</h1>
        <Link href="/admin/products"
          className="text-xs text-foreground/50 hover:text-primary transition uppercase tracking-widest">
          ← Back
        </Link>
      </div>
      <ProductForm />
    </div>
  )
}