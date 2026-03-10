import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, ChevronRight } from "lucide-react";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await db.article.findUnique({ where: { slug: params.slug }, include: { seoMeta: true } });
  if (!article) return {};
  return {
    title:       article.seoMeta?.titleTag       ?? `${article.title} | Garments Brain`,
    description: article.seoMeta?.metaDesc       ?? article.summary,
  };
}

export async function generateStaticParams() {
  const articles = await db.article.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } });
  return articles.map((a: { slug: string }) => ({ slug: a.slug }));
}

export const revalidate = 3600;

export default async function ArticleDetailPage({ params }: Props) {
  const article = await db.article.findUnique({
    where:   { slug: params.slug, status: "PUBLISHED" },
    include: { author: true, checklist: { orderBy: { order: "asc" } }, seoMeta: true },
  });
  if (!article) notFound();

  return (
    <div className="pt-24 min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slateL font-mono mb-8">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/articles" className="hover:text-forest transition-colors">Articles</Link>
          <ChevronRight size={12} />
          <span className="text-ink truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Meta strip */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-forestBg text-forest text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-forest/20">
            {article.category}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
            {article.difficulty}
          </span>
          <span className="text-slateL text-xs flex items-center gap-1.5">
            <Clock size={12} /> {article.readTimeMin} min read
          </span>
          {article.publishedAt && (
            <span className="text-slateL text-xs flex items-center gap-1.5">
              <Calendar size={12} /> {formatDate(article.publishedAt)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-ink leading-tight mb-6">{article.title}</h1>

        {/* Summary */}
        <p className="text-lg text-slateL leading-relaxed mb-8 border-l-4 border-forest pl-5">{article.summary}</p>

        {/* Key Takeaways */}
        {article.keyTakeaways.length > 0 && (
          <div className="bg-forestBg border border-forest/20 rounded-2xl p-6 mb-8">
            <h2 className="font-mono text-xs text-forest uppercase tracking-widest mb-4">Key Takeaways</h2>
            <ul className="space-y-2">
              {article.keyTakeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink">
                  <span className="w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article body */}
        <article
          className="prose prose-slate max-w-none mb-10
            prose-headings:font-serif prose-headings:font-black
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-a:text-forest prose-strong:text-ink
            prose-table:text-sm prose-th:bg-forestD prose-th:text-white
            prose-code:font-mono prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: article.body
            .replace(/\n/g, "<br/>")
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
          }}
        />

        {/* Checklist */}
        {article.checklist.length > 0 && (
          <div className="bg-white border border-rule rounded-2xl p-6 mb-8 shadow-card">
            <h2 className="font-serif font-bold text-xl text-ink mb-4">Inspection Checklist</h2>
            <ul className="space-y-2">
              {article.checklist.map((item) => (
                <li key={item.id} className="flex items-start gap-3 text-sm">
                  <span className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 ${item.isCritical ? "border-red-500" : "border-rule"}`} />
                  <span className={item.isCritical ? "text-ink font-semibold" : "text-slate"}>
                    {item.text}
                    {item.isCritical && <span className="ml-2 text-[10px] font-bold text-red-600 uppercase tracking-wide bg-red-50 px-1.5 py-0.5 rounded">Critical</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-4 bg-white border border-rule rounded-xl p-5 shadow-card">
          <div className="w-12 h-12 rounded-full bg-forestBg flex items-center justify-center text-forest font-bold text-lg flex-shrink-0">
            {article.author.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-ink">{article.author.name}</div>
            {article.author.bio && <div className="text-sm text-slateL">{article.author.bio}</div>}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link href="/articles" className="inline-flex items-center gap-2 text-forest hover:text-forestL font-semibold text-sm transition-colors">
            ← Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
