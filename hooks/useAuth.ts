"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  career_goal_id: number | null;
  education_background: string | null;
  interest: string | null;
}

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

/**
 * Cek token yang tersimpan di localStorage itu masih valid dengan cara
 * hit GET /me ke backend. Kalau token nggak ada atau invalid/expired,
 * status jadi "unauthenticated".
 */
export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("pathskill_token")
          : null;

      if (!token) {
        setStatus("unauthenticated");
        return;
      }

      try {
        const res = await api.get<AuthUser>("/me");
        setUser(res.data);
        setStatus("authenticated");
      } catch {
        localStorage.removeItem("pathskill_token");
        setStatus("unauthenticated");
      }
    }
    checkAuth();
  }, []);

  return { status, user };
}
