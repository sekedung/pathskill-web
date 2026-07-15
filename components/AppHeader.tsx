"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/skill-map", label: "Skill Map" },
  { href: "/learning-path", label: "Learning Path" },
];

export default function AppHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      // beri tahu backend supaya token ini di-revoke (bukan cuma dihapus di browser)
      await api.post("/logout");
    } catch {
      // kalaupun request logout ke server gagal (misal token sudah expired),
      // tetap lanjut hapus token lokal & redirect — jangan bikin user
      // terjebak nggak bisa keluar dari sesi yang rusak
    } finally {
      localStorage.removeItem("pathskill_token");
      router.replace("/login");
    }
  }

  return (
    <header className="bg-[#0B1739] border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6 rounded-lg overflow-hidden">
            <div className="bg-red-500" />
            <div className="bg-orange-500" />
            <div className="bg-green-500" />
            <div className="bg-teal-500" />
          </div>
          <span className="text-white font-bold tracking-wide text-xs">
            PATHSKILL
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-xs"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-white/70 hover:text-white text-xs border border-white/20 rounded-lg px-3 py-1.5 disabled:opacity-50"
          >
            {loggingOut ? "..." : "Logout"}
          </button>
        </div>
      </div>

      {/* nav mobile - tampil di bawah bar utama karena layar sempit */}
      <nav className="sm:hidden flex items-center gap-4 px-5 pb-3 -mt-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/60 text-xs"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
