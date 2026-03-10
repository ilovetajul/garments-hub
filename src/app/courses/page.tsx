import Link from "next/link";
export default function Page() {
  return (
    <div className="pt-24 min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="font-mono text-xs text-forest tracking-widest uppercase bg-forestBg border border-forest/20 px-3 py-1 rounded-full inline-block mb-6">Coming Soon</div>
        <h1 className="font-serif font-black text-3xl text-ink mb-3 capitalize">courses</h1>
        <p className="text-slateL mb-8">This section is under active development. Check back soon!</p>
        <Link href="/" className="bg-forest hover:bg-forestL text-white font-semibold px-6 py-3 rounded-xl transition-colors">← Back to Homepage</Link>
      </div>
    </div>
  );
}
