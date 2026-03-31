# ExpenseX 💸

A production-ready Progressive Web App (PWA) for tracking income and expenses — built with **Next.js 15**, **Tailwind CSS**, and **Supabase**.

![ExpenseX Preview](./docs/preview.png)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 Auth | Email/password + Google OAuth via Supabase |
| 🏠 Dashboard | Monthly overview, income/expense totals, transaction list |
| ➕ Add Transactions | Modal with category picker, date, and description |
| 📊 Analytics | Bar charts, area charts, category breakdown |
| 📤 Export | CSV download, PDF report, clipboard summary |
| ⚙️ Settings | Currency selector, profile, sign out |
| 📱 PWA | Installable, offline-capable, manifest + service worker |
| 🎤 Voice Input | Placeholder (structure ready) |
| 📷 Receipt Scan | Placeholder (structure ready) |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourname/expensex.git
cd expensex
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the **SQL Editor**, run the contents of [`supabase/schema.sql`](./supabase/schema.sql)
3. In **Authentication → Providers**, enable:
   - **Email** (already on by default)
   - **Google** OAuth (add Client ID + Secret from Google Cloud Console)
4. In **Authentication → URL Configuration**, add:
   - Site URL: `http://localhost:3000` (dev) or your production URL
   - Redirect URL: `http://localhost:3000/auth/callback`

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from:  
**Supabase Dashboard → Your Project → Settings → API**

### 4. Add PWA Icons

Place PNG icons in `/public/icons/` with these sizes:
`72, 96, 128, 144, 152, 192, 384, 512`

Naming convention: `icon-192x192.png`, etc.

You can generate them at [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net) using the SVG in `/public/icons/icon.svg`.

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```
expensex/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   └── signup/page.tsx         # Signup page
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Dashboard shell (auth check)
│   │   ├── page.tsx                # Home / Dashboard
│   │   ├── analytics/page.tsx      # Analytics page
│   │   └── settings/page.tsx       # Settings page
│   ├── auth/callback/route.ts      # OAuth callback handler
│   ├── layout.tsx                  # Root layout (fonts, PWA meta)
│   └── globals.css                 # Global styles
│
├── components/
│   ├── analytics/
│   │   ├── CategoryBreakdown.tsx   # Bar chart + category list
│   │   ├── DailySpendingChart.tsx  # Area chart
│   │   ├── ExportSection.tsx       # PDF / CSV / clipboard
│   │   └── SummaryStatsRow.tsx     # Stats cards
│   ├── layout/
│   │   ├── AppHeader.tsx           # Top header with logo + avatar
│   │   └── BottomNav.tsx           # Bottom navigation bar
│   ├── transactions/
│   │   ├── AddTransactionModal.tsx # Add transaction sheet
│   │   ├── BalanceCard.tsx         # Net balance card
│   │   └── TransactionList.tsx     # Scrollable transaction list
│   └── ui/
│       ├── LoadingSkeleton.tsx     # Skeleton loader
│       └── MonthNavigator.tsx      # Month prev/next navigator
│
├── hooks/
│   ├── useTransactions.ts          # Fetch, add, delete transactions
│   ├── useUser.ts                  # Current user + sign out
│   └── useSettings.ts             # Currency + preferences (localStorage)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   └── server.ts               # Server Supabase client
│   └── utils/
│       └── index.ts                # formatCurrency, exportCSV, etc.
│
├── types/index.ts                  # TypeScript types + constants
├── middleware.ts                   # Auth route protection
├── supabase/schema.sql             # Database setup SQL
├── public/
│   ├── manifest.json               # PWA manifest
│   └── icons/                      # App icons
├── next.config.js                  # Next.js + PWA config
├── tailwind.config.js
└── .env.local.example
```

---

## 🗄️ Database Schema

### `transactions`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK → auth.users |
| `amount` | numeric(12,2) | Always positive |
| `type` | text | `'income'` \| `'expense'` |
| `category` | text | |
| `date` | date | |
| `description` | text | |
| `created_at` | timestamptz | Auto-set |

### `categories`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | |
| `user_id` | uuid \| null | `null` = global default |
| `icon` | text | Emoji |
| `color` | text | Hex color |
| `type` | text | `'income'` \| `'expense'` \| `'both'` |

**RLS policies** ensure users can only read/write their own data.

---

## ☁️ Deploy to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo

3. Add environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL    = https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
   ```

4. Click **Deploy** — done! 🎉

5. After deploying, update Supabase:
   - **Authentication → URL Configuration → Site URL**: your Vercel URL
   - **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

---

## 🔐 Google OAuth Setup (optional)

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → **APIs & Services → Credentials**
3. Create **OAuth 2.0 Client ID** (Web Application)
4. Add Authorized redirect URI:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
5. Copy **Client ID** and **Client Secret** into Supabase:
   - **Authentication → Providers → Google**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v3 |
| Backend & Auth | Supabase (PostgreSQL + Auth) |
| Charts | Recharts |
| PDF Export | jsPDF + jspdf-autotable |
| PWA | next-pwa (Workbox) |
| Fonts | Outfit + Syne (Google Fonts) |
| Icons | Lucide React |
| Dates | date-fns |

---

## 🎤 Advanced Features (Planned)

- **Voice Input**: Browser Web Speech API → parse amount/category from speech
- **Receipt Scanning**: Camera capture → OCR via Tesseract.js or cloud API
- **Budget Goals**: Set monthly budget per category with alerts
- **Recurring Transactions**: Auto-add salary/rent on schedule
- **Multi-currency**: Convert between currencies with live rates

---

## 📄 License

MIT — free to use and modify.

---

Built with ❤️ using Next.js + Supabase
