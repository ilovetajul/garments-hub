import Link from "next/link";
import { Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forestD text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-forest rounded-lg flex items-center justify-center">
                <Layers size={18} className="text-white" />
              </div>
              <div>
                <div className="font-serif font-bold text-white text-base leading-none">Garments Brain</div>
                <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase leading-none mt-1">Knowledge Hub</div>
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-6">
              The definitive knowledge hub for garment industry QC inspectors, supervisors, and designers.
            </p>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Content</h4>
            <ul className="space-y-2.5">
              {[["Articles", "/articles"], ["Glossary", "/glossary"], ["Defect Library", "/defects"], ["POM Reference", "/pom"], ["Fabric Guide", "/fabric"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-white/65 hover:text-white text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Tools</h4>
            <ul className="space-y-2.5">
              {[["GSM Calculator", "/tools/gsm-calculator"], ["Fabric Consumption", "/tools/fabric-consumption"], ["POM Generator", "/tools/pom-generator"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-white/65 hover:text-white text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
            <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4 mt-6">Courses</h4>
            <ul className="space-y-2.5">
              <li><Link href="/courses" className="text-white/65 hover:text-white text-sm transition-colors">All Courses</Link></li>
              <li><Link href="/courses/qc-embroidery" className="text-white/65 hover:text-white text-sm transition-colors">QC for Embroidery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["About", "/about"], ["Contact", "/contact"], ["Privacy Policy", "/privacy"], ["Terms", "/terms"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-white/65 hover:text-white text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Garments Brain. Built for the global garment industry.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[10px] text-white/40 tracking-wide">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
