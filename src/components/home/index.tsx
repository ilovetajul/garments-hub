"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

// ── ARTICLES ──────────────────────────────────────
const ARTICLES = [
  { slug: "how-to-measure-chest-width-pom", title: "How to Measure Chest Width (POM) — Complete QC Guide", summary: "The step-by-step measurement protocol used by QC inspectors worldwide. Covers the 1-inch reference point, tolerance limits, and common errors.", category: "pom", role: "QC Inspector", readTime: 3, featured: true },
  { slug: "aql-2-5-vs-4-0", title: "AQL 2.5 vs 4.0 — When to Use Which Standard", summary: "Practical breakdown of sampling plans by product type and buyer requirement.", category: "qc", role: "Supervisor", readTime: 5 },
  { slug: "gsm-measurement-guide", title: "GSM Measurement Guide — From Sample to Batch", summary: "How to measure GSM accurately and catch deviations before rejects.", category: "fabric", role: "All Roles", readTime: 4 },
  { slug: "stitch-density-vs-count", title: "Stitch Count vs Density — Why It Matters for QC", summary: "Density (stitches/cm²) is the metric that actually predicts embroidery quality.", category: "embroidery", role: "QC Inspector", readTime: 6 },
  { slug: "top-20-sewing-defects", title: "Top 20 Sewing Defects — Visual Reference with AQL Classification", summary: "Photo reference for the 20 most common defects with Critical/Major/Minor classification.", category: "qc", role: "QC Inspector", readTime: 8 },
];

const BADGE: Record<string, string> = {
  pom:        "bg-forestBg text-forest",
  qc:         "bg-blue-100 text-blue-800",
  fabric:     "bg-amberBg text-amber",
  embroidery: "bg-sky-100 text-sky-700",
  sewing:     "bg-purple-100 text-purple-700",
};

const FILTERS = ["all", "pom", "qc", "fabric", "embroidery"];

