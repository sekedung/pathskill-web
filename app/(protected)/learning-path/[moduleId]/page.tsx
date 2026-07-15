"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import type { ModuleDetailResponse } from "@/types/learning-path";

const STATUS_STYLE: Record<string, string> = {
  successful: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
  submitted: "bg-blue-100 text-blue-700",
};

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const router = useRouter();

  const [data, setData] = useState<ModuleDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchModule() {
    try {
      const res = await api.get<ModuleDetailResponse>(
        `/learning-path/${moduleId}`
      );
      setData(res.data);
    } catch {
      setError("Gagal memuat detail modul.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchModule();
  }, [moduleId]);

  async function handleCompleteLesson(lessonId: number) {
    setBusyId(lessonId);
    try {
      await api.post(`/lessons/${lessonId}/complete`);
      await fetchModule();
    } catch {
      setError("Gagal update progress lesson.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleSubmitAssignment(assignmentId: number) {
    setBusyId(assignmentId);
    try {
      await api.post(`/assignments/${assignmentId}/submit`);
      await fetchModule();
    } catch {
      setError("Gagal submit assignment.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1739] flex items-center justify-center text-white">
        Memuat modul...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B1739] flex items-center justify-center text-white/70">
        {error ?? "Modul tidak ditemukan."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1739] pb-16">
      <div className="max-w-md mx-auto px-5 pt-8">
        <button
          onClick={() => router.push("/learning-path")}
          className="text-white/70 text-sm mb-4"
        >
          ← Back to Learning Path
        </button>

        <div className="bg-white rounded-2xl p-5 mb-4">
          <h1 className="text-xl font-bold text-[#0B1739] mb-1">
            {data.title}
          </h1>
          {data.description && (
            <p className="text-gray-500 text-sm mb-3">{data.description}</p>
          )}
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Module Progress</span>
            <span>{data.progress_percentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${data.progress_percentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-[#0B1739] mb-3">📖 Lessons</h2>
          {data.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-[#0B1739]">
                  {lesson.title}
                </p>
                <p className="text-xs text-gray-400">
                  {lesson.duration_minutes} min
                </p>
              </div>
              <button
                onClick={() => handleCompleteLesson(lesson.id)}
                disabled={busyId === lesson.id}
                className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg disabled:opacity-50"
              >
                {lesson.type}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-[#0B1739] mb-3">📝 Assignments</h2>
          {data.assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border-b border-gray-100 py-3 last:border-0"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-[#0B1739]">
                  {assignment.title}
                </p>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ml-2 ${STATUS_STYLE[assignment.status]}`}
                >
                  {assignment.status}
                </span>
              </div>
              {assignment.description && (
                <p className="text-xs text-gray-400 mb-1">
                  {assignment.description}
                </p>
              )}
              {assignment.due_date && (
                <p className="text-xs text-gray-400 mb-2">
                  Due: {assignment.due_date}
                </p>
              )}
              <button
                onClick={() => handleSubmitAssignment(assignment.id)}
                disabled={
                  busyId === assignment.id || assignment.status === "successful"
                }
                className="text-xs bg-blue-600 disabled:bg-gray-300 text-white px-3 py-1.5 rounded-lg"
              >
                ⬆ Upload Assignment
              </button>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
