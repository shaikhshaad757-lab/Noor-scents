import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/context/cart-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
})

export const metadata: Metadata = {
  title: {
    default: "Noor Scents – Premium Attar & Perfume Collection",
    template: "%s | Noor Scents"
  },
  description: "Noor Scents offers premium attars, perfumes and gift sets for men and women. Long-lasting fragrances with elegant packaging. Based in Kanpur, India.",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${cormorant.variable} font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}