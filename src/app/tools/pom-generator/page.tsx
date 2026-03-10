import Link from "next/link";
export default function Page() {
  return (
    <div className="pt-24 min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="font-serif font-black text-3xl text-ink mb-3">POM Generator</h1>
        <p className="text-slateL mb-8">Coming Soon!</p>
        <Link href="/tools" className="bg-forest text-white font-semibold px-6 py-3 rounded-xl">← Back to Tools</Link>
      </div>
    </div>
  );
}
