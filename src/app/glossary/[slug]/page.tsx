import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = await db.glossaryTerm.findUnique({ where: { slug: params.slug }, include: { seoMeta: true } });
  if (!term) return {};
  return {
    title: term.seoMeta?.titleTag ?? `${term.termEn} — Garments Brain`,
    description: term.seoMeta?.metaDesc ?? term.shortDefEn,
  };
}

export async function generateStaticParams() {
  const terms = await db.glossaryTerm.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } });
  return terms.map((t) => ({ slug: t.slug }));
}

export const revalidate = 3600;

export default async function GlossaryDetailPage({ params }: Props) {
  const term = await db.glossaryTerm.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
    include: { images: true, seoMeta: true },
  });
  if (!term) notFound();

  return (
    <div className="pt-24 min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slateL mb-8 font-mono">
          <a href="/glossary" className="hover:text-forest transition-colors">Glossary</a>
          <span>/</span>
          <span className="text-ink">{term.termEn}</span>
        </div>

        {/* Header */}
        <div className="bg-white border border-rule rounded-2xl p-8 mb-6 shadow-card">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-ink mb-1">{term.termEn}</h1>
              <p className="text-2xl text-slateL">{term.termBn}</p>
              {term.pronunciation && (
                <p className="font-mono text-sm text-slateL mt-1">{term.pronunciation}</p>
              )}
            </div>
            <span className="bg-forestBg text-forest text-sm font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-forest/20">
              {term.termType}
            </span>
          </div>

          {/* Definition */}
          <div className="bg-forestBg border border-forest/20 rounded-xl p-5 mb-4">
            <div className="font-mono text-xs text-forest uppercase tracking-widest mb-2">Definition</div>
            <p className="text-ink text-base leading-relaxed">{term.shortDefEn}</p>
          </div>
          <div className="bg-amberBg border border-amber/20 rounded-xl p-5">
            <div className="font-mono text-xs text-amber uppercase tracking-widest mb-2">সংজ্ঞা (বাংলা)</div>
            <p className="text-ink text-base leading-relaxed">{term.shortDefBn}</p>
          </div>
        </div>

        {/* Tolerance */}
        {term.tolerance && (
          <div className="bg-white border border-rule rounded-2xl p-6 mb-6 shadow-card">
            <h2 className="font-serif font-bold text-xl text-ink mb-4">Tolerance Chart</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(term.tolerance as Record<string, string>).map(([fabric, tol]) => (
                <div key={fabric} className="bg-mist rounded-xl p-4 text-center">
                  <div className="font-mono text-xs text-slateL uppercase tracking-wide mb-1 capitalize">{fabric}</div>
                  <div className="font-serif font-black text-xl text-forest">{tol}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Standard reference */}
        {term.standardRef && (
          <div className="bg-white border border-rule rounded-xl p-5 mb-6 shadow-card flex items-center gap-3">
            <span className="font-mono text-xs text-slateL uppercase tracking-wide">Standard Reference:</span>
            <span className="font-mono text-sm text-forest font-bold">{term.standardRef}</span>
          </div>
        )}

        {/* Back link */}
        <a href="/glossary" className="inline-flex items-center gap-2 text-forest hover:text-forestL font-semibold text-sm transition-colors">
          ← Back to Glossary
        </a>
      </div>
    </div>
  );
}
