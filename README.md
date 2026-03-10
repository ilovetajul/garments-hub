# 🧠 Garments Brain

> The definitive knowledge hub for garment industry professionals — QC inspectors, supervisors, and designers.

**Live:** [garmentsbrain.com](https://garmentsbrain.com) | **Stack:** Next.js 14 · Prisma · PostgreSQL · Tailwind CSS · Clerk · Vercel

---

## 🚀 Quick Start (Local Development)

### Step 1 — Prerequisites
Make sure you have these installed:
- **Node.js** v18 or higher → [nodejs.org](https://nodejs.org)
- **Git** → [git-scm.com](https://git-scm.com)
- A **Supabase** account (free) → [supabase.com](https://supabase.com)
- A **Clerk** account (free) → [clerk.com](https://clerk.com)

### Step 2 — Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/garments-brain.git
cd garments-brain
npm install
```

### Step 3 — Set up environment variables
```bash
cp .env.example .env.local
```
Open `.env.local` and fill in:
- `DATABASE_URL` → from Supabase: Project → Settings → Database → Connection string (Transaction pooler)
- `DIRECT_URL` → from Supabase: same page, Session pooler
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → from Clerk dashboard
- `CLERK_SECRET_KEY` → from Clerk dashboard

### Step 4 — Set up the database
```bash
npx prisma db push        # Creates all tables in Supabase
npx prisma generate       # Generates TypeScript types
npm run db:seed           # Populates with initial data
```

### Step 5 — Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 Deploy to Vercel

### Option A — Dashboard (Recommended for beginners)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Add all environment variables from `.env.local`
5. Click **Deploy**

### Option B — CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### After deploying — run DB migrations on production
```bash
# In Vercel dashboard, go to:
# Project → Settings → Environment Variables
# Add all your .env.local variables

# Then trigger a redeploy for the DB seed to work
```

---

## 📁 Project Structure

```
garments-brain/
├── prisma/
│   ├── schema.prisma     ← Database models
│   └── seed.ts           ← Initial data seed script
├── src/
│   ├── app/              ← Next.js App Router pages
│   │   ├── page.tsx          ← Homepage
│   │   ├── layout.tsx        ← Root layout
│   │   ├── glossary/         ← Glossary pages
│   │   ├── articles/         ← Article pages
│   │   ├── tools/            ← Calculator tools
│   │   └── api/              ← API routes
│   ├── components/
│   │   ├── layout/       ← Navbar, Footer
│   │   └── home/         ← Homepage sections
│   └── lib/
│       ├── db.ts         ← Prisma client
│       └── utils.ts      ← Helper functions
└── public/               ← Static assets
```

---

## 🗄️ Database Commands

```bash
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed initial articles and glossary terms  
npm run db:studio    # Open Prisma Studio (visual database browser)
npm run db:generate  # Regenerate Prisma client types
```

---

## 📝 Adding Content

### Add a new article
1. Open Prisma Studio: `npm run db:studio`
2. Go to the **Article** table
3. Click **Add record**
4. Fill in: title, slug, summary, body (Markdown), category, status: PUBLISHED

### Add a glossary term
1. Open Prisma Studio: `npm run db:studio`
2. Go to the **GlossaryTerm** table
3. Fill in: termEn, termBn, slug, termType, shortDefEn, shortDefBn, status: PUBLISHED

---

## 🎨 Design System

All design tokens are in `tailwind.config.ts` and `src/app/globals.css`.

**Colors:** Forest `#0D6E57` · Amber `#B87800` · Ink `#161410`  
**Fonts:** Playfair Display (headings) · DM Sans (body) · DM Mono (code)  
**Breakpoints:** sm:640 · md:768 · lg:1024 · xl:1280

---

## 🔧 Environment Variables Reference

| Variable | Where to get it | Required |
|---|---|---|
| `DATABASE_URL` | Supabase → Project → Settings → Database | ✅ |
| `DIRECT_URL` | Supabase → same page | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk → API Keys | ✅ |
| `CLERK_SECRET_KEY` | Clerk → API Keys | ✅ |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary → Dashboard | Optional |

---

## 📞 Support

- **GitHub Issues:** [github.com/YOUR_USERNAME/garments-brain/issues](https://github.com)
- **Email:** admin@garmentsbrain.com

---

Built with ❤️ for the global garment industry.
