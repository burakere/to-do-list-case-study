// src/store/themeStore.ts
import { create } from "zustand";

interface ThemeStore {
  mode: "light" | "dark";
  toggleMode: () => void;
  setMode: (mode: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: (typeof window !== "undefined" && localStorage.getItem("theme")) === "dark" ? "dark" : "light",
  toggleMode: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return { mode: newMode };
    }),
  setMode: (mode) => {
    localStorage.setItem("theme", mode);
    set({ mode });
  },
}));
