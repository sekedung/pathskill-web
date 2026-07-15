"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/register", { name, email, password });
      localStorage.setItem("pathskill_token", res.data.token);
      // user baru daftar selalu diarahkan ke profile setup dulu (belum punya career_goal)
      router.push("/profile-setup");
    } catch (err: any) {
      const messages = err.response?.data?.errors;
      setError(
        messages
          ? Object.values(messages).flat().join(" ")
          : "Gagal mendaftar. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1739] to-[#1E2A5E] flex flex-col">
      <div className="max-w-md w-full mx-auto px-6 pt-16 pb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="grid grid-cols-2 gap-0.5 w-12 h-12 rounded-xl overflow-hidden">
            <div className="bg-red-500" />
            <div className="bg-orange-500" />
            <div className="bg-green-500" />
            <div className="bg-teal-500" />
          </div>
        </div>
        <p className="text-white/80 font-bold tracking-wide text-sm mb-8">
          PATHSKILL
        </p>
        <h1 className="text-white text-2xl font-bold mb-1">Buat Akun Baru!</h1>
        <p className="text-white/70 text-sm">Akses kembali learning path kamu</p>
      </div>

      <div className="bg-white rounded-t-3xl flex-1 px-6 pt-8 pb-10 max-w-md w-full mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 block mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B1739]"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-green-600"
            />
            Ingat saya
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3B4A9C] disabled:bg-[#3B4A9C]/50 text-white font-semibold py-3 rounded-xl mt-2"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
