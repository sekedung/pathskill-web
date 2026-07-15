"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/layanan", label: "Layanan" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0B1739] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-0.5 w-7 h-7 rounded-lg overflow-hidden">
            <div className="bg-red-500" />
            <div className="bg-orange-500" />
            <div className="bg-green-500" />
            <div className="bg-teal-500" />
          </div>
          <span className="text-white font-bold tracking-wide text-sm">
            PATHSKILL
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-white/80 hover:text-white text-sm"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
          >
            Daftar Gratis
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0B1739] border-t border-white/10 px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white/80 text-sm"
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10" />
          <Link href="/login" onClick={() => setOpen(false)} className="text-white/80 text-sm">
            Masuk
          </Link>
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center"
          >
            Daftar Gratis
          </Link>
        </div>
      )}
    </header>
  );
}
