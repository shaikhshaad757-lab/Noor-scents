import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-light text-primary/20 mb-4">404</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-[11px] tracking-[0.3em] uppercase">
            Page Not Found
          </span>
          <div className="w-8 h-px bg-primary" />
        </div>
        <h1 className="text-2xl font-light mb-4">
          This page doesn't exist
        </h1>
        <p className="text-sm text-foreground/50 mb-8">
          The page you're looking for may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="px-8 py-3 bg-primary text-black text-xs uppercase tracking-widest hover:opacity-80 transition">
            Go Home
          </Link>
          <Link href="/shop"
            className="px-8 py-3 border border-border text-xs uppercase tracking-widest hover:border-primary transition">
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  )
}