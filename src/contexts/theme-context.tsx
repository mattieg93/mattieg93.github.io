"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";
export type Palette = "core" | "editorial-impact" | "editorial-lab";

export const PALETTES: Palette[] = ["core", "editorial-impact", "editorial-lab"];

interface ThemeContextType {
  theme: Theme;
  palette: Palette;
  toggleTheme: () => void;
  setPalette: (palette: Palette) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyToDOM(theme: Theme, palette: Palette) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-palette", palette);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to dark to match CSS :root token defaults
  const [theme, setTheme] = useState<Theme>("dark");
  const [palette, setPaletteState] = useState<Palette>("core");

  useEffect(() => {
    // URL param takes precedence for shareable palette previews
    const urlParams = new URLSearchParams(window.location.search);
    const urlPalette = urlParams.get("palette") as Palette | null;

    const resolvedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    const resolvedPalette =
      urlPalette && PALETTES.includes(urlPalette)
        ? urlPalette
        : ((localStorage.getItem("palette") as Palette) || "editorial-impact");

    setTheme(resolvedTheme);
    setPaletteState(resolvedPalette);
    applyToDOM(resolvedTheme, resolvedPalette);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyToDOM(newTheme, palette);
  };

  const setPalette = (newPalette: Palette) => {
    setPaletteState(newPalette);
    localStorage.setItem("palette", newPalette);
    applyToDOM(theme, newPalette);
  };

  return (
    <ThemeContext.Provider value={{ theme, palette, toggleTheme, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}