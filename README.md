# Cipruli.store

ქართული ციფრული ბაზარი — AI პრომპტები, შაბლონები, ელ. წიგნები, გრაფიკა, კოდი, აუდიო-ვიდეო.

> **v1 — admin-managed catalog.** No public signup. You (the admin) manage the catalog through `/admin`; visitors browse, read, and download free prompts. Paid items route buyers to an off-site contact (added in a later iteration).

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4**
- **React Three Fiber + drei + postprocessing** (3D hero, product covers)
- **`motion`** for UI motion
- **Supabase** (Auth magic-link for admin + Postgres + RLS)
- **Noto Sans Georgian** + **Space Grotesk**

## Local setup

Requires **Node 20.9+** (Next.js 16 requirement).

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
# http://localhost:3000
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_…`) |
| `NEXT_PUBLIC_SITE_URL` | Site base URL |
| `ADMIN_EMAIL` | **Server-only.** The single email permitted to access `/admin`. Must match the email hard-coded in the RLS policies and the seeded `auth.users` row. |

## Admin access

1. Go to `/admin/login`.
2. Enter your `ADMIN_EMAIL`.
3. Click "send login link" → open the email Supabase sends → click the link.
4. You're in. Create, edit, delete products from the dashboard.

### Why this shape

- No public signup at all — Supabase `disable_signup: true` (set via Management API on first deploy).
- A single admin row exists in `auth.users` (seeded by migration).
- RLS on `products`: read = public; insert/update/delete = only if `auth.jwt() ->> 'email' = '<admin email>'`.

### Changing the admin email

Three places must be updated together:

1. `ADMIN_EMAIL` env var (server + Vercel).
2. The RLS policies on `public.products` (rename the hard-coded email).
3. The row in `auth.users` (update via Supabase dashboard → Authentication → Users).

## Routes

| Path | Kind | Notes |
| --- | --- | --- |
| `/` | public | landing (3D hero + bento + categories + CTA) |
| `/catalog` | public | browse all, filter by category/type/price, search |
| `/products/[slug]` | public | product detail with 3D cover |
| `/admin/login` | gated | magic-link form |
| `/admin/callback` | gated | OAuth/OTP code exchange |
| `/admin` | admin | dashboard + product list + actions |
| `/admin/products/new` | admin | create form |
| `/admin/products/[id]/edit` | admin | edit form |

## Project layout

```
src/
├── app/
│   ├── page.tsx                 # landing
│   ├── catalog/page.tsx         # browse + filters
│   ├── products/[slug]/page.tsx # product detail
│   ├── admin/                   # gated admin panel
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── callback/
│   │   ├── actions.ts           # createProduct, updateProduct, deleteProduct, login, logout
│   │   ├── page.tsx             # dashboard
│   │   ├── products/
│   │   │   ├── new/page.tsx
│   │   │   ├── [id]/edit/page.tsx
│   │   │   └── ProductForm.tsx  # shared create/edit
│   │   ├── DeleteButton.tsx
│   │   └── LogoutButton.tsx
│   ├── globals.css              # design tokens, utilities, buttons
│   └── layout.tsx               # root layout, fonts, nav, footer
├── components/
│   ├── landing/                 # Hero, CategoriesStrip, FeaturedBento, HowItWorks, CTA
│   ├── catalog/                 # ProductCard, FilterBar
│   ├── navigation/              # TopNav, Footer
│   └── three/                   # HeroScene, ProductCover3D (+ dynamic loaders)
├── lib/
│   ├── admin/guard.ts           # requireAdmin()
│   ├── supabase/                # client / server / proxy helpers
│   ├── types.ts                 # Product, Category, Profile
│   └── utils.ts                 # cn, slugify, formatGEL, formatDateKa
└── proxy.ts                     # Next.js 16 session-refresh (middleware replacement)
```

## Design notes

- Palette: near-black base (`#08080c`), iridescent violet→cyan gradient, warm gold accents, rose highlight.
- Noise overlay, mesh gradient backdrops, blurred orbs.
- 3D hero: procedural geometry with `MeshTransmissionMaterial`, bloom, chromatic aberration, vignette — no asset files.
- Product covers: rotating rounded-box + physical-material torus, colored per seed.

## Deployment

1. Deploy to **Vercel** — add the four env vars in project settings.
2. Update `NEXT_PUBLIC_SITE_URL` to your production domain.
3. In Supabase → Authentication → URL Configuration: add the production URL to `uri_allow_list` (Site URL + redirect wildcards).

No GitHub OAuth App needed for v1.
