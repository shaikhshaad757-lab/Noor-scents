import type { Metadata } from "next"

export const metadata: Metadata = { title: "Refund Policy" }

export default function RefundPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">Refund & Return Policy</h1>
        <p className="text-foreground/50 text-sm mb-10">Last updated: January 2026</p>

        <div className="space-y-8 text-foreground/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Return Window</h2>
            <p>We accept returns within 7 days of delivery. Items must be unused, unopened, and in their original packaging.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Non-Returnable Items</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Opened or used fragrances</li>
              <li>Items damaged due to misuse</li>
              <li>Gift sets that have been opened</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">How to Initiate a Return</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Email us at hello@noorscents.com with your order ID and reason for return</li>
              <li>We will review your request within 24 hours</li>
              <li>Once approved, ship the item back to us</li>
              <li>Refund will be processed within 5-7 business days of receiving the item</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Refund Method</h2>
            <p>Refunds are processed to the original payment method. For COD orders, refunds are issued via bank transfer or UPI.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Damaged or Wrong Items</h2>
            <p>If you received a damaged or incorrect item, please contact us within 48 hours of delivery with photos. We will arrange a replacement or full refund at no extra cost.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Contact</h2>
            <p>Email: <a href="mailto:hello@noorscents.com" className="text-primary hover:underline">hello@noorscents.com</a></p>
            <p>WhatsApp: +91 98765 43210</p>
          </section>
        </div>
      </div>
    </div>
  )
}