import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

// sisipkan token Sanctum ke setiap request kalau sudah login
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("pathskill_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// kalau token expired/invalid, lempar balik ke halaman login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("pathskill_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
