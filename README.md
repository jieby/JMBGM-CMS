# JMBGM App (Jesus the Master Builder Global Ministry)

A modern, SSR-first web portal and content management system for **Jesus the Master Builder Global Ministry (JMBGM)**. Built with **Next.js 16 (App Router)**, **Payload CMS 3**, **Supabase PostgreSQL**, and **ShadCN UI** with a custom mobile-first aesthetic.

---

## 🌟 Tech Stack

| Technology | Role | Version |
| :--- | :--- | :--- |
| **Next.js** | Fullstack React Framework (App Router & Turbopack) | `16.x` |
| **React** | Component Architecture & Server Components (RSC) | `19.x` |
| **Payload CMS** | Headless Content Management System embedded in Next.js | `3.90.x` |
| **Supabase (PostgreSQL)** | Managed Database Backend via `@payloadcms/db-postgres` | Postgres 15+ |
| **Tailwind CSS** | Utility-first CSS Engine | `v4.x` |
| **ShadCN UI** | Accessible Component Library (Radix UI Primitives) | Latest |
| **TypeScript** | End-to-end Type Safety with auto-generated CMS types | `5.x` |

---

## 🎨 Brand Identity & Color Palette

The interface features an intentional, warm earthy palette designed for ministry warmth, readability, and mobile responsiveness:

| Name | Hex Code | Token | Usage |
| :--- | :--- | :--- | :--- |
| **Warm Ivory** | `#FBF6EE` | `--warm-ivory` / `--background` | Page canvas, card backgrounds, light contrast elements |
| **Deep Forest** | `#2F3E33` | `--deep-forest` / `--foreground` | Primary text, navigation header, dark accent cards, footer |
| **Terracotta** | `#C1683B` | `--terracotta` / `--accent` | Primary Call-to-Action buttons, active highlights, key links |
| **Olive Sage** | `#8A9A5B` | `--olive-sage` | Category tags, badges, subtitles, secondary status markers |

---

## 🏛️ Architecture Overview

```
jmbgm-app/
├── src/
│   ├── app/
│   │   ├── (frontend)/                     # Public SSR App Router Group
│   │   │   ├── globals.css                 # Tailwind v4 @theme inline & brand CSS vars
│   │   │   ├── layout.tsx                  # Public layout with responsive Header & Footer
│   │   │   └── page.tsx                    # SSR Landing Page (Payload Local API query)
│   │   └── (payload)/                      # Payload CMS App Router Group
│   │       ├── admin/                      # Payload Admin Views & Dashboard
│   │       │   ├── [[...segments]]/page.tsx
│   │       │   └── importMap.js            # Auto-generated Payload component mapping
│   │       ├── api/                        # Payload REST & GraphQL API endpoints
│   │       │   ├── [...slug]/route.ts      # REST API handlers
│   │       │   └── graphql/route.ts        # GraphQL API handlers
│   │       └── layout.tsx                  # Payload Admin RootLayout with Server Functions
│   ├── collections/                        # Payload Collection Definitions
│   │   ├── Announcements.ts                # Sunday Services, Events, News, Updates
│   │   ├── Media.ts                        # Image uploads with responsive presets
│   │   ├── Pages.ts                        # Modular pages with Drafts & Slugs
│   │   └── Users.ts                        # Administrator and Editor roles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                  # Mobile-first header with Sheet drawer
│   │   │   └── Footer.tsx                  # Deep Forest footer with ministry links
│   │   └── ui/                             # ShadCN UI Components
│   │       ├── badge.tsx                   # Badges with sage, terracotta, forest variants
│   │       ├── button.tsx                  # Buttons with brand color variants
│   │       ├── card.tsx                    # Elevated cards with subtle borders
│   │       ├── separator.tsx               # Structural divider
│   │       └── sheet.tsx                   # Mobile navigation drawer (Radix Dialog)
│   ├── lib/
│   │   └── utils.ts                        # Class name merging utility (clsx + twMerge)
│   ├── scripts/
│   │   └── seed.ts                         # Database seeder (Admin, Pages, Announcements)
│   ├── payload.config.ts                   # Central Payload 3 configuration
│   └── payload-types.ts                    # Auto-generated TypeScript types from CMS
├── public/                                 # Static assets & media upload target
├── components.json                         # ShadCN UI configuration
├── next.config.ts                          # Next.js config wrapped with withPayload
├── package.json                            # Scripts & dependencies
├── postcss.config.mjs                      # PostCSS with @tailwindcss/postcss
├── tsconfig.json                           # TypeScript path mappings (@/*, @payload-config)
└── .env.example                            # Template for environment variables
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: `v20.x` or higher (`v22.x` recommended)
- **npm** or **pnpm**
- A **Supabase PostgreSQL** database instance (or any PostgreSQL connection URI)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:jieby/JMBGM-CMS.git jmbgm-app
cd jmbgm-app
npm install
```

### 3. Environment Variables Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your `.env` variables:

