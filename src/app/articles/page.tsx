// src/app/articles/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Garment QC Articles & Guides",
  description: "In-depth articles on POM measurement, QC inspection, fabric testing, embroidery standards, and garment defect classification.",
};
export const revalidate = 3600;

const BADGE: Record<string, string> = {
  POM:        "bg-forestBg text-forest",
  QC:         "bg-blue-100 text-blue-800",
  FABRIC:     "bg-amberBg text-amber",
  EMBROIDERY: "bg-sky-100 text-sky-700",
  DEFECTS:    "bg-red-100 text-red-700",
  SEWING:     "bg-purple-100 text-purple-700",
  STANDARDS:  "bg-gray-100 text-gray-700",
};

export default async function ArticlesPage() {
  const articles = await db.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: { id: true, title: true, slug: true, summary: true, category: true, difficulty: true, readTimeMin: true, publishedAt: true, author: { select: { name: true } } },
  });

  return (
    <div className="pt-24 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <div className="font-mono text-xs text-forest tracking-widest uppercase bg-forestBg border border-forest/20 px-3 py-1 rounded-full inline-block mb-4">Knowledge Base</div>
          <h1 className="font-serif font-black text-4xl text-ink mb-3">Garment QC Articles &amp; Guides</h1>
          <p className="text-slateL text-lg max-w-2xl">In-depth guides for QC inspectors, supervisors, and designers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <article key={a.id} className="bg-white border border-rule rounded-2xl overflow-hidden card-lift group">
              <div className={`h-1.5 w-full ${a.category === "POM" ? "bg-forest" : a.category === "QC" ? "bg-blue-700" : a.category === "FABRIC" ? "bg-amber" : "bg-purple-600"}`} />
              <div className="p-5">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${BADGE[a.category] ?? "bg-gray-100 text-gray-700"}`}>{a.category}</span>
                  <span className="ml-auto text-xs text-slateL flex items-center gap-1"><Clock size={11} />{a.readTimeMin} min</span>
                </div>
                <h2 className="font-serif font-bold text-base text-ink mb-2 group-hover:text-forest transition-colors leading-snug">
                  <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                </h2>
                <p className="text-slateL text-sm leading-relaxed line-clamp-2 mb-4">{a.summary}</p>
                <div className="flex items-center justify-between text-xs text-slateL">
                  <span>{a.author.name}</span>
                  {a.publishedAt && <time dateTime={a.publishedAt.toISOString()}>{formatDate(a.publishedAt)}</time>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20 text-slateL">No articles published yet. Check back soon!</div>
        )}
      </div>
    </div>
  );
}
