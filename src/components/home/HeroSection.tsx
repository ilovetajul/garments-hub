"use client";
// src/components/home/HeroSection.tsx
import { useState } from "react";
import { Search } from "lucide-react";

const SUGGESTIONS = [
  { label: "Chest Width", sub: "POM measurement guide", href: "/articles/how-to-measure-chest-width-pom", badge: "POM" },
  { label: "AQL 2.5", sub: "Acceptable Quality Level explained", href: "/articles/aql-2-5-vs-4-0", badge: "QC" },
  { label: "GSM Calculator", sub: "Free fabric weight tool", href: "/tools/gsm-calculator", badge: "Tool" },
  { label: "Skipped Stitch", sub: "Defect classification", href: "/defects/skipped-stitch", badge: "Defect" },
  { label: "Satin Stitch", sub: "Embroidery stitch guide", href: "/glossary/satin-stitch", badge: "Glossary" },
];

export function HeroSection() {
  const [query, setQuery]         = useState("");
  const [showDrop, setShowDrop]   = useState(false);
  const [activeRole, setActiveRole] = useState("all");

  const filtered = query
    ? SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS;

  return (
    <section className="relative min-h-screen bg-forestD hero-grid flex items-center overflow-hidden pt-16">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-forest/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] rounded-full bg-amber/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="animate-fade-in inline-flex items-center gap-2 bg-forest/40 border border-forest/50 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="font-mono text-xs text-green-300 tracking-wider uppercase">500+ Industry Terms · 50+ QC Guides</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up font-serif font-black text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
            The Knowledge Hub<br />
            <span className="italic" style={{ background: "linear-gradient(135deg,#4ADE80,#148F70)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Built for Garment
            </span>
            <br />Professionals
          </h1>

          <p className="animate-fade-up delay-200 text-white/65 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            POM charts, QC inspection guides, defect libraries, fabric specs, and free tools — all built for the factory floor.
          </p>

          {/* Role switcher */}
          <div className="animate-fade-up delay-300 flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-white/50 text-sm">I&apos;m a:</span>
            {[["all","All"], ["qc","QC Inspector"], ["supervisor","Supervisor"], ["designer","Designer"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setActiveRole(val)}
                className={`font-semibold text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeRole === val
                    ? "bg-forest text-white border-forest"
                    : "text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="animate-fade-up delay-400 relative max-w-2xl mx-auto">
            <div className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl transition-all duration-300 ${showDrop ? "shadow-[0_0_0_3px_rgba(13,110,87,0.2),0_8px_32px_rgba(0,0,0,0.12)]" : ""}`}>
              <div className="flex items-center px-4 py-1">
                <Search size={18} className="text-white/50 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  placeholder="Search POM charts, defects, fabric terms…"
                  className="flex-1 bg-transparent text-white placeholder-white/40 px-3 py-4 text-base focus:outline-none"
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowDrop(true)}
                  onBlur={() => setTimeout(() => setShowDrop(false), 150)}
                />
                <button className="bg-forest hover:bg-forestL text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex-shrink-0">
                  Search
                </button>
              </div>

              {/* Dropdown */}
              {showDrop && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-hover overflow-hidden z-50">
                  {filtered.slice(0, 5).map((s) => (
                    <a key={s.href} href={s.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-mist transition-colors border-b border-rule last:border-0">
                      <div className="flex-1">
                        <div className="font-semibold text-ink text-sm">{s.label}</div>
                        <div className="text-slateL text-xs">{s.sub}</div>
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-mist text-slateL">{s.badge}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-white/40 text-xs">Popular:</span>
              {["Chest Width", "AQL 2.5", "GSM", "Defects", "Embroidery QC"].map((t) => (
                <button key={t} onClick={() => setQuery(t)}
                  className="text-xs text-white/60 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all">
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-500 grid grid-cols-2 sm:grid-cols-4 gap-px mt-16 bg-white/10 rounded-2xl overflow-hidden">
            {[["500+", "Glossary Terms"], ["50+", "QC Guides"], ["3", "Free Tools"], ["EN+বাং", "Bilingual"]].map(([n, l]) => (
              <div key={l} className="bg-white/5 backdrop-blur-sm px-6 py-5 text-center">
                <div className="font-serif font-black text-3xl text-white">{n}</div>
                <div className="text-white/50 text-xs mt-1 uppercase tracking-wide font-mono">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 sm:h-16 fill-bg">
          <path d="M0,32 C240,60 480,4 720,32 C960,60 1200,8 1440,32 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
