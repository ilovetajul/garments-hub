// prisma/seed.ts
// Run: npm run db:seed

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Garments Brain database…");

  // ── Admin User ──────────────────────────────
  const admin = await db.user.upsert({
    where: { email: "admin@garmentsbrain.com" },
    update: {},
    create: {
      email: "admin@garmentsbrain.com",
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("✓ Admin user created");

  // ── Tags ─────────────────────────────────────
  const tags = ["POM", "QC", "Fabric", "Embroidery", "Defects", "Sewing", "AQL", "GSM"];
  for (const tag of tags) {
    await db.tag.upsert({
      where: { slug: tag.toLowerCase() },
      update: {},
      create: { name: tag, slug: tag.toLowerCase() },
    });
  }
  console.log("✓ Tags created");

  // ── Glossary Terms ───────────────────────────
  const glossaryTerms = [
    {
      termEn: "Chest Width",
      termBn: "বুকের প্রস্থ",
      slug: "chest-width",
      termType: "POM" as const,
      shortDefEn: "Horizontal measurement taken 1 inch below the armhole seam on a laid-flat garment, measuring from side seam to side seam.",
      shortDefBn: "ফ্ল্যাট গার্মেন্টে আর্মহোল সীমের ১ ইঞ্চি নিচে, পাশের সীম থেকে পাশের সীম পর্যন্ত অনুভূমিক মাপ।",
      tolerance: { woven: "±1.0cm", knit: "±1.5cm", denim: "±1.0cm" },
      standardRef: "ISO 3637, ASTM D5219",
      status: "PUBLISHED" as const,
    },
    {
      termEn: "AQL",
      termBn: "গ্রহণযোগ্য মান স্তর",
      slug: "aql",
      termType: "QC" as const,
      shortDefEn: "Acceptable Quality Level — the maximum defect percentage considered acceptable during sampling inspection of a production batch.",
      shortDefBn: "গ্রহণযোগ্য মান স্তর — উৎপাদন ব্যাচের নমুনা পরিদর্শনে সর্বোচ্চ ত্রুটির শতাংশ যা গ্রহণযোগ্য।",
      standardRef: "ISO 2859-1, MIL-STD-1916",
      status: "PUBLISHED" as const,
    },
    {
      termEn: "GSM",
      termBn: "গ্রাম প্রতি বর্গমিটার",
      slug: "gsm",
      termType: "FABRIC" as const,
      shortDefEn: "Grams per Square Metre — the standard unit for measuring fabric weight. Higher GSM means heavier, denser fabric.",
      shortDefBn: "গ্রাম পার স্কয়ার মিটার — কাপড়ের ওজন পরিমাপের আদর্শ একক। বেশি GSM মানে ভারী, ঘন কাপড়।",
      tolerance: { standard: "±5%", specification: "As per buyer TNA" },
      status: "PUBLISHED" as const,
    },
    {
      termEn: "HPS",
      termBn: "হাই পয়েন্ট শোল্ডার",
      slug: "hps",
      termType: "POM" as const,
      shortDefEn: "High Point Shoulder — the highest point on the shoulder seam at the neckline junction, used as the primary reference point for body length measurements.",
      shortDefBn: "হাই পয়েন্ট শোল্ডার — নেকলাইনের সংযোগস্থলে শোল্ডার সীমের সর্বোচ্চ বিন্দু, যা বডি লেন্থ মাপার প্রাথমিক রেফারেন্স পয়েন্ট।",
      status: "PUBLISHED" as const,
    },
    {
      termEn: "Seam Allowance",
      termBn: "সীম ভাতা",
      slug: "seam-allowance",
      termType: "SEWING" as const,
      shortDefEn: "The extra fabric between the seam line and the raw edge of fabric. Standard is 1cm (3/8\") for woven garments.",
      shortDefBn: "সীম লাইন এবং কাঁচা কাপড়ের প্রান্তের মধ্যবর্তী অতিরিক্ত কাপড়। বোনা পোশাকের জন্য স্ট্যান্ডার্ড ১ সেমি।",
      status: "PUBLISHED" as const,
    },
    {
      termEn: "Tolerance",
      termBn: "সহনশীলতা",
      slug: "tolerance",
      termType: "QC" as const,
      shortDefEn: "The allowable deviation from a specified measurement. Expressed as ±cm or ±mm. Critical measurements have tighter tolerances than minor ones.",
      shortDefBn: "নির্দিষ্ট মাপ থেকে অনুমোদিত বিচ্যুতি। ±সেমি বা ±মিমি হিসেবে প্রকাশ করা হয়।",
      status: "PUBLISHED" as const,
    },
  ];

  for (const term of glossaryTerms) {
    await db.glossaryTerm.upsert({
      where: { slug: term.slug },
      update: {},
      create: {
        ...term,
        targetRole: ["QC_INSPECTOR", "SUPERVISOR"],
        seoMeta: {
          create: {
            titleTag: `${term.termEn} — Garment Term Definition | Garments Brain`,
            metaDesc: term.shortDefEn.substring(0, 155),
            canonicalUrl: `https://garmentsbrain.com/glossary/${term.slug}`,
            keywords: [term.termEn.toLowerCase(), "garment", "QC", "definition"],
          },
        },
      },
    });
  }
  console.log("✓ Glossary terms created:", glossaryTerms.length);

  // ── Articles ─────────────────────────────────
  const articles = [
    {
      title: "How to Measure Chest Width (POM) — Complete QC Guide",
      slug: "how-to-measure-chest-width-pom",
      summary: "Step-by-step guide to measuring chest width accurately — covering the 1-inch reference point, tolerance limits by fabric type, and the 5 most common measuring errors.",
      body: `# How to Measure Chest Width (POM)

Chest width is one of the most critical POM measurements in garment QC. Getting it wrong means rejects, delays, and unhappy buyers.

## What is Chest Width?

Chest width is the horizontal measurement of a garment taken **1 inch (2.54 cm) below the armhole seam**, measuring from **side seam to side seam** with the garment laid flat.

## Step-by-Step Procedure

1. Lay the garment flat on a clean, smooth surface
2. Align the garment so side seams are straight
3. Locate the armhole seam on both sides
4. Measure 1 inch (2.54 cm) down from the lowest point of the armhole seam
5. Place your measuring tape horizontally at this point
6. Measure from side seam to side seam
7. Record the measurement in centimetres

## Tolerance Chart

| Fabric Type | Tolerance |
|---|---|
| Woven | ±1.0 cm |
| Knit / Jersey | ±1.5 cm |
| Denim | ±1.0 cm |
| Polar Fleece | ±2.0 cm |

## Key Takeaways

- Always measure 1 inch below armhole — not at armhole level
- Garment must be fully flat — no bunching or stretching
- Tolerance is ±1.0 cm for woven, ±1.5 cm for knit
- Measure at least 3 garments per size per colour per style
`,
      category: "POM" as const,
      difficulty: "INTERMEDIATE" as const,
      readTimeMin: 3,
      keyTakeaways: [
        "Measure exactly 1 inch below the armhole seam",
        "Tolerance: ±1.0 cm woven, ±1.5 cm knit",
        "Garment must be laid flat — no bunching",
        "Measure at least 3 pcs per size for sampling",
      ],
      status: "PUBLISHED" as const,
    },
    {
      title: "AQL 2.5 vs 4.0 — When to Use Which Standard",
      slug: "aql-2-5-vs-4-0",
      summary: "A practical breakdown of AQL sampling levels. Understand when AQL 2.5 is too strict, when 4.0 is too lenient, and how to choose the right level for each product type.",
      body: `# AQL 2.5 vs 4.0 — When to Use Which

AQL (Acceptable Quality Level) defines the maximum percentage of defective pieces that can be accepted in a batch. Choosing the wrong AQL level costs money — either through unnecessary rejects or through quality failures reaching customers.

## What the Numbers Mean

- **AQL 1.0** — Very strict. Used for medical/safety products
- **AQL 2.5** — Standard for export garments. Most European buyers
- **AQL 4.0** — More lenient. Used for some promotional or low-cost items
- **AQL 6.5** — Very lenient. Rarely used for quality garments

## When to Use AQL 2.5

Use AQL 2.5 for:
- Export orders to EU, US, UK buyers
- High-value garments (formal wear, branded items)
- Garments for children
- Orders with strict quality requirements in buyer TNA

## When to Use AQL 4.0

Use AQL 4.0 for:
- Domestic market orders with relaxed requirements
- Promotional items / uniforms
- When buyer explicitly specifies this level
- Very early proto samples

## Sample Size Table (GIL II)

| Lot Size | AQL 2.5 Sample | AQL 4.0 Sample |
|---|---|---|
| 151–280 | 32 pcs | 32 pcs |
| 281–500 | 50 pcs | 50 pcs |
| 501–1200 | 80 pcs | 80 pcs |
| 1201–3200 | 125 pcs | 125 pcs |
| 3201–10000 | 200 pcs | 200 pcs |
`,
      category: "QC" as const,
      difficulty: "INTERMEDIATE" as const,
      readTimeMin: 5,
      keyTakeaways: [
        "AQL 2.5 is the global export standard for most buyers",
        "AQL 4.0 is more lenient — only use when buyer specifies",
        "Same sample size for both — only acceptance number differs",
        "Children's wear should always use AQL 1.0 or 2.5",
      ],
      status: "PUBLISHED" as const,
    },
    {
      title: "GSM Measurement Guide — From Sample to Batch Assessment",
      slug: "gsm-measurement-guide",
      summary: "Everything about fabric weight — how to measure GSM accurately using a GSM cutter, what the numbers mean for different garment types, and how to catch GSM deviations early.",
      body: `# GSM Measurement Guide

GSM stands for Grams per Square Metre. It is the universal standard for measuring fabric weight and is one of the first specifications checked during fabric inspection.

## Why GSM Matters

- Determines fabric hand feel and drape
- Affects garment durability and longevity
- Buyer spec sheets always include GSM tolerance
- Out-of-spec GSM is grounds for fabric rejection

## How to Measure GSM

### Method 1: GSM Cutter (Standard)
1. Use a circular GSM cutter (100 cm² sample)
2. Cut at least 3 samples from different parts of the fabric
3. Weigh each sample on a precision balance (0.01g accuracy)
4. Multiply weight in grams by 100 to get GSM
5. Average the 3 readings

**Formula:** GSM = Weight (g) × 100

### Method 2: Template Calculation
If you have a rectangular sample:
**GSM = Weight (g) / (Length cm × Width cm) × 10,000**

## GSM Reference Chart

| Fabric Category | GSM Range | Common Use |
|---|---|---|
| Sheer / Lightweight | 60–100 | Chiffon, voile |
| Light-Medium | 100–180 | Summer T-shirts |
| Medium | 180–250 | Regular T-shirts, shirts |
| Medium-Heavy | 250–350 | Sweatshirts, denim |
| Heavy | 350–500 | Jackets, coats |

## Tolerance

Most buyers accept ±5% from specified GSM. Always check buyer TNA for exact tolerance.
`,
      category: "FABRIC" as const,
      difficulty: "BEGINNER" as const,
      readTimeMin: 4,
      keyTakeaways: [
        "Use a 100 cm² GSM cutter for standard testing",
        "Take minimum 3 samples from different positions",
        "Standard tolerance is ±5% from specified GSM",
        "Check buyer TNA — some specify tighter tolerance",
      ],
      status: "PUBLISHED" as const,
    },
  ];

  for (const article of articles) {
    await db.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        ...article,
        targetRole: ["QC_INSPECTOR", "SUPERVISOR"],
        publishedAt: new Date("2025-03-01"),
        authorId: admin.id,
        seoMeta: {
          create: {
            titleTag: `${article.title} | Garments Brain`,
            metaDesc: article.summary.substring(0, 155),
            canonicalUrl: `https://garmentsbrain.com/articles/${article.slug}`,
            keywords: ["garment", "QC", article.category.toLowerCase()],
          },
        },
      },
    });
  }
  console.log("✓ Articles created:", articles.length);
  console.log("\n✅ Database seeded successfully!");
  console.log("   Run: npx prisma studio to view your data");
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