export function FeaturedArticles() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === active);

  return (
    <section className="py-20 bg-white" id="articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-xs text-forest tracking-widest uppercase bg-forestBg border border-forest/20 px-3 py-1 rounded-full inline-block mb-4">Popular Articles</div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-ink">What Professionals Are Reading</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f: string) => (
              <button key={f} onClick={() => setActive(f)}
                className={`font-semibold text-xs px-3.5 py-1.5 rounded-full border transition-all capitalize ${
                  active === f ? "bg-forest text-white border-forest" : "border-rule text-slateL hover:border-forest hover:text-forest"
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((a, i) => (
            <article key={a.slug}
              className={`bg-bg border border-rule rounded-2xl overflow-hidden card-lift group ${a.featured && i === 0 ? "md:col-span-2" : ""}`}
              style={{ opacity: 1, transition: "opacity 0.25s" }}>
              {/* Coloured header strip */}
              <div className={`h-2 w-full ${a.category === "pom" ? "bg-forest" : a.category === "qc" ? "bg-blue-700" : a.category === "fabric" ? "bg-amber" : a.category === "embroidery" ? "bg-sky-600" : "bg-purple-600"}`} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${BADGE[a.category]}`}>{a.category.toUpperCase()}</span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">{a.role}</span>
                  <span className="ml-auto text-xs text-slateL flex items-center gap-1">
                    <Clock size={11} /> {a.readTime} min
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-ink mb-2 group-hover:text-forest transition-colors leading-snug">
                  <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                </h3>
                <p className="text-slateL text-sm leading-relaxed line-clamp-2">{a.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/articles"
            className="inline-flex items-center gap-2 bg-forestBg hover:bg-forest hover:text-white text-forest font-semibold px-6 py-3 rounded-xl border border-forest/20 hover:border-forest transition-all duration-200 group">
            View All Articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── TOOLS ─────────────────────────────────────────
export function ToolsSection() {
  const [gsm, setGsm]         = useState({ w: "", s: "" });
  const [garment, setGarment] = useState("tshirt");

  const gsmResult = (() => {
    const w = parseFloat(gsm.w), s = parseFloat(gsm.s);
    if (w > 0 && s > 0) return Math.round(w / ((s / 100) * (s / 100)));
    return null;
  })();

  const estimates: Record<string, string> = { tshirt: "~1.8", trouser: "~2.4", jacket: "~3.2", dress: "~2.8" };

  return (
    <section className="py-20 bg-bg" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="font-mono text-xs text-forest tracking-widest uppercase bg-forestBg border border-forest/20 px-3 py-1 rounded-full inline-block mb-4">Free Tools</div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-ink mb-3">Calculate. Generate. Validate.</h2>
          <p className="text-slateL text-base max-w-xl mx-auto">Production-ready tools. No sign-in required.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GSM */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-card card-lift" style={{ borderTop: "3px solid #0D6E57" }}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-forestBg rounded-xl flex items-center justify-center">
                  <span className="font-mono font-black text-forest text-sm">GSM</span>
                </div>
                <span className="font-mono text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">FREE</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-ink mb-2">GSM Calculator</h3>
              <p className="text-slateL text-sm leading-relaxed mb-5">Calculate fabric weight from sample measurements.</p>
              <div className="bg-bg rounded-xl p-4 border border-rule mb-5">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="font-mono text-[10px] text-slateL uppercase tracking-wide block mb-1">Weight (g)</label>
                    <input type="number" placeholder="4.5" value={gsm.w}
                      onChange={(e) => setGsm({ ...gsm, w: e.target.value })}
                      className="w-full text-sm border border-rule rounded-lg px-3 py-2 bg-white focus:border-forest focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-slateL uppercase tracking-wide block mb-1">Size (cm)</label>
                    <input type="number" placeholder="10" value={gsm.s}
                      onChange={(e) => setGsm({ ...gsm, s: e.target.value })}
                      className="w-full text-sm border border-rule rounded-lg px-3 py-2 bg-white focus:border-forest focus:outline-none transition-all" />
                  </div>
                </div>
                <div className="text-center py-2 rounded-lg bg-white border border-rule">
                  <span className="font-serif font-black text-2xl text-forest">{gsmResult ?? "—"}</span>
                  <span className="text-slateL text-sm ml-1">GSM</span>
                </div>
              </div>
              <Link href="/tools/gsm-calculator" className="flex items-center justify-center gap-2 bg-forest hover:bg-forestL text-white font-semibold text-sm py-2.5 rounded-xl transition-colors w-full">
                Open Full Tool <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Fabric Consumption */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-card card-lift" style={{ borderTop: "3px solid #B87800" }}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-amberBg rounded-xl flex items-center justify-center">
                  <span className="font-mono font-black text-amber text-xs">CONS</span>
                </div>
                <span className="font-mono text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">FREE</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-ink mb-2">Fabric Consumption</h3>
              <p className="text-slateL text-sm leading-relaxed mb-5">Calculate exact fabric needed per piece for your order.</p>
              <div className="bg-bg rounded-xl p-4 border border-rule mb-5">
                <label className="font-mono text-[10px] text-slateL uppercase tracking-wide block mb-2">Garment Type</label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {Object.keys(estimates).map((g: string) => (
                    <button key={g} onClick={() => setGarment(g)}
                      className={`text-xs font-semibold py-1.5 rounded-lg border capitalize transition-colors ${
                        garment === g ? "border-amber bg-amberBg text-amber" : "border-rule text-slateL hover:border-amber"
                      }`}>
                      {g === "tshirt" ? "T-Shirt" : g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="text-center py-2 rounded-lg bg-white border border-rule">
                  <span className="font-serif font-black text-2xl text-amber">{estimates[garment]}</span>
                  <span className="text-slateL text-sm ml-1">m/piece</span>
                </div>
              </div>
              <Link href="/tools/fabric-consumption" className="flex items-center justify-center gap-2 bg-amber hover:bg-amberL text-white font-semibold text-sm py-2.5 rounded-xl transition-colors w-full">
                Open Full Tool <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* POM Generator */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-card card-lift" style={{ borderTop: "3px solid #1A5CA8" }}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <span className="font-mono font-black text-blue-700 text-xs">POM</span>
                </div>
                <span className="font-mono text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">FREE + PDF</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-ink mb-2">POM Template Generator</h3>
              <p className="text-slateL text-sm leading-relaxed mb-5">Generate a professional spec sheet. Export as PDF.</p>
              <div className="bg-bg rounded-xl p-3 border border-rule mb-5 overflow-hidden">
                <div className="font-mono text-[9px] text-slateL uppercase tracking-wide mb-2">Sample Output</div>
                <table className="w-full text-[10px]">
                  <thead><tr className="bg-blue-700 text-white">
                    <th className="px-2 py-1 text-left rounded-l">Point of Measure</th>
                    <th className="px-2 py-1">S</th><th className="px-2 py-1">M</th><th className="px-2 py-1 rounded-r">L</th>
                  </tr></thead>
                  <tbody className="divide-y divide-rule">
                    {[["Chest Width","49","52","55"],["Body Length","68","71","74"],["Shoulder","41","44","47"]].map(([n,...v]) => (
                      <tr key={n} className="even:bg-mist bg-white">
                        <td className="px-2 py-1 text-ink font-medium">{n}</td>
                        {v.map((x, i) => <td key={i} className="px-2 py-1 text-center text-slateL">{x}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/tools/pom-generator" className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors w-full">
                Generate POM Sheet <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── COURSES ────────────────────────────────────────
export function CoursesSection() {
  return (
    <section className="py-20 bg-forestD" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <div className="lg:w-80 flex-shrink-0">
            <div className="font-mono text-xs text-green-400 tracking-widest uppercase border border-green-400/30 bg-green-400/10 px-3 py-1 rounded-full inline-block mb-6">Learning Paths</div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-white mb-4 leading-tight">Structured Courses for Garment Pros</h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">Industry-specific micro-courses. Learn at your pace.</p>
            <div className="grid grid-cols-2 gap-4">
              {[["8","Lessons"],["4–5h","Duration"],["Free","Price"],["🏅","Certificate"]].map(([n, l]) => (
                <div key={l} className="bg-white/10 rounded-xl p-4 text-center">
                  <div className={`font-serif font-black text-2xl ${l === "Price" ? "text-green-400" : "text-white"}`}>{n}</div>
                  <div className="font-mono text-xs text-white/50 uppercase tracking-wide mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            {/* Active course */}
            <div className="bg-white/10 border border-white/15 hover:bg-white/15 rounded-2xl p-6 transition-all cursor-pointer card-lift">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-amber/20 border border-amber/30 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">🧵</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] text-amber tracking-wide uppercase bg-amber/20 border border-amber/30 px-2 py-0.5 rounded-full">New Course</span>
                    <span className="font-mono text-[10px] text-white/50 tracking-wide uppercase">Intermediate · 4–5 hrs</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-1">QC for Embroidery — Complete Inspector Course</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">8 lessons covering stitch types, thread quality, defect classification, AQL sampling, and compliance testing.</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full w-0" />
                    </div>
                    <span className="font-mono text-xs text-white/40">0 / 8 lessons</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-4 gap-2">
                {[["🧵","Fundamentals"],["🎨","Thread Quality"],["🔍","Defect Class."],["📊","AQL & Reports"]].map(([e, l]) => (
                  <div key={l} className="text-center">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-1 text-sm">{e}</div>
                    <div className="font-mono text-[9px] text-white/40 leading-tight">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming soon */}
            {[["📐","POM Measurement Fundamentals","Beginner · 3 hrs"],["🏭","Factory Audit & Compliance","Advanced · 6 hrs"]].map(([e, t, m]) => (
              <div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-70">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">{e}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] text-white/40 tracking-wide uppercase bg-white/10 border border-white/15 px-2 py-0.5 rounded-full">Coming Soon</span>
                      <span className="font-mono text-[10px] text-white/40 tracking-wide uppercase">{m}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-white/70">{t}</h3>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-2">
              <Link href="/courses" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold text-sm transition-colors group">
                View All Learning Paths <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── GLOSSARY TEASER ────────────────────────────────
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const HAS_TERMS = new Set(["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","W"]);

const SAMPLE_TERMS = [
  { en: "Chest Width",   bn: "বুকের প্রস্থ",       def: "Horizontal measurement 1 inch below armhole seam",  badge: "POM",    slug: "chest-width" },
  { en: "AQL",           bn: "গ্রহণযোগ্য মান",     def: "Acceptable Quality Level — batch inspection threshold", badge: "QC",  slug: "aql" },
  { en: "GSM",           bn: "গ্রাম প্রতি বর্গমিটার", def: "Fabric weight in grams per square metre",           badge: "Fabric", slug: "gsm" },
];

export function GlossaryTeaser() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="font-mono text-xs text-purple-700 tracking-widest uppercase bg-purple-50 border border-purple-200 px-3 py-1 rounded-full inline-block mb-6">Bilingual Glossary</div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-ink mb-4 leading-tight">500+ Terms in English and বাংলা</h2>
            <p className="text-slateL text-base leading-relaxed mb-6">Every garment term with full definitions, pronunciation guides, tolerances, and diagrams.</p>
            <div className="space-y-3 mb-8">
              {SAMPLE_TERMS.map((t: string) => (
                <Link key={t.slug} href={`/glossary/${t.slug}`}
                  className="flex items-center justify-between bg-white border border-rule rounded-xl px-4 py-3 hover:border-forest/30 hover:shadow-card transition-all group">
                  <div>
                    <div className="font-bold text-ink text-sm group-hover:text-forest transition-colors">
                      {t.en} <span className="text-slateL font-normal text-xs ml-2">/ {t.bn}</span>
                    </div>
                    <div className="text-slateL text-xs mt-0.5">{t.def}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-forestBg text-forest">{t.badge}</span>
                    <ArrowRight size={14} className="text-slateL group-hover:text-forest transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/glossary" className="inline-flex items-center gap-2 bg-forestD hover:bg-forestD/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors group">
              Browse Full Glossary <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white border border-rule rounded-2xl p-6 shadow-card">
              <div className="font-mono text-[10px] text-slateL uppercase tracking-widest mb-4">Browse A–Z</div>
              <div className="grid grid-cols-9 gap-1.5 mb-5">
                {ALPHABET.map((l: string) => (
                  <Link key={l} href={`/glossary?letter=${l}`}
                    className={`aspect-square rounded-lg text-xs font-bold font-mono flex items-center justify-center transition-all ${
                      HAS_TERMS.has(l)
                        ? "bg-forestBg text-forest hover:bg-forest hover:text-white border border-forest/20"
                        : "bg-mist text-fog border border-rule pointer-events-none"
                    }`}>
                    {l}
                  </Link>
                ))}
              </div>
              <div className="border-t border-rule pt-4">
                <div className="font-mono text-[10px] text-slateL uppercase tracking-wide mb-3">Recent additions</div>
                {[["Tolerance","New"],["Backing (Embroidery)","New"],["Seam Allowance","Mar 25"],["HPS","Mar 25"]].map(([t, d]) => (
                  <div key={t} className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-ink font-medium">{t}</span>
                    <span className={`font-mono text-xs ${d === "New" ? "text-forest" : "text-slateL"}`}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NEWSLETTER ─────────────────────────────────────
export function NewsletterCTA() {
  const [email, setEmail]     = useState("");
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setDone(true); setLoading(false); }, 1000);
  };

  return (
    <section className="py-16 bg-white border-y border-rule">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="font-mono text-xs text-forest tracking-widest uppercase bg-forestBg border border-forest/20 px-3 py-1 rounded-full inline-block mb-5">Weekly Updates</div>
        <h2 className="font-serif font-black text-2xl sm:text-3xl text-ink mb-3">Stay current with garment industry QC standards</h2>
        <p className="text-slateL text-base mb-8">New articles, tool updates, and industry news — every Monday.</p>
        {done ? (
          <p className="text-forest font-semibold">✓ You&apos;re in — updates every Monday.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Your work email"
              className="flex-1 border border-rule rounded-xl px-4 py-3 text-sm focus:border-forest focus:outline-none transition-all"
            />
            <button type="submit" disabled={loading}
              className="bg-forest hover:bg-forestL text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm disabled:opacity-70">
              {loading ? "Subscribing…" : "Get Updates"}
            </button>
          </form>
        )}
        <p className="text-slateL text-xs mt-3">Join 2,000+ garment professionals. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