```env
# 1. Supabase PostgreSQL Connection String
# Get this from Supabase Dashboard -> Project Settings -> Database -> Connection string
# Use Transaction Pooler (Port 6543) or Session Pooler (Port 5432)
DATABASE_URI=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require

# 2. Payload CMS Secret (Generate a strong 32+ char key)
# e.g.: openssl rand -base64 32
PAYLOAD_SECRET=your-secure-random-payload-secret-key-min-32-chars

# 3. Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

## 🗄️ Supabase PostgreSQL Setup

1. Log in to [Supabase Console](https://supabase.com/dashboard).
2. Create or select your project (e.g. `jmbgm-db`).
3. Navigate to **Project Settings** > **Database**.
4. Scroll to **Connection string** and select **URI**.
5. Choose **Session pooler** (`port 5432`) or **Transaction pooler** (`port 6543`).
   - If your environment uses IPv4, the Supabase pooler ensures seamless connectivity without IPv6 routing issues.
   - Always append `?sslmode=require` to enable secure SSL communication.
6. Replace `[YOUR-PASSWORD]` with your real database password.
7. Paste this URI into `DATABASE_URI` inside your `.env` file.

---

## 🌱 Database Seeding & First Admin

Once your `DATABASE_URI` is configured in `.env`, run the database seeder to bootstrap the tables and populate initial ministry content:

```bash
npm run db:seed
```

The seeder automatically provisions:
1. **Default Administrator**:
   - **Email**: `admin@jmbgm.org`
   - **Password**: `password123` *(Change this immediately after your first login!)*
   - **Role**: `admin`
2. **Initial Pages**:
   - Home Page (`/home`)
   - About Our Ministry (`/about`)
3. **Sample Announcements & Gatherings**:
   - *Sunday Miracle & Worship Celebration* (Sunday Service, Featured)
   - *Community Food Drive & Care Outreach* (Community Outreach, Featured)
   - *Midweek Word & Corporate Prayer Gathering* (Ministry Update)

---

## 💻 Development Server

Start the Next.js development server:

```bash
npm run dev
```

- **Public SSR Portal**: Open [http://localhost:3000](http://localhost:3000)
- **Payload Admin CMS**: Open [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📱 Mobile-First Features

- **Responsive Header & Drawer**: Mobile viewport displays a clean branding badge and a slide-out navigation `Sheet` using Radix UI primitives.
- **SSR-First Hydration**: Public landing page fetches announcements and dynamic content server-side via Payload's Local API (`getPayload({ config })`) with zero client-side waterfall fetching.
- **Strict CMS Content Policy**: If the database is empty or connection is pending, the frontend displays clear setup instructions rather than mock data.
- **Visual Category System**: Announcements feature color-coded category badges (`Sunday Service`, `Event`, `Community Outreach`, `Ministry Update`) utilizing the Olive Sage and Terracotta palette.

---

## 🛠️ CMS Collections

### 1. `Announcements` (`/admin/collections/announcements`)
- **Title**: Headline of the announcement or gathering.
- **Category**: Selectable dropdown (`Sunday Service`, `Announcement`, `Event`, `Ministry Update`, `Community Outreach`).
- **Date**: Schedule or event date.
- **Location**: Venue or online stream link.
- **Featured**: Checkbox to highlight or pin on the home page.
- **Summary**: Concise description shown on public cards.
- **Content**: Rich text editor for full details, scripture references, or notes.
- **Status**: Draft / Published workflow.

### 2. `Pages` (`/admin/collections/pages`)
- **Title**: Page title.
- **Slug**: URL identifier (`home`, `about`, `ministries`).
- **Hero Subtitle**: Optional lead paragraph for headers.
- **Content**: Lexical rich-text content editor.
- **Drafts & Versions**: Full version history and publishing controls.

### 3. `Media` (`/admin/collections/media`)
- **Uploads**: Image assets saved to `public/media` (or S3 / Supabase Storage bucket).
- **Responsive Sizes**: Automatically produces `thumbnail` (400x300), `card` (768x512), and `hero` (1920x1080) crops.
- **Accessibility**: Enforces `alt` text for screen readers.

### 4. `Users` (`/admin/collections/users`)
- **Authentication**: Built-in JWT and session management.
- **Roles**:
  - `admin`: Full management rights over collections, settings, and team access.
  - `editor`: Can create, edit, and publish content without administrative access.

---

## 📜 NPM Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server with hot reload |
| `npm run build` | Compiles an optimized production build of the Next.js app and Payload CMS |
| `npm run start` | Launches the production server |
| `npm run lint` | Runs ESLint to check for code standards |
| `npm run generate:types` | Regenerates `src/payload-types.ts` from collection schemas |
| `npm run generate:importmap` | Updates `src/app/(payload)/admin/importMap.js` for custom admin components |
| `npm run db:seed` | Runs `src/scripts/seed.ts` to provision initial admin, pages, and announcements |

---

## 🚢 Production Deployment (Vercel + Supabase)

1. Push this repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. Import the project into [Vercel](https://vercel.com).
3. Set the Framework Preset to **Next.js**.
4. In **Environment Variables**, provide:
   - `DATABASE_URI` (Your Supabase PostgreSQL Connection Pooler URI)
   - `PAYLOAD_SECRET` (A strong random secret key)
   - `NEXT_PUBLIC_SERVER_URL` (Your production Vercel domain, e.g., `https://jmbgm.org`)
5. Click **Deploy**.
6. Once deployed, run `npm run db:seed` once (or manually log into `/admin` to create your initial admin account).

---

## 🔒 Security & Best Practices

- Always keep `PAYLOAD_SECRET` secret and unique per environment.
- Enforce `sslmode=require` on production Supabase PostgreSQL connection strings.
- Change the initial seed password (`password123`) immediately after seeding.
- Public read access is restricted to published documents only; drafts remain secure behind authentication.

---

## 📄 License & Attribution

Designed and maintained for **Jesus the Master Builder Global Ministry (JMBGM)**.
Git Remote: `git@github.com:jieby/JMBGM-CMS.git`.
