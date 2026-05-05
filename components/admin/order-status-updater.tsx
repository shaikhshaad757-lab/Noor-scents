"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

const STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-600 border-amber-300",
  confirmed: "text-blue-600 border-blue-300",
  shipped: "text-purple-600 border-purple-300",
  delivered: "text-green-600 border-green-300",
  cancelled: "text-red-600 border-red-300",
}

export function OrderStatusUpdater({
  orderId,
  currentStatus
}: {
  orderId: string
  currentStatus: string
}) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = async (newStatus: string) => {
    setLoading(true)
    const supabase = createClient()
    await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId)
    setStatus(newStatus)
    setLoading(false)
    router.refresh()
  }

  return (
    <select
      value={status}
      onChange={e => handleChange(e.target.value)}
      disabled={loading}
      className={`text-xs px-3 py-1.5 border rounded capitalize bg-transparent focus:outline-none ${STATUS_COLORS[status] ?? ""}`}
    >
      {STATUSES.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}