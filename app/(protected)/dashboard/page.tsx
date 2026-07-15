"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import type { DashboardResponse } from "@/types/dashboard";

const STATUS_STYLE: Record<string, string> = {
  successful: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
  submitted: "bg-blue-100 text-blue-700",
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.get<DashboardResponse>("/dashboard");
        setData(res.data);
      } catch {
        setError("Gagal memuat dashboard.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1739] flex items-center justify-center text-white">
        Memuat dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0B1739] flex items-center justify-center text-white/70 text-center px-6">
        {error}
      </div>
    );
  }

  const firstName = data.user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-[#0B1739] pb-16">
      <div className="max-w-md mx-auto px-5 pt-10">
        <h1 className="text-white text-2xl font-bold mb-1">
          Hi, {firstName}! 👋
        </h1>
        <p className="text-white/60 text-sm mb-6">
          Selamat datang kembali di dasbor pembelajaran anda.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <StatCard
            icon="📈"
            label="Overall Progress"
            value={`${data.summary.overall_progress}%`}
          />
          <StatCard
            icon="📘"
            label="Completed Modules"
            value={data.summary.completed_modules}
            valueColor="text-green-600"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon="📄"
            label="Pending Assignments"
            value={data.summary.pending_assignments}
            valueColor="text-purple-600"
          />
          <StatCard
            icon="⏱️"
            label="Weeks Remaining"
            value={data.summary.weeks_remaining}
            valueColor="text-orange-600"
          />
        </div>

        {/* Active Learning Path */}
        <div className="bg-white rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-[#0B1739] flex items-center gap-1">
              🧭 Active Learning Path
            </h2>
            <a href="/learning-path" className="text-blue-600 text-sm">
              View All
            </a>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-purple-600 font-semibold text-sm">
                ✨ Jalur Belajar Rekomendasi AI
              </span>
            </div>
            <p className="text-gray-500 text-xs mb-3">
              Anda sedang mengikuti jalur belajar yang dipersonalisasi
              berdasarkan analisis skill assessment dan kebutuhan industri.
            </p>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>
                {data.active_learning_path.modules_completed} of{" "}
                {data.active_learning_path.total_modules} modules completed
              </span>
              <span>{data.active_learning_path.progress_percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-purple-600 h-1.5 rounded-full"
                style={{ width: `${data.active_learning_path.progress_percentage}%` }}
              />
            </div>
          </div>

          {data.active_learning_path.modules.map((module) => (
            <a
              key={module.id}
              href={`/learning-path/${module.id}`}
              className="flex justify-between items-center border border-gray-100 rounded-xl p-3 mb-2 last:mb-0"
            >
              <div>
                <p className="text-sm font-medium text-[#0B1739]">
                  {module.title}
                </p>
                <p className="text-xs text-gray-400">
                  {module.total_lessons} lessons · {module.total_assignments}{" "}
                  assignments
                </p>
              </div>
              <span className="text-gray-400">›</span>
            </a>
          ))}
        </div>

        {/* Assignments to Complete */}
        <div className="bg-white rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-[#0B1739] mb-3">
            📄 Assignments to Complete
          </h2>
          {data.assignments_to_complete.length === 0 && (
            <p className="text-gray-400 text-sm">Tidak ada assignment.</p>
          )}
          {data.assignments_to_complete.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-center border-b border-gray-100 py-3 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-[#0B1739]">
                  {a.title}
                </p>
                <p className="text-xs text-gray-400">{a.module_title}</p>
                {a.due_date && (
                  <p className="text-xs text-gray-400">Due: {a.due_date}</p>
                )}
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLE[a.status]}`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>

        {/* Profile */}
        <div className="bg-white rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {firstName[0]}
            </div>
            <div>
              <p className="font-medium text-[#0B1739]">{data.user.name}</p>
              <p className="text-xs text-gray-400">{data.user.email}</p>
            </div>
          </div>
          <hr className="my-3 border-gray-100" />
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Education</span>
            <span className="text-[#0B1739]">
              {data.user.education_background ?? "-"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Career Goal</span>
            <span className="text-[#0B1739]">{data.user.career_goal}</span>
          </div>
        </div>

        {/* Learning Tip */}
        <div className="bg-blue-600 rounded-2xl p-4 text-white text-sm">
          💡 <span className="font-semibold">Learning Tip</span>
          <p className="mt-1 text-white/90">
            Konsistensi adalah kunci! Cobalah untuk menyelesaikan setidaknya
            satu pelajaran setiap hari untuk mempertahankan momentum dan
            mencapai tujuan Anda lebih cepat.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  valueColor = "text-blue-600",
}: {
  icon: string;
  label: string;
  value: string | number;
  valueColor?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 text-xs">{label}</span>
        <span>{icon}</span>
      </div>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
