"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { ShoppingBag, Menu, X, Search, LogOut, LayoutDashboard } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" })
      const data = await res.json()
      if (!data.error) setUser(data)
      else setUser(null)
    } catch {
      setUser(null)
    }
  }, [])

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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
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
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled ? "glass border-b border-border/50 py-3" : "bg-transparent py-5"
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Nav Left */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.slice(0, 2).map(link => (
                <Link key={link.label} href={link.href}
                  className="text-[13px] uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors duration-300 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <span className="text-2xl sm:text-3xl font-light tracking-[0.4em] text-gradient-gold">
                NOOR
              </span>
            </Link>

            {/* Desktop Nav Right */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.slice(2).map(link => (
                <Link key={link.label} href={link.href}
                  className="text-[13px] uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors duration-300 relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2">

              {/* Auth Section */}
              {!user ? (
                <>
                  <Link href="/signup">
                    <button className="hidden sm:flex px-3 py-1 border border-primary text-primary text-xs uppercase tracking-wider hover:bg-primary hover:text-black transition">
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="hidden sm:flex px-3 py-1 bg-primary text-black text-xs uppercase tracking-wider hover:opacity-80 transition">
                      Login
                    </button>
                  </Link>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">

                  {/* Admin Button — sirf admin ko dikhega */}
                  {user.role === "admin" && (
                    <Link href="/admin">
                      <button
                        className="flex items-center gap-1.5 px-3 py-1 bg-primary text-black text-xs uppercase tracking-wider hover:opacity-80 transition"
                        title="Admin Panel"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Admin
                      </button>
                    </Link>
                  )}

                  {/* Avatar */}
                  <Link href="/account">
                    <div
                      className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition"
                      title="My Account"
                    >
                      <span className="text-[11px] font-medium text-primary uppercase">
                        {user.name?.charAt(0) || user.email?.charAt(0)}
                      </span>
                    </div>
                  </Link>

                  {/* Name */}
                  <span className="text-xs text-foreground/60 max-w-[80px] truncate">
                    {user.name?.split(" ")[0]}
                  </span>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-foreground/50 hover:text-red-500 transition"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-1">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search fragrances..."
                    className="bg-transparent border-b border-primary text-sm px-2 py-1 w-36 focus:outline-none placeholder:text-foreground/30"
                  />
                  <button type="submit" className="p-1.5 text-primary hover:opacity-70 transition">
                    <Search className="w-4 h-4" />
                  </button>
                  <button type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery("") }}
                    className="p-1.5 text-foreground/40 hover:text-foreground transition">
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden sm:flex p-2 text-foreground/70 hover:text-primary transition-colors duration-300"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}

              {/* Cart */}
              <Link href="/cart"
                className="relative p-2 text-foreground/70 hover:text-primary transition-colors duration-300">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-primary text-black text-[10px] font-medium flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden transition-opacity duration-500",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)} />

        <div className={cn(
          "absolute top-0 left-0 h-full w-full max-w-sm bg-card border-r border-border transition-transform duration-500 ease-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">

            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-xl tracking-[0.3em] text-primary">NOOR</span>
              <button onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-foreground/70 hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="px-6 py-4 border-b border-border">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search fragrances..."
                  className="flex-1 bg-transparent border-b border-border text-sm px-1 py-1.5 focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/30"
                />
                <button type="submit"
                  className="p-1.5 text-foreground/60 hover:text-primary transition">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Mobile User Info */}
            {user && (
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary uppercase">
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-foreground/50">{user.email}</p>
                  </div>
                </div>

                {/* Mobile Admin Button */}
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-3 flex items-center gap-2 px-4 py-2 bg-primary text-black text-xs uppercase tracking-widest hover:opacity-80 transition w-full justify-center"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Go to Admin Panel
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Nav Links */}
            <nav className="flex-1 p-6 overflow-y-auto">
              <ul className="space-y-1">
                {mobileLinks.map((link, index) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base tracking-wider text-foreground/80 hover:text-primary hover:pl-2 transition-all duration-300 border-b border-border/50"
                      style={{ transitionDelay: `${index * 30}ms` }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-border">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <div className="flex items-center gap-6">
                  <Link href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-foreground/60 hover:text-primary transition">
                    Login
                  </Link>
                  <Link href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-foreground/60 hover:text-primary transition">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}