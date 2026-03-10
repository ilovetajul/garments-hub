// src/components/home/CategoryCards.tsx
import Link from "next/link";
import { Package, CheckSquare, AlertCircle, Heart, Scissors, BookOpen } from "lucide-react";

const CATEGORIES = [
  { label: "POM Charts",     sub: "Measurement specs",    href: "/pom",                 icon: Package,     color: "forest", count: "24 guides" },
  { label: "QC Guides",      sub: "Inspection methods",   href: "/articles?category=qc", icon: CheckSquare, color: "blue",   count: "31 guides" },
  { label: "Defect Library", sub: "Visual QC reference",  href: "/defects",             icon: AlertCircle, color: "red",    count: "100+ defects" },
  { label: "Fabric Guide",   sub: "GSM, types, specs",    href: "/fabric",              icon: Heart,       color: "amber",  count: "45 entries" },
  { label: "Embroidery",     sub: "Stitch QC standards",  href: "/embroidery",          icon: Scissors,    color: "sky",    count: "18 guides" },
  { label: "Glossary",       sub: "500+ EN+বাং terms",    href: "/glossary",            icon: BookOpen,    color: "purple", count: "Browse A–Z" },
];

const colorMap: Record<string, string> = {
  forest: "bg-forestBg group-hover:bg-forest/20 border-forest/20 group-hover:border-forest/40 [&_svg]:stroke-forest",
  blue:   "bg-blue-50  group-hover:bg-blue-100   border-blue-200/50 group-hover:border-blue-300  [&_svg]:stroke-blue-700",
  red:    "bg-red-50   group-hover:bg-red-100    border-red-200/50  group-hover:border-red-300   [&_svg]:stroke-red-700",
  amber:  "bg-amberBg  group-hover:bg-amber/20   border-amber/20    group-hover:border-amber/40  [&_svg]:stroke-amber",
  sky:    "bg-sky-50   group-hover:bg-sky-100    border-sky-200/50  group-hover:border-sky-300   [&_svg]:stroke-sky-700",
  purple: "bg-purple-50 group-hover:bg-purple-100 border-purple-200/50 group-hover:border-purple-300 [&_svg]:stroke-purple-700",
};

export function CategoryCards() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-block font-mono text-xs text-forest tracking-widest uppercase bg-forestBg border border-forest/20 px-3 py-1 rounded-full mb-4">Browse by Topic</div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-ink mb-3">Everything a Garment Professional Needs</h2>
          <p className="text-slateL text-base max-w-xl mx-auto">From raw fabric specs to final QC sign-off.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ label, sub, href, icon: Icon, color, count }) => (
            <Link key={href} href={href}
              className={`group bg-white border rounded-2xl p-5 text-center card-lift hover:border-current transition-all ${colorMap[color]}`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110 duration-300 bg-current/5">
                <Icon size={22} className="transition-colors" />
              </div>
              <div className="font-bold text-ink text-sm mb-1">{label}</div>
              <div className="text-slateL text-xs">{sub}</div>
              <div className="mt-3 font-mono text-[10px] text-slateL tracking-wide">{count} →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
