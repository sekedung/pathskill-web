export default function TentangPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-5 py-16">
        <h1 className="text-[#0B1739] text-3xl md:text-4xl font-bold mb-6">
          Tentang PathSkill
        </h1>

        <div className="prose text-gray-600 space-y-5 max-w-none">
          <p>
            Banyak mahasiswa dan fresh graduate IT di Indonesia lulus dengan
            skillset yang belum tentu selaras dengan apa yang dicari
            industri. Bukan karena kurang belajar — tapi karena nggak ada
            cara mudah untuk tahu <em>di mana posisi skill mereka sekarang</em>{" "}
            dibanding standar yang dibutuhkan.
          </p>
          <p>
            PathSkill dibuat untuk menutup gap itu. Kami membantu kamu
            memetakan skill yang sudah dimiliki, membandingkannya dengan
            kebutuhan role incaran (Full Stack Developer, Backend Developer,
            UI/UX Designer, DevOps Engineer, atau Data Analyst), lalu
            menyusun jalur belajar yang benar-benar personal — disusun oleh
            AI berdasarkan hasil assessment kamu sendiri, bukan kurikulum
            generik yang sama untuk semua orang.
          </p>

          <h2 className="text-[#0B1739] text-xl font-bold mt-8 mb-3">
            Misi Kami
          </h2>
          <p>
            Membuat proses "siap kerja" di bidang IT jadi lebih terukur dan
            terarah untuk mahasiswa dan fresh graduate Indonesia — dengan
            data, bukan tebak-tebakan.
          </p>

          <h2 className="text-[#0B1739] text-xl font-bold mt-8 mb-3">
            Untuk Siapa PathSkill
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mahasiswa IT yang ingin tahu kesiapan kerjanya sejak dini</li>
            <li>Fresh graduate yang bingung mulai belajar dari mana</li>
            <li>Siapa pun yang mau pindah jalur karier ke bidang IT</li>
          </ul>

          <h2 className="text-[#0B1739] text-xl font-bold mt-8 mb-3">
            Tim
          </h2>
          <p>
            PathSkill dikembangkan sebagai proyek pembelajaran oleh mahasiswa
            D3 Teknik Informatika, dengan fokus penerapan arsitektur fullstack
            modern (Laravel API + Next.js) dan integrasi AI untuk
            personalisasi pembelajaran.
          </p>
        </div>
      </div>
    </div>
  );
}
