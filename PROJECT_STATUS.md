# Project Status: Craftisan

> **Last Updated:** February 14, 2026
> **Current Phase:** Feature Refinement & Seller Tools

## 1. Project Overview
**Craftisan** is a marketplace for Pakistani handicrafts. It connects local artisans with buyers, featuring unique handmade items like resin art, crochet, paintings, and pottery.

## 2. Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Authentication:** Supabase Auth (SSR)
- **Storage:** Supabase Storage (Bucket: `products`)

## 3. Architecture Decisions
- **Database Access:** 
  - **Prisma** handles all relational data (Users, Products, Orders).
  - **Supabase Client** handles Authentication and Storage.
- **User Synchronization:**
  - Automatically syncs Supabase Auth users to Prisma `User` table via Postgres Trigger on signup.
  - Server Actions use `upsert` for robustness during seller onboarding.
- **Cart System:**
  - Client-side state using React Context.
  - Persisted to `localStorage`.
- **Image Strategy:**
  - Currently supports external URLs.
  - **Moving to:** Supabase Storage (Multipart uploads).

## 4. Current Status
### ✅ Completed Features
- **Authentication & Sync:**
  - Full Signup/Login flow.
  - Automatic DB synchronization (Supabase Trigger + Prisma).
- **Browsing & Discovery:**
  - **Shop Page:** Paginated (planned) product grid with category sidebar filtering.
  - **Category Navigation:** Direct links from Home to filtered Shop views.
  - **Seller Profiles:** Public pages (`/seller/[id]`) showing artisan-specific collections.
- **Seller Tools:**
  - **Become a Seller:** Onboarding flow to register shop names.
  - **Product Listing:** Form for sellers to post new items (Title, Description, Price, Category).
- **Shopping Experience:**
  - **Reusable Header:** Consistent navigation with UserNav and Cart trigger.
  - **Cart System:** Persistent cart with "Add to Cart" buttons on all product cards and a slide-over drawer UI.

### ✅ Completed Features
...
- **Checkout Flow:** Full multi-step process from cart to success screen.
- **UI Refinements:**
  - Standardized Cart sidebar with premium layout.
  - Stabilized order tracking on success page.
  - Build-ready for Vercel (removed unused components).

### ❌ Missing / To Do
- **Orders Dashboard:** Buyer and Seller views for order history.
- **Payments:** Integration with local payment gateways (JazzCash/EasyPaisa) or Stripe.
- **Search:** Global search bar for products and shops.

## 5. Recent Changes Log (Feb 2026)
- **Implemented Shopping Cart:** React Context + Sidebar Drawer + LocalStorage persistence.
- **Added Seller Profiles:** Dynamic routes for public artisan pages.
- **Product Listing:** Created `/list-product` page and server action.
- **Auth Sync:** Implemented Postgres Trigger for real-time user syncing.
- **Category Filtering:** Fixed `searchParams` Promise handling for Next.js 15.

## 6. How to Use This File
- **For Humans:** Current source of truth for project progress.
- **For AI Agents:** Use this to understand current architectural patterns and "next steps". Always update this file after completing significant milestones.
