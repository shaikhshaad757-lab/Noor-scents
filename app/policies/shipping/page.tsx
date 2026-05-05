import type { Metadata } from "next"

export const metadata: Metadata = { title: "Shipping Policy" }

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">Shipping Policy</h1>
        <p className="text-foreground/50 text-sm mb-10">Last updated: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Delivery Timeframe</h2>
            <p>All orders are processed within 1-2 business days. Delivery typically takes 3-5 business days across India. Metro cities may receive orders faster (2-3 days).</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Shipping Charges</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-card">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Order Value</th>
                    <th className="text-left px-4 py-3 font-medium">Shipping Charge</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Below ₹1000</td>
                    <td className="px-4 py-3">₹60</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Above ₹1000</td>
                    <td className="px-4 py-3 text-primary">FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Order Tracking</h2>
            <p>Once your order is shipped, you will receive a tracking number via the contact details provided at checkout. You can use this to track your order in real time.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Delivery Areas</h2>
            <p>We currently deliver to all states and union territories across India. International shipping is not available at this time but will be introduced soon.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Cash on Delivery</h2>
            <p>COD is available for all orders across India. Please keep the exact amount ready at the time of delivery.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Contact Us</h2>
            <p>For shipping queries, contact us at <a href="mailto:hello@noorscents.com" className="text-primary hover:underline">hello@noorscents.com</a> or WhatsApp us at +91 98765 43210.</p>
          </section>
        </div>
      </div>
    </div>
  )
}