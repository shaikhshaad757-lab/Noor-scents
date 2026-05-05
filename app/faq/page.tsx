"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Orders are delivered within 3-5 business days across India. Metro cities may receive orders in 2-3 days. You'll receive a tracking link once your order is shipped.",
  },
  {
    q: "What are the delivery charges?",
    a: "We charge ₹60 for orders below ₹1000. Orders above ₹1000 get FREE delivery anywhere in India.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Yes! We offer Cash on Delivery (COD) across India. You pay only when your order arrives at your doorstep.",
  },
  {
    q: "Are your products 100% authentic?",
    a: "Absolutely. All NOOR products are 100% authentic and made from the finest natural ingredients. We never use synthetic substitutes.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 7 days of delivery if the product is unused and in original packaging. Please contact us at hello@noorscents.com to initiate a return.",
  },
  {
    q: "Are your attars alcohol-free?",
    a: "Yes! All our attars are 100% alcohol-free, made with pure carrier oils. They are safe for all skin types and suitable for people who prefer alcohol-free fragrances.",
  },
  {
    q: "How long do your fragrances last?",
    a: "Our attars typically last 6-8 hours on skin. Our perfumes last 4-6 hours. Longevity varies by skin type and application area.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order is shipped, you'll receive a tracking link via the contact details provided at checkout.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we only ship within India. International shipping will be available soon. Stay tuned!",
  },
  {
    q: "How do I apply attar correctly?",
    a: "Apply attar on pulse points — wrists, neck, behind ears. Do not rub after applying. A small amount goes a long way. Store in a cool, dry place away from sunlight.",
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Help Center</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h1 className="text-4xl font-light tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-foreground/60">
            Everything you need to know about NOOR fragrances and orders.
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-card transition-colors"
              >
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 text-primary transition-transform duration-300 ${
                  open === i ? "rotate-180" : ""
                }`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 border-t border-border">
                  <p className="text-sm text-foreground/60 leading-relaxed pt-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 border border-border rounded-lg">
          <p className="text-sm text-foreground/60 mb-4">
            Still have questions? We're happy to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:hello@noorscents.com"
              className="px-6 py-3 border border-border text-sm hover:border-primary transition-colors">
              Email Us
            </a>
            <a href="https://wa.me/919876543210"
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white text-sm hover:bg-green-600 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}