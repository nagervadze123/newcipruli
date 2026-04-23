# Cipruli.store

ქართული ციფრული ბაზარი — AI პრომპტები, შაბლონები, ელ. წიგნები, გრაფიკა, კოდი, აუდიო-ვიდეო.

> MVP: catalog-only. Browse, sell, list. No on-site payments yet — free items are instant reveal, paid items route to "contact seller" via the author's profile.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4**
- **React Three Fiber + drei + postprocessing** (3D hero, product covers)
- **Framer Motion (`motion`)**
- **Supabase** (Auth + Postgres + Storage + RLS)
- **Noto Sans Georgian** + **Space Grotesk** (fonts)

## Local setup

Requires **Node 20.9+** (Next.js 16 requirement).

```bash
# 1. install deps
npm install

# 2. copy env template and fill in real values
cp .env.example .env.local
# edit .env.local

# 3. run
npm run dev
# open http://localhost:3000
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (`https://<ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (starts with `sb_publishable_…`) |
| `NEXT_PUBLIC_SITE_URL` | Site base URL (`http://localhost:3000` locally) |

## Supabase — one-time configuration

### 1. Schema

Applied via the Supabase MCP. Tables:

- `profiles` (1:1 with `auth.users`, auto-created via trigger)
- `categories` (seeded: AI Prompts, Templates, E-Books, Graphics, Code, Audio, Video, Notion Templates)
- `products` (seller-owned, category-linked, `type = prompt | file`)

RLS is enabled on all three. Read = public, write = owner.

### 2. Enable GitHub OAuth (required for login)

1. Create a **GitHub OAuth App** at <https://github.com/settings/developers>.
   - **Homepage URL:** `http://localhost:3000` (and your prod URL later).
   - **Authorization callback URL:** `https://<your-project-ref>.supabase.co/auth/v1/callback`
2. Copy the **Client ID** and **Client Secret**.
3. In Supabase Dashboard → **Authentication → Providers → GitHub**:
   - Paste Client ID + Client Secret.
   - Enable the provider.
4. In Supabase Dashboard → **Authentication → URL Configuration**:
   - **Site URL:** `http://localhost:3000` (or your prod URL).
   - **Redirect URLs:** add `http://localhost:3000/**` and the prod equivalent.

After this, the GitHub button on `/auth/login` works end-to-end.

## Project layout

```
src/
├── app/
│   ├── page.tsx                 # landing (3D hero + bento + how-it-works + CTA)
│   ├── catalog/                 # catalog browse + filters
│   ├── products/[slug]/         # product detail
│   ├── sell/                    # seller dashboard
│   │   └── new/                 # new product form
│   ├── auth/
│   │   ├── login/               # GitHub sign-in
│   │   └── callback/            # OAuth callback (exchanges code for session)
│   ├── profile/[username]/      # public seller profile
│   ├── actions/                 # server actions (createProduct)
│   ├── globals.css              # design tokens, utilities, buttons
│   └── layout.tsx               # root layout, fonts, nav, footer
├── components/
│   ├── landing/                 # Hero, CategoriesStrip, FeaturedBento, HowItWorks, CTA
│   ├── catalog/                 # ProductCard, FilterBar
│   ├── navigation/              # TopNav, Footer, UserMenu
│   └── three/                   # HeroScene, ProductCover3D (+ dynamic loaders)
├── lib/
│   ├── supabase/                # client / server / proxy helpers
│   ├── types.ts                 # Product, Category, Profile
│   └── utils.ts                 # cn, slugify, formatGEL, formatDateKa
└── proxy.ts                     # Next.js 16 session-refresh "middleware"
```

## Design notes

- Palette: near-black base (`#08080c`), iridescent violet→cyan gradient, warm gold accents, warm rose highlight.
- Noise overlay + mesh gradient backdrops + blurred orbs across sections.
- 3D hero uses procedural geometry (sphere / torus / box / icosahedron) with `MeshTransmissionMaterial`, bloom, chromatic aberration, vignette — no asset files required.
- Product covers: a rotating rounded-box with a physical-material torus accent, colored per seed.

## Deployment

Deploy to **Vercel** (recommended) — zero config. Add the three env vars in Vercel Project Settings.

After deploy:

1. Update the GitHub OAuth App's Homepage + callback URLs to include your production domain.
2. Update Supabase **Site URL** and **Redirect URLs** to include production.
