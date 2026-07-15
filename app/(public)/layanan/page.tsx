import { buildWhatsAppLink } from "@/lib/site-config";

const PACKAGES = [
  {
    icon: "🌱",
    name: "Starter",
    price: "Gratis",
    period: "",
    description: "Cocok untuk kamu yang baru mau mulai mengenali skill gap.",
    features: [
      "1x Skill Assessment",
      "1 Learning Path dasar (non-AI)",
      "Akses komunitas belajar",
      "Dashboard progress dasar",
    ],
    highlight: false,
  },
  {
    icon: "🚀",
    name: "Pro",
    price: "Rp49.000",
    period: "/bulan",
    description: "Untuk yang serius mengejar target karier dalam beberapa bulan.",
    features: [
      "Unlimited Skill Assessment",
      "Learning Path personalisasi AI (Groq)",
      "Semua modul & assignment praktis",
      "Sertifikat penyelesaian modul",
      "Dashboard progress lengkap",
    ],
    highlight: true,
  },
  {
    icon: "🎯",
    name: "Career Mentor",
    price: "Rp199.000",
    period: "/bulan",
    description: "Dampingan personal biar nggak salah arah dan lebih cepat siap kerja.",
    features: [
      "Semua fitur Pro",
      "1:1 mentoring session (2x/bulan)",
      "Review portfolio & CV",
      "Prioritas job-matching partner",
      "Grup diskusi eksklusif mentor",
    ],
    highlight: false,
  },
];

export default function LayananPage() {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h1 className="text-[#0B1739] text-3xl md:text-4xl font-bold mb-3">
            Paket Layanan PathSkill
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Pilih paket yang sesuai dengan seberapa serius kamu mau
            mempercepat kesiapan kerja di bidang IT.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl p-6 flex flex-col ${
                pkg.highlight
                  ? "bg-[#0B1739] text-white ring-2 ring-purple-500"
                  : "bg-white border border-gray-200 text-[#0B1739]"
              }`}
            >
              {pkg.highlight && (
                <span className="self-start bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Paling Populer
                </span>
              )}
              <div className="text-4xl mb-4">{pkg.icon}</div>
              <h2 className="text-xl font-bold mb-1">{pkg.name}</h2>
              <p
                className={`text-sm mb-4 ${
                  pkg.highlight ? "text-white/60" : "text-gray-500"
                }`}
              >
                {pkg.description}
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold">{pkg.price}</span>
                <span
                  className={pkg.highlight ? "text-white/60" : "text-gray-400"}
                >
                  {pkg.period}
                </span>
              </div>

              <ul className="space-y-2 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span
                      className={
                        pkg.highlight ? "text-teal-400" : "text-teal-600"
                      }
                    >
                      ✓
                    </span>
                    <span className={pkg.highlight ? "text-white/80" : "text-gray-600"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={buildWhatsAppLink(
                  `Halo, saya ingin memesan paket ${pkg.name} PathSkill.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center font-semibold py-3 rounded-xl transition-colors ${
                  pkg.highlight
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-[#0B1739] text-white hover:bg-[#0B1739]/90"
                }`}
              >
                Pesan via WhatsApp
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
          Butuh paket khusus untuk kampus/kelompok belajar? {" "}
          <a
            href={buildWhatsAppLink("Halo, saya ingin tanya paket khusus untuk kampus/kelompok.")}
            className="text-blue-600 underline"
          >
            Hubungi kami
          </a>
        </p>
      </div>
    </div>
  );
}
