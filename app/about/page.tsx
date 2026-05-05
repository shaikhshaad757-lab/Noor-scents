import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Noor Scents — our story, philosophy and commitment to authentic fragrances.",
}

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: about } = await supabase.from("about").select("*").single()

  const title = about?.title ?? "About Noor Scents"
  const description = about?.description ?? "Blending ancient oriental perfumery with modern Indian identity. We believe in purity over projection, authenticity over enhancement."
  const image = about?.image ?? "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=600&fit=crop"

  return (
    <div className="min-h-screen pt-24 pb-16">

      {/* Hero */}
      <section className="relative py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Our Story</span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-foreground/60 font-light leading-relaxed max-w-2xl mx-auto">
            Blending ancient oriental perfumery with modern Indian identity.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={image}
                alt={title}
                className="w-full aspect-[4/3] object-cover border border-border"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="text-primary text-[11px] tracking-[0.3em] uppercase">Our Heritage</span>
              </div>
              <h2 className="text-3xl font-light mb-6">
                Over 50 Years of Fragrance Legacy
              </h2>
              <div className="text-foreground/60 font-light leading-relaxed whitespace-pre-line">
                {description || "Noor Scents was born from a deep passion for authentic Indian perfumery. Based in Jajmau, Kanpur — the perfume capital of India — our journey began with a simple belief: the finest fragrances should be accessible to everyone."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-tight">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Purity", desc: "Only the finest natural ingredients. No synthetic shortcuts.", icon: "🌿" },
              { title: "Authenticity", desc: "Traditional methods passed down through generations.", icon: "✦" },
              { title: "Accessibility", desc: "Luxury fragrances for every Indian home.", icon: "🏠" },
            ].map(v => (
              <div key={v.title}
                className="text-center p-8 border border-border hover:border-primary transition-colors">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-light tracking-wider uppercase mb-3">{v.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-light mb-4">Ready to Find Your Scent?</h2>
          <p className="text-foreground/60 mb-8">
            Explore our collection of pure attars and luxury perfumes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-primary text-black text-[13px] uppercase tracking-[0.2em] hover:opacity-80 transition">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border text-[13px] uppercase tracking-[0.2em] hover:border-primary transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}