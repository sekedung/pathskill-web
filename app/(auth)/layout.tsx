"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status, user } = useAuth();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(user?.career_goal_id ? "/dashboard" : "/profile-setup");
    }
  }, [status, user, router]);

  // kalau lagi checking atau ternyata authenticated (mau di-redirect),
  // jangan tampilkan form login/register dulu
  if (status !== "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#0B1739] flex items-center justify-center text-white">
        Memeriksa sesi...
      </div>
    );
  }

  return <>{children}</>;
}
