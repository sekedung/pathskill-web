"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AppHeader from "@/components/AppHeader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // tampilkan loading singkat selagi validasi token ke backend,
  // supaya konten protected nggak "kelihatan sekilas" sebelum redirect
  if (status === "checking") {
    return (
      <div className="min-h-screen bg-[#0B1739] flex items-center justify-center text-white">
        Memeriksa sesi...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // sudah di-redirect lewat useEffect di atas
  }

  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}