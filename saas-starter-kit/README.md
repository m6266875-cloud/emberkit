# SaaS Starter Kit — Next.js + Supabase + Stripe

A production-ready starting point for a subscription SaaS: auth, billing, and
a protected dashboard, already wired together.

## What's included
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Supabase auth (email/password, OAuth-ready) with session middleware
- Stripe subscription checkout + webhook handling
- Protected `/dashboard` route
- Landing page template

## Setup — step by step

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Once created, go to **Settings → API**
3. Copy your **Project URL** and **anon public key**

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Paste in your Supabase URL + anon key.

### 4. Run the database schema
1. In Supabase, go to **SQL Editor**
2. Paste the contents of `supabase/schema.sql` and run it
   (this creates a `profiles` table that tracks subscription status)

### 5. Set up Stripe
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API keys
2. Copy your **Secret key** and **Publishable key** into `.env.local`
3. Go to **Product catalog** → create a Product with a recurring Price
   → copy the **Price ID** into `.env.local` as `STRIPE_PRICE_ID`
4. For local webhook testing, install the [Stripe CLI](https://stripe.com/docs/stripe-cli), then run:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   This prints a webhook signing secret — paste it into `.env.local` as `STRIPE_WEBHOOK_SECRET`

### 6. Run the app
```bash
npm run dev
```
Visit `http://localhost:3000`

### 7. (Optional) Enable Google OAuth
In Supabase: **Authentication → Providers → Google** → follow the setup guide
and add your credentials. No code changes needed — the auth flow already
supports it via `supabase.auth.signInWithOAuth()`.

## Deploying
1. Push this repo to GitHub
2. Import it into [Vercel](https://vercel.com)
3. Add all your `.env.local` variables in Vercel's Environment Variables settings
4. Update `NEXT_PUBLIC_SITE_URL` to your production domain
5. Create a **production** Stripe webhook pointing to
   `https://yourdomain.com/api/stripe/webhook` and update `STRIPE_WEBHOOK_SECRET`

## Project structure
```
app/
  page.tsx              → Landing page
  login/                → Login page
  signup/                → Signup page
  dashboard/              → Protected dashboard (build your product here)
  api/
    auth/callback/         → Handles email confirmation + OAuth redirect
    stripe/checkout/         → Creates a Stripe Checkout session
    stripe/webhook/          → Handles Stripe subscription events
lib/
  supabase/client.ts      → Browser Supabase client
  supabase/server.ts      → Server Supabase client
  stripe.ts               → Stripe server client
components/
  SignOutButton.tsx
  UpgradeButton.tsx
middleware.ts             → Protects /dashboard, refreshes auth sessions
supabase/schema.sql        → Database schema to run in Supabase
```

## Customizing for your product
- Replace copy on the landing page (`app/page.tsx`)
- Rename "YourSaaS" throughout
- Build your actual features inside `app/dashboard/`
- Update the webhook handler (`app/api/stripe/webhook/route.ts`) to write
  subscription status into the `profiles` table using Supabase's service
  role key (server-side only — never expose it to the client)

---
Built with Next.js, Supabase, and Stripe.
