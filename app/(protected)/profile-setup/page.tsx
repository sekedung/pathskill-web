"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import type { Career } from "@/types/skill";

export default function ProfileSetupPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);
  const [educationBackground, setEducationBackground] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCareers() {
      try {
        const res = await api.get<{ data: Career[] }>("/careers");
        setCareers(res.data.data);
      } catch {
        setError("Gagal memuat daftar karier.");
      } finally {
        setLoading(false);
      }
    }
    fetchCareers();
  }, []);

  async function handleContinue() {
    if (!selectedCareerId) {
      setError("Pilih salah satu karier tujuan dulu.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // simpan career goal + info tambahan profil
      await api.post(`/careers/${selectedCareerId}/select`, {
        education_background: educationBackground,
        interest,
      });
      router.push(`/skill-assessment/${selectedCareerId}`);
    } catch {
      setError("Gagal menyimpan pilihan karier. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1739] flex items-center justify-center text-white">
        Memuat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1739] pb-28">
      <div className="max-w-md mx-auto px-5 pt-10">
        <h1 className="text-white text-2xl font-bold mb-1">
          Ceritakan Tentang Diri Anda
        </h1>
        <p className="text-white/70 text-sm mb-6">
          Bantu kami mempersonalisasi perjalanan pembelajaran Anda.
        </p>

        <div className="bg-white rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-[#0B1739] mb-4">👤 Informasi Dasar</h2>

          <label className="text-sm text-gray-700 block mb-1">
            Latar Belakang Pendidikan
          </label>
          <input
            type="text"
            placeholder="contohnya, Sarjana Ilmu Komputer"
            value={educationBackground}
            onChange={(e) => setEducationBackground(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
          />

          <label className="text-sm text-gray-700 block mb-1">Minat</label>
          <textarea
            placeholder="Ceritakan tentang minat Anda dan apa yang membuat Anda bersemangat."
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
          />
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-[#0B1739] mb-4">
            🎯 Pilih Karier Anda Tujuan
          </h2>

          {careers.map((career) => (
            <button
              key={career.id}
              onClick={() => setSelectedCareerId(career.id)}
              className={`w-full text-left border rounded-xl p-4 mb-3 last:mb-0 transition-colors ${
                selectedCareerId === career.id
                  ? "border-[#0B1739] bg-[#0B1739]/5"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{career.icon}</span>
                <div>
                  <p className="font-semibold text-[#0B1739] text-sm">
                    {career.name}
                  </p>
                  {career.description && (
                    <p className="text-gray-500 text-xs mt-0.5">
                      {career.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mb-2">{error}</p>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0B1739] border-t border-white/10 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={submitting}
            className="w-full bg-blue-600 disabled:bg-blue-600/50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {submitting ? "Menyimpan..." : "Continue to Skill Assessment"}
            {!submitting && <span>→</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
