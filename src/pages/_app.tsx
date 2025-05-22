// pages/_app.tsx
import { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "@/theme/theme";
import { useThemeStore } from "@/store/themeStore";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { mode, setMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";
    if (saved) setMode(saved);
    setMounted(true);
  }, [setMode]);

  if (!mounted) return null; // SSR uyumsuzluğu engeller

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
