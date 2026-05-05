"use client"

import { useEffect, useState } from "react"

export default function Products() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          <h2>{p.name}</h2>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  )
}