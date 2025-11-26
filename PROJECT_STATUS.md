# Project Status: Craftisan

> **Last Updated:** November 26, 2025
> **Current Phase:** Authentication & Infrastructure Setup

## 1. Project Overview
**Craftisan** is a marketplace for Pakistani handicrafts (Etsy-like platform). It connects local artisans with buyers, featuring unique handmade items like resin art, crochet, paintings, and pottery.

## 2. Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Authentication:** Supabase Auth (SSR)
- **Deployment:** Vercel (planned)

## 3. Architecture Decisions
- **Database Access:** 
  - **Prisma** is used for all data queries (Products, Orders, Users).
  - **Supabase Client** is used **ONLY** for Authentication and Storage (Images).
- **Auth Flow:** 
  - Supabase Auth handles login/signup/sessions.
  - User data is synced to Prisma `User` table (TODO).
  - Middleware (`proxy.ts`) protects routes and refreshes sessions.
- **Image Storage:** Supabase Storage (Buckets).

## 4. Current Status
### ✅ Completed Features
- **Project Setup:** Next.js + TypeScript + Tailwind initialized.
- **Database:** Prisma schema defined (User, Product, Order) and connected to Supabase.
- **UI Components:** Basic shadcn/ui setup, Landing page with Hero/Categories.
- **Authentication Infrastructure:**
  - Supabase SSR client setup (`lib/supabase`).
  - Login & Signup pages with Email/Password & Google OAuth.
  - Auth middleware (`proxy.ts`).
  - Dynamic Navbar (`UserNav`) showing login state.

### 🚧 In Progress
- **Environment Configuration:** Waiting for Supabase keys in `.env`.
- **User Profile Sync:** Connecting Supabase Auth users to Prisma database.

### ❌ Missing / To Do
- **Product Management:** Create/Edit/Delete products (Seller Dashboard).
- **Browsing:** Product listing and details pages.
- **Shopping Cart:** Cart state and checkout flow.
- **Payments:** Integration (Stripe/Local payment gateways).
- **Image Upload:** Logic to upload product images to Supabase Storage.

## 5. Environment Setup
Required `.env` variables:
```env
# Connect to Supabase Transaction Pooler
DATABASE_URL="postgres://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Connect to Supabase Session Pooler (for migrations)
DIRECT_URL="postgres://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# Supabase Auth & Storage
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[public-anon-key]"
```

## 6. Recent Changes Log
- **[2025-11-26] Auth Setup:** Implemented full Supabase Auth flow. Created Login/Signup pages, `proxy.ts` middleware, and `UserNav` component.
- **[2025-11-26] UI Fixes:** Fixed Navbar alignment issues.
- **[2025-11-25] Prisma Fix:** Resolved module resolution issues with custom generated client path.

## 7. How to Use This File
- **For Humans:** Read this to get up to speed on what's done and what's next.
- **For AI Agents:** Read this file first to understand the context, architectural constraints, and current task status before making changes.
