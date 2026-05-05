import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OrderStatusUpdater } from "@/components/admin/order-status-updater"
export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const adminClient = createAdminClient()
  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") redirect("/")

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      profiles (name, email),
      addresses (name, phone, line1, city, state, pincode),
      order_items (*, products (name))
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-12">
      <h1 className="text-2xl font-light tracking-widest uppercase mb-8">
        Orders
      </h1>

      <div className="space-y-4">
        {orders?.length === 0 && (
          <p className="text-center text-sm text-foreground/40 py-12">
            Abhi koi order nahi
          </p>
        )}
        {orders?.map(order => (
          <div key={order.id}
            className="border border-border rounded-lg p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-mono text-foreground/40">
                  #{order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-sm font-medium mt-1">
                  {order.profiles?.name ?? "Unknown"}
                </p>
                <p className="text-xs text-foreground/50">
                  {order.profiles?.email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-light">₹{order.total}</p>
                <p className="text-xs text-foreground/50">COD</p>
              </div>
            </div>

            {order.addresses && (
              <div className="text-xs text-foreground/60 bg-card border border-border rounded px-3 py-2">
                📍 {order.addresses.line1}, {order.addresses.city},
                {order.addresses.state} — {order.addresses.pincode}
                · 📞 {order.addresses.phone}
              </div>
            )}

            <div className="text-xs text-foreground/60 space-y-1">
              {order.order_items?.map((item: any) => (
                <p key={item.id}>
                  {item.product_name} × {item.quantity} — ₹{item.price * item.quantity}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-xs text-foreground/40">
                {new Date(order.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </p>
              <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}