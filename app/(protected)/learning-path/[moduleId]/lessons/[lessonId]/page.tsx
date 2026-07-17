"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import type { ModuleDetailResponse } from "@/types/learning-path";
import DifficultyBadge from "@/components/learning-path/DifficultyBadge";
import ProgressBar from "@/components/learning-path/ProgressBar";

const TYPE_LABEL: Record<string, string> = {
  video: "Video Lesson",
  reading: "Reading",
  quiz: "Quiz",
};

export default function LessonPage() {
  const { moduleId, lessonId } = useParams<{
    moduleId: string;
    lessonId: string;
  }>();
  const router = useRouter();

  const [data, setData] = useState<ModuleDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchModule() {
    try {
      const res = await api.get<ModuleDetailResponse>(
        `/learning-path/${moduleId}`
      );
      setData(res.data);
    } catch {
      setError("Gagal memuat lesson.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, lessonId]);

  const lessonIdNum = Number(lessonId);
  const lessonIndex = useMemo(
    () => data?.lessons.findIndex((l) => l.id === lessonIdNum) ?? -1,
    [data, lessonIdNum]
  );
  const lesson = lessonIndex >= 0 ? data?.lessons[lessonIndex] : undefined;
  const prevLesson =
    data && lessonIndex > 0 ? data.lessons[lessonIndex - 1] : null;
  const nextLesson =
    data && lessonIndex >= 0 && lessonIndex < data.lessons.length - 1
      ? data.lessons[lessonIndex + 1]
      : null;
  const isLastLesson = data && lessonIndex === data.lessons.length - 1;

  async function handleComplete() {
    if (!lesson || lesson.completed) return;
    setCompleting(true);
    setError(null);
    try {
      await api.post(`/lessons/${lesson.id}/complete`);
      const res = await api.get<ModuleDetailResponse>(
        `/learning-path/${moduleId}`
      );
      setData(res.data);
      if (isLastLesson && res.data.module_completed) {
        router.push(`/learning-path/${moduleId}/completed`);
        return;
      }
      if (nextLesson) {
        router.push(`/learning-path/${moduleId}/lessons/${nextLesson.id}`);
      }
    } catch {
      setError("Gagal update progress lesson.");
    } finally {
      setCompleting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center text-[#0B1739]">
        Memuat lesson...
      </div>
    );
  }

  if (!data || !lesson) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center text-gray-500 text-center px-6">
        {error ?? "Lesson tidak ditemukan."}
      </div>
    );
  }

  const remainingHours = Math.max(
    0,
    Math.round(data.estimated_hours * (1 - data.progress_percentage / 100))
  );

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-16">
      <div className="max-w-md mx-auto px-5 pt-8">
        <button
          onClick={() => router.push(`/learning-path/${moduleId}`)}
          className="text-gray-500 text-sm mb-4"
        >
          ← Back to Module
        </button>

        {/* Mini module progress header */}
        <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-[#0B1739] text-sm">
              {data.title}
            </p>
            <span className="text-blue-600 text-xs font-semibold">
              {data.progress_percentage}%
            </span>
          </div>
          <ProgressBar percentage={data.progress_percentage} />
          <p className="text-[11px] text-gray-400 mt-2">
            {remainingHours} Learning Hours Remaining
          </p>
        </div>

        {/* Lesson stepper (pengganti sidebar untuk layar mobile) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-5 px-5 no-scrollbar">
          {data.lessons.map((l, i) => {
            const isActive = l.id === lesson.id;
            const base =
              "shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors";
            const style = l.completed
              ? "bg-green-500 border-green-500 text-white"
              : isActive
              ? "bg-blue-600 border-blue-600 text-white"
              : l.locked
              ? "bg-white border-gray-200 text-gray-300"
              : "bg-white border-blue-200 text-blue-600";

            return l.locked ? (
              <div key={l.id} className={`${base} ${style}`}>
                🔒
              </div>
            ) : (
              <button
                key={l.id}
                onClick={() =>
                  router.push(`/learning-path/${moduleId}/lessons/${l.id}`)
                }
                className={`${base} ${style}`}
              >
                {l.completed ? "✓" : i + 1}
              </button>
            );
          })}
        </div>

        {/* Lesson content */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h1 className="text-lg font-bold text-[#0B1739]">
              {lesson.title.replace(/^Lesson \d+:\s*/, "")}
            </h1>
            <DifficultyBadge level={data.difficulty} />
          </div>
          <p className="text-xs text-gray-400 mb-4">
            ⏱ {lesson.duration_minutes} Minutes · {TYPE_LABEL[lesson.type]}
          </p>

          {lesson.objectives.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-[#0B1739] mb-2">
                Learning Objectives
              </h2>
              <ul className="space-y-1.5">
                {lesson.objectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-blue-500 mt-0.5">●</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.type === "video" && (
            <div className="bg-[#0B1739] rounded-xl flex items-center justify-center py-10 mb-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl">▶</span>
                </div>
                <p className="text-white/70 text-xs">Watch Video</p>
              </div>
            </div>
          )}

          {lesson.content && (
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-2">
              {lesson.content}
            </p>
          )}
        </div>

        {lesson.summary && (
          <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
            <h2 className="text-sm font-semibold text-[#0B1739] mb-2">
              📌 Summary & Key Takeaways
            </h2>
            <p className="text-sm text-gray-600">{lesson.summary}</p>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}

        <button
          onClick={handleComplete}
          disabled={completing || lesson.completed}
          className="w-full bg-blue-600 disabled:opacity-60 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl mb-3"
        >
          {lesson.completed
            ? "✓ Completed"
            : completing
            ? "Menyimpan..."
            : isLastLesson
            ? "Complete Module ✓"
            : "Mark as Complete →"}
        </button>

        <div className="flex justify-between items-center text-xs">
          {prevLesson ? (
            <button
              onClick={() =>
                router.push(`/learning-path/${moduleId}/lessons/${prevLesson.id}`)
              }
              className="text-gray-500 text-left"
            >
              ‹ Previous Lesson
              <p className="text-[#0B1739] font-medium truncate max-w-[140px]">
                {prevLesson.title.replace(/^Lesson \d+:\s*/, "")}
              </p>
            </button>
          ) : (
            <span />
          )}
          {nextLesson && !nextLesson.locked ? (
            <button
              onClick={() =>
                router.push(`/learning-path/${moduleId}/lessons/${nextLesson.id}`)
              }
              className="text-gray-500 text-right"
            >
              Next Lesson ›
              <p className="text-[#0B1739] font-medium truncate max-w-[140px]">
                {nextLesson.title.replace(/^Lesson \d+:\s*/, "")}
              </p>
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
