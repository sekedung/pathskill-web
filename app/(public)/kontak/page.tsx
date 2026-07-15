"use client";

import { useState } from "react";
import api from "@/lib/api";
import { SITE_CONFIG, buildWhatsAppLink } from "@/lib/site-config";

export default function KontakPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-[#0B1739] text-3xl font-bold mb-3">
            Hubungi Kami
          </h1>
          <p className="text-gray-500 mb-8">
            Ada pertanyaan soal paket, kerja sama kampus, atau butuh bantuan
            teknis? Chat langsung via WhatsApp untuk respons paling cepat.
          </p>

          <a
            href={buildWhatsAppLink("Halo, saya ingin bertanya soal PathSkill.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl mb-8"
          >
            💬 Chat via WhatsApp
          </a>

          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-[#0B1739]">Email:</span>{" "}
              {SITE_CONFIG.email}
            </p>
            <p>
              <span className="font-semibold text-[#0B1739]">Lokasi:</span>{" "}
              {SITE_CONFIG.address}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="font-bold text-[#0B1739] mb-4">Atau Kirim Pesan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Nama</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">
                No. HP (opsional)
              </label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 block mb-1">Pesan</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
              />
            </div>

            {status === "sent" && (
              <p className="text-green-600 text-sm">
                Pesan berhasil dikirim. Kami akan segera menghubungi Anda.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm">
                Gagal mengirim pesan. Coba lagi.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#0B1739] disabled:opacity-50 text-white font-semibold py-3 rounded-xl"
            >
              {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
