"use client";

import { useTheme, PALETTES, type Palette } from "@/contexts/theme-context";

const PALETTE_LABELS: Record<Palette, string> = {
  "core":             "Core",
  "editorial-impact": "Impact",
  "editorial-lab":    "Lab",
};

export function PaletteSwitcher() {
  const { palette, setPalette } = useTheme();

  // Dev/preview only — palette control is in the nav for production.
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        fontSize: "0.6875rem",
        fontFamily: "monospace",
        boxShadow: "0 4px 16px color-mix(in srgb, var(--primary) 20%, transparent)",
        minWidth: "6rem",
      }}
    >
      {PALETTES.map((p) => (
        <button
          key={p}
          onClick={() => setPalette(p)}
          style={{
            padding: "0.3rem 0.5rem",
            borderRadius: "0.25rem",
            border: "1px solid",
            cursor: "pointer",
            background: palette === p ? "var(--primary)" : "transparent",
            color: palette === p ? "var(--on-emphasis)" : "var(--fg-muted)",
            borderColor: palette === p ? "var(--primary)" : "var(--border)",
            textAlign: "left",
            fontFamily: "monospace",
            fontSize: "0.6875rem",
            fontWeight: palette === p ? 700 : 400,
            transition: "all 0.15s ease",
          }}
        >
          {PALETTE_LABELS[p]}
        </button>
      ))}
    </div>
  );
}
