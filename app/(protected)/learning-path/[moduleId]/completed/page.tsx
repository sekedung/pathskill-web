"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import type { ModuleDetailResponse } from "@/types/learning-path";
import DifficultyBadge from "@/components/learning-path/DifficultyBadge";

export default function ModuleCompletedPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const router = useRouter();

  const [data, setData] = useState<ModuleDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModule() {
      try {
        const res = await api.get<ModuleDetailResponse>(
          `/learning-path/${moduleId}`
        );
        setData(res.data);
        // kalau ternyata modul belum selesai (misal user akses URL langsung),
        // balikin ke halaman overview modul
        if (!res.data.module_completed) {
          router.replace(`/learning-path/${moduleId}`);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center text-[#0B1739]">
        Memuat...
      </div>
    );
  }

  const completionDate = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const assignment = data.assignments[0];

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-16">
      <div className="max-w-md mx-auto px-5 pt-8">
        <button
          onClick={() => router.push(`/learning-path/${moduleId}`)}
          className="text-gray-500 text-sm mb-4"
        >
          ← Back to Module
        </button>

        <div className="bg-white rounded-2xl p-6 mb-4 text-center shadow-sm">
          <DifficultyBadge level={data.difficulty} />
          <p className="text-xs text-gray-400 mt-2 mb-1">{data.title}</p>
          <div className="text-6xl my-4">🎓</div>
          <h1 className="text-xl font-bold text-[#0B1739] mb-1">
            Module Completed
          </h1>
          <p className="text-gray-500 text-sm mb-5">
            Selamat! Anda telah menyelesaikan seluruh materi pada module ini.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center mb-5">
            <div>
              <p className="font-bold text-blue-600">{data.total_lessons}</p>
              <p className="text-[10px] text-gray-400">Total Lessons</p>
            </div>
            <div>
              <p className="font-bold text-purple-600">
                {data.estimated_hours}
              </p>
              <p className="text-[10px] text-gray-400">Learning Hours</p>
            </div>
            <div>
              <p className="font-bold text-green-600">{completionDate}</p>
              <p className="text-[10px] text-gray-400">Completion Date</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div className="bg-green-500 h-1.5 rounded-full w-full" />
          </div>
          <p className="text-[11px] text-green-600 font-medium">
            Status bar 100% ✓
          </p>
        </div>

        {assignment && (
          <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-400">
                📝 Assignment
              </span>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                ✅ Unlocked
              </span>
            </div>
            <p className="font-bold text-[#0B1739] mb-2">
              {assignment.title}
            </p>
            <div className="flex items-center gap-2">
              <DifficultyBadge level={assignment.difficulty} />
              <span className="text-xs text-gray-400">
                ⏱ {assignment.estimated_hours} Hours
              </span>
              <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full ml-auto">
                ✅ Available
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/learning-path")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl"
        >
          Back to Learning Path
        </button>
      </div>
    </div>
  );
}
