"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { ShoppingBag, Menu, X, Search, LogOut, LayoutDashboard } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client" // ✅ ADD

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  const supabase = createClient() // ✅ ADD

  // ✅ FIX (API removed but SAME LOGIC)
  const fetchUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, email, role")
          .eq("id", user.id)
          .single()

        setUser(profile)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }, [supabase])

  useEffect(() => { fetchUser() }, [pathname, fetchUser])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  // ✅ FIX (logout without API)
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { href: "/shop", label: "Shop All" },
    { href: "/shop?category=perfume", label: "For Him" },
    { href: "/shop?category=perfume", label: "For Her" },
    { href: "/shop?category=gift", label: "Gift Sets" },
  ]

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop All" },
    { href: "/shop?category=perfume", label: "Perfumes" },
    { href: "/shop?category=ittar", label: "Ittar" },
    { href: "/shop?category=gift", label: "Gift Sets" },
    { href: "/account", label: "My Account" },
    { href: "/cart", label: "Cart" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      {/* SAME UI — unchanged */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled ? "glass border-b border-border/50 py-3" : "bg-transparent py-5"
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.slice(0, 2).map(link => (
                <Link key={link.label} href={link.href}>{link.label}</Link>
              ))}
            </div>

            <Link href="/">
              <span className="text-2xl font-light tracking-[0.4em] text-gradient-gold">
                NOOR
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.slice(2).map(link => (
                <Link key={link.label} href={link.href}>{link.label}</Link>
              ))}
            </div>

            <div className="flex items-center gap-2">

              {!user ? (
                <>
                  <Link href="/signup">Sign Up</Link>
                  <Link href="/login">Login</Link>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">

                  {user.role === "admin" && (
                    <Link href="/admin">
                      <button>Admin</button>
                    </Link>
                  )}

                  <Link href="/account">
                    <span>{user.name?.charAt(0)}</span>
                  </Link>

                  <button onClick={handleLogout}>
                    <LogOut />
                  </button>
                </div>
              )}

              <Link href="/cart">
                <ShoppingBag />
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>

            </div>
          </div>
        </nav>
      </header>
    </>
  )
}