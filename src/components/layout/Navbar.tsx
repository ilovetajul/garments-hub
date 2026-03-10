"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Layers } from "lucide-react";

const navLinks = [
  { href: "/glossary",  label: "Glossary" },
  { href: "/articles",  label: "Articles" },
  { href: "/tools",     label: "Tools" },
  { href: "/courses",   label: "Courses" },
  { href: "/defects",   label: "Defect Library" },
];

export function Navbar() {
  const [open, setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
      <div className="bg-forestD/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center group-hover:bg-forestL transition-colors">
                <Layers size={16} className="text-white" />
              </div>
              <div>
                <div className="font-serif font-bold text-white text-sm leading-none">Garments Brain</div>
                <div className="font-mono text-[9px] text-forest/80 tracking-widest uppercase leading-none mt-0.5">Knowledge Hub</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative text-white/80 hover:text-white text-sm font-medium transition-colors
                             after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-forestL
                             after:transition-all after:duration-200 hover:after:w-full"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <Link href="/search" className="hidden sm:flex text-white/70 hover:text-white transition-colors" aria-label="Search">
                <Search size={18} />
              </Link>
              <Link href="/sign-in" className="hidden sm:block bg-forest hover:bg-forestL text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Sign In
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden text-white/80 hover:text-white p-1"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden border-t border-white/10 overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-white/80 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10">
              <Link href="/sign-in" className="block w-full bg-forest hover:bg-forestL text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
