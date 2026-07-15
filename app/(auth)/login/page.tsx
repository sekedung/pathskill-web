"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("pathskill_token", res.data.token);

      // kalau user sudah pernah pilih career sebelumnya, langsung ke dashboard,
      // kalau belum, arahkan ke profile setup
      if (res.data.user.career_goal_id) {
        router.push("/dashboard");
      } else {
        router.push("/profile-setup");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? "Email atau password salah."
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
        <h1 className="text-white text-2xl font-bold mb-1">
          Welcome Back 👋🏻
        </h1>
        <p className="text-white/70 text-sm">Akses kembali learning path kamu</p>
      </div>

      <div className="bg-white rounded-t-3xl flex-1 px-6 pt-8 pb-10 max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-[#0B1739] mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
