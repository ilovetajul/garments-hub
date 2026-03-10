import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Garment Industry Glossary — 500+ Terms EN+বাং",
  description: "Complete A–Z garment industry terminology in English and Bengali. POM, QC, Fabric, and Sewing terms with full definitions and tolerance charts.",
};

export const revalidate = 3600;

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function GlossaryPage({
  searchParams,
}: {
  searchParams: { letter?: string; type?: string };
}) {
  const { letter, type } = searchParams;

  const terms = await db.glossaryTerm.findMany({
    where: {
      status: "PUBLISHED",
      ...(letter ? { termEn: { startsWith: letter, mode: "insensitive" } } : {}),
      ...(type   ? { termType: type as any } : {}),
    },
    select: { id: true, termEn: true, termBn: true, slug: true, termType: true, shortDefEn: true },
    orderBy: { termEn: "asc" },
  });

  return (
    <div className="pt-24 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-forest tracking-widest uppercase bg-forestBg border border-forest/20 px-3 py-1 rounded-full inline-block mb-4">Bilingual Glossary</div>
          <h1 className="font-serif font-black text-4xl text-ink mb-3">Garment Industry Glossary</h1>
          <p className="text-slateL text-lg">500+ terms in English and বাংলা — POM, QC, Fabric, Sewing, and Standards.</p>
        </div>

        {/* A–Z filter */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <Link href="/glossary"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${!letter ? "bg-forest text-white" : "bg-white border border-rule text-slateL hover:border-forest hover:text-forest"}`}>
            All
          </Link>
          {ALPHABET.map((l: string) => (
            <Link key={l} href={`/glossary?letter=${l}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${letter === l ? "bg-forest text-white" : "bg-white border border-rule text-slateL hover:border-forest hover:text-forest"}`}>
              {l}
            </Link>
          ))}
        </div>

        {/* Terms grid */}
        {terms.length === 0 ? (
          <div className="text-center py-20 text-slateL">No terms found for this selection.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {terms.map((term) => (
              <Link key={term.id} href={`/glossary/${term.slug}`}
                className="bg-white border border-rule rounded-xl px-5 py-4 hover:border-forest/30 hover:shadow-card transition-all group card-lift">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="font-bold text-ink text-base group-hover:text-forest transition-colors">{term.termEn}</div>
                    <div className="text-slateL text-sm">{term.termBn}</div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-forestBg text-forest flex-shrink-0 mt-1">{term.termType}</span>
                </div>
                <p className="text-slateL text-xs leading-relaxed line-clamp-2">{term.shortDefEn}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
