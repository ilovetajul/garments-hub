// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="font-serif font-black text-8xl text-forest mb-4">404</div>
        <h1 className="font-serif font-bold text-2xl text-ink mb-3">Page Not Found</h1>
        <p className="text-slateL mb-8">This page doesn&apos;t exist yet — but the knowledge hub is growing every week.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="bg-forest hover:bg-forestL text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            Go to Homepage
          </Link>
          <Link href="/glossary" className="bg-forestBg text-forest hover:bg-forest hover:text-white font-semibold px-6 py-3 rounded-xl border border-forest/20 transition-all">
            Browse Glossary
          </Link>
        </div>
      </div>
    </div>
  );
}
