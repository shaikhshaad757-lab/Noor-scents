"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Get in Touch</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h1 className="text-4xl font-light tracking-tight mb-4">Contact Us</h1>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Have a question about our fragrances? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-[11px] uppercase tracking-widest text-foreground/50 mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone / WhatsApp", value: "+91 83034 33075", href: "tel:+918303433075" },
                  { icon: Mail, label: "Email", value: "noorscents123.android@gmail.com", href: "mailto:noorscents123.android@gmail.com" },
                  { icon: MapPin, label: "Address", value: "Jajmau, Kanpur, Uttar Pradesh, India", href: null },
                  { icon: Clock, label: "Business Hours", value: "Mon–Sat: 10am – 7pm IST", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-foreground/50 mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm hover:text-primary transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a href="https://wa.me/918303433075?text=Hi! I have a question about Noor Scents fragrances."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 hover:border-green-500 text-green-600 transition-colors rounded-lg">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.054 23.448a.75.75 0 00.922.922l5.584-1.478A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.951-1.355l-.355-.212-3.312.876.876-3.312-.212-.355A9.695 9.695 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              <div>
                <p className="text-sm font-medium">Chat on WhatsApp</p>
                <p className="text-xs opacity-70">Usually replies within minutes</p>
              </div>
            </a>
          </div>

          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-foreground/50 mb-6">
              Send a Message
            </h2>
            {sent ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                <p className="text-lg font-light mb-2">Message Sent! ✓</p>
                <p className="text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-foreground/50 mb-2">Name *</label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-foreground/50 mb-2">Email *</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/50 mb-2">Subject *</label>
                  <select value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm focus:outline-none focus:border-primary transition-colors">
                    <option value="">Select a topic</option>
                    <option>Order Enquiry</option>
                    <option>Product Question</option>
                    <option>Shipping Issue</option>
                    <option>Return / Refund</option>
                    <option>Wholesale Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/50 mb-2">Message *</label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="How can we help you?" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-primary text-black text-[13px] uppercase tracking-widest hover:opacity-80 transition disabled:opacity-50">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}