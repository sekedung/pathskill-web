import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

export default function PublicFooter() {
  return (
    <footer className="bg-[#0B1739] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6 rounded-lg overflow-hidden">
              <div className="bg-red-500" />
              <div className="bg-orange-500" />
              <div className="bg-green-500" />
              <div className="bg-teal-500" />
            </div>
            <span className="text-white font-bold tracking-wide text-sm">
              PATHSKILL
            </span>
          </div>
          <p className="text-white/50 text-sm">
            Bandingkan skill kamu dengan kebutuhan industri, dan ikuti jalur
            belajar yang dipersonalisasi AI untuk siap kerja di bidang IT.
          </p>
        </div>

        <div>
          <p className="text-white text-sm font-semibold mb-3">Navigasi</p>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/layanan">Layanan</Link></li>
            <li><Link href="/tentang">Tentang Kami</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-semibold mb-3">Hubungi Kami</p>
          <ul className="space-y-2 text-sm text-white/60">
            <li>{SITE_CONFIG.email}</li>
            <li>{SITE_CONFIG.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} {SITE_CONFIG.businessName}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
