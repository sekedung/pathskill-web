import Link from "next/link";

const FEATURES = [
  {
    icon: "🗺️",
    title: "Kenali Posisi Skill Kamu",
    desc: "Bandingkan skill yang kamu miliki dengan kebutuhan role di industri.",
  },
  {
    icon: "🛤️",
    title: "Jalur Belajar yang Jelas",
    desc: "Ikuti langkah belajar yang terstruktur sesuai tujuan karier, disusun otomatis oleh AI.",
  },
  {
    icon: "📈",
    title: "Assignment Praktis & Progress",
    desc: "Kerjakan tugas berbasis kasus kerja nyata dan lihat progresmu meningkat.",
  },
];

const PACKAGE_PREVIEW = [
  { name: "Starter", price: "Gratis", highlight: false },
  { name: "Pro", price: "Rp49rb/bln", highlight: true },
  { name: "Career Mentor", price: "Rp199rb/bln", highlight: false },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-[#0B1739] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-teal-400 text-sm font-semibold tracking-wide mb-4">
              UNTUK MAHASISWA & FRESH GRADUATE IT
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-5">
              Skill kamu di mana?
              <br />
              Industri butuhnya apa?
            </h1>
            <p className="text-white/60 text-base mb-8 max-w-md">
              PathSkill memetakan kesenjangan skill kamu terhadap standar
              industri, lalu menyusun jalur belajar personal yang disusun AI —
              bukan kursus generik yang sama untuk semua orang.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl"
              >
                Mulai Gratis →
              </Link>
              <Link
                href="/layanan"
                className="border border-white/20 text-white px-6 py-3 rounded-xl"
              >
                Lihat Paket
              </Link>
            </div>
          </div>

          {/* Signature visual: jalur skill map, echo dari onboarding produk */}
          <div className="relative">
            <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
              <path
                d="M 30 280 Q 100 260, 130 190 T 230 130 T 370 40"
                fill="none"
                stroke="#1E2A5E"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 30 280 Q 100 260, 130 190 T 230 130 T 370 40"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="2 10"
              />
              <defs>
                <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>

              {/* milestone 1: current skill */}
              <circle cx="30" cy="280" r="10" fill="#14b8a6" />
              <text x="48" y="285" fill="#ffffff" fontSize="13" fontWeight="600">
                Skill saat ini
              </text>

              {/* milestone 2: learning */}
              <circle cx="230" cy="130" r="10" fill="#2563eb" />
              <text x="248" y="135" fill="#ffffff" fontSize="13" fontWeight="600">
                Belajar terarah
              </text>

              {/* milestone 3: goal */}
              <circle cx="370" cy="40" r="12" fill="#7c3aed" />
              <text x="330" y="24" fill="#ffffff" fontSize="13" fontWeight="600">
                Siap kerja 🎯
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-[#0B1739] text-3xl font-bold text-center mb-3">
            Bagaimana PathSkill Membantu Kamu
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Tiga langkah sederhana dari "belum tahu harus mulai dari mana"
            sampai punya jalur belajar yang jelas.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-[#0B1739] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-[#0B1739] text-3xl font-bold mb-3">
            Pilih Paket Sesuai Kebutuhanmu
          </h2>
          <p className="text-gray-500 mb-10">
            Mulai gratis, upgrade kapan saja.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {PACKAGE_PREVIEW.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-6 ${
                  p.highlight
                    ? "bg-[#0B1739] text-white"
                    : "bg-white border border-gray-200 text-[#0B1739]"
                }`}
              >
                <p className="font-semibold mb-1">{p.name}</p>
                <p className="text-2xl font-bold">{p.price}</p>
              </div>
            ))}
          </div>
          <Link
            href="/layanan"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Lihat Detail Paket →
          </Link>
        </div>
      </section>
    </div>
  );
}
