# Noor-scents
Full-stack luxury perfume e-commerce store built with Next.js 14, Supabase, and Tailwind CSS
# NOOR Scents — Premium Attar & Perfume E-commerce

A full-stack luxury fragrance e-commerce platform built for the Indian market.

## Live Demo
[noorscents.com](https://noorscents.com)

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel
- **Payments:** Cash on Delivery (COD)

## Features

### Customer
- Browse perfumes, ittars and gift sets
- Filter by category and gender
- Add to cart and checkout
- User authentication (signup/login)
- Order history
- Search products
- WhatsApp support integration

### Admin Panel
- Secure admin dashboard
- Add / edit / delete products
- Upload product images
- Manage category images
- Edit About page content
- View and manage orders

## Getting Started

### 1. Clone the repo
git clone https://github.com/yourusername/noor-scents.git
cd noor-scents

### 2. Install dependencies
npm install

### 3. Set up environment variables
Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

### 4. Run the development server
npm run dev

Open http://localhost:3000

## Project Structure

noor-scents/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin panel
│   ├── shop/             # Shop & product pages
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout with COD
│   ├── account/          # User profile & orders
│   └── api/              # API routes
├── components/           # Reusable UI components
│   ├── admin/            # Admin components
│   └── navbar.tsx        # Navigation
├── context/              # Cart context
└── lib/                  # Supabase client setup

## Database

Built on Supabase with the following tables:
- profiles — user roles and info
- products — product catalog
- orders + order_items — order management
- categories — category images
- about — about page content
- addresses — delivery addresses
- newsletter_subscribers

## Environment Variables

| Variable | Description |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anon/public key |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service role key (server only) |
| NEXT_PUBLIC_SITE_URL | Your site URL |

## License
MIT

---
Built with ❤️ for Noor Scents — Jajmau, Kanpur, India
