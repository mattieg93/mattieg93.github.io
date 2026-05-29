"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, PALETTES, type Palette } from "@/contexts/theme-context";

const PALETTE_LABELS: Record<Palette, string> = {
  "core":             "Core",
  "editorial-impact": "Impact",
  "editorial-lab":    "Lab",
};

const SWATCH_VAR: Record<Palette, string> = {
  "core":             "var(--swatch-core)",
  "editorial-impact": "var(--swatch-editorial-impact)",
  "editorial-lab":    "var(--swatch-editorial-lab)",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  const paletteRefMobile = useRef<HTMLDivElement>(null);
  const { theme, palette, toggleTheme, setPalette } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const activeIndex = navItems.findIndex((item) => isActive(item.href));
  const indexLabel = `${String(Math.max(activeIndex, 0) + 1).padStart(2, "0")} / ${String(navItems.length).padStart(2, "0")}`;

  // Close overlay on ESC + route change
  useEffect(() => {
    if (!isOverlayOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOverlayOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOverlayOpen]);

  // Close palette popover on ESC or outside click
  useEffect(() => {
    if (!isPaletteOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsPaletteOpen(false); };
    const onOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = paletteRef.current?.contains(target);
      const insideMobile  = paletteRefMobile.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsPaletteOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    // Use click (not mousedown) so React's onClick handlers fire first on the
    // popover's own buttons before the outside-detection runs.
    document.addEventListener("click", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onOutside);
    };
  }, [isPaletteOpen]);

  useEffect(() => {
    setIsOverlayOpen(false);
    setIsMenuOpen(false);
    setIsPaletteOpen(false);
  }, [pathname]);

  // Lock scroll while overlay open
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 backdrop-blur-sm"
        style={{
          background: `color-mix(in srgb, var(--bg) 90%, transparent)`,
          borderBottom: `1px solid var(--border-subtle)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Wordmark — no period */}
            <Link
              href="/"
              className="text-xl font-bold tracking-tight transition-colors duration-200"
              style={{ color: "var(--fg)" }}
            >
              Mattie
            </Link>

            {/* Desktop nav links with left-accent active state */}
            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link relative text-sm font-medium transition-colors duration-200"
                    style={{
                      color: active ? "var(--fg)" : "var(--fg-muted)",
                      paddingLeft: active ? "0.5rem" : "0",
                      borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                    }}
                    data-active={active}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Editorial index pill */}
              <span
                className="text-[0.6875rem] font-semibold uppercase px-2 py-0.5"
                style={{
                  color: "var(--fg-subtle)",
                  letterSpacing: "0.1em",
                  fontVariantNumeric: "tabular-nums",
                  border: "1px solid var(--border-subtle)",
                }}
                aria-hidden="true"
              >
                {indexLabel}
              </span>
            </div>

            {/* Right side: theme+palette toggle + Menu + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Combined theme + palette trigger */}
              <div ref={paletteRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setIsPaletteOpen((v) => !v)}
                  className="p-2 flex items-center gap-1.5 transition-colors duration-200"
                  style={{ color: "var(--fg-muted)" }}
                  aria-label="Appearance settings"
                  aria-expanded={isPaletteOpen}
                >
                  {/* Palette swatch dot */}
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: SWATCH_VAR[palette],
                      flexShrink: 0,
                    }}
                  />
                  {/* Sun / Moon */}
                  {theme === "dark" ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* Flip-in popover */}
                {isPaletteOpen && (
                  <div
                    className="palette-popover"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 0.5rem)",
                      right: 0,
                      minWidth: "9rem",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.375rem",
                      padding: "0.375rem",
                      zIndex: 100,
                      boxShadow: "0 8px 24px color-mix(in srgb, var(--fg) 8%, transparent)",
                    }}
                  >
                    {PALETTES.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setPalette(p); setIsPaletteOpen(false); }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          width: "100%",
                          padding: "0.35rem 0.5rem",
                          borderRadius: "0.25rem",
                          border: "none",
                          cursor: "pointer",
                          background: palette === p ? "color-mix(in srgb, var(--primary) 12%, transparent)" : "transparent",
                          color: palette === p ? "var(--fg)" : "var(--fg-muted)",
                          fontSize: "0.75rem",
                          fontWeight: palette === p ? 700 : 400,
                          textAlign: "left",
                          transition: "background 120ms ease, color 120ms ease",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: SWATCH_VAR[p],
                            flexShrink: 0,
                            outline: palette === p ? "2px solid var(--primary)" : "none",
                            outlineOffset: "2px",
                          }}
                        />
                        {PALETTE_LABELS[p]}
                      </button>
                    ))}

                    <div style={{ borderTop: "1px solid var(--border-subtle)", margin: "0.375rem 0" }} />

                    <button
                      onClick={() => { toggleTheme(); setIsPaletteOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        width: "100%",
                        padding: "0.35rem 0.5rem",
                        borderRadius: "0.25rem",
                        border: "none",
                        cursor: "pointer",
                        background: "transparent",
                        color: "var(--fg-muted)",
                        fontSize: "0.75rem",
                        textAlign: "left",
                        transition: "background 120ms ease",
                      }}
                    >
                      {theme === "dark" ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      )}
                      {theme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                  </div>
                )}
              </div>

              {/* Menu button — opens overlay */}
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="text-[0.6875rem] font-semibold uppercase px-3 py-2 transition-colors duration-200"
                style={{
                  color: "var(--fg-muted)",
                  letterSpacing: "0.15em",
                  border: "1px solid var(--border)",
                }}
                aria-label="Open editorial menu"
              >
                Menu
              </button>

              <Link
                href="/contact"
                className="btn-accent text-sm"
                style={{ fontSize: "0.875rem", padding: "0.4rem 1rem", borderRadius: 0 }}
              >
                Let&#39;s Talk
              </Link>
            </div>

            {/* Mobile: palette+theme trigger + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <div ref={paletteRefMobile} style={{ position: "relative" }}>
                <button
                  onClick={() => setIsPaletteOpen((v) => !v)}
                  className="p-2 flex items-center gap-1.5"
                  style={{ color: "var(--fg-muted)" }}
                  aria-label="Appearance settings"
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: SWATCH_VAR[palette],
                      flexShrink: 0,
                    }}
                  />
                  {theme === "dark" ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                {isPaletteOpen && (
                  <div
                    className="palette-popover"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 0.5rem)",
                      right: 0,
                      minWidth: "9rem",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.375rem",
                      padding: "0.375rem",
                      zIndex: 100,
                      boxShadow: "0 8px 24px color-mix(in srgb, var(--fg) 8%, transparent)",
                    }}
                  >
                    {PALETTES.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setPalette(p); setIsPaletteOpen(false); }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          width: "100%",
                          padding: "0.35rem 0.5rem",
                          borderRadius: "0.25rem",
                          border: "none",
                          cursor: "pointer",
                          background: palette === p ? "color-mix(in srgb, var(--primary) 12%, transparent)" : "transparent",
                          color: palette === p ? "var(--fg)" : "var(--fg-muted)",
                          fontSize: "0.75rem",
                          fontWeight: palette === p ? 700 : 400,
                          textAlign: "left",
                        }}
                      >
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: SWATCH_VAR[p], flexShrink: 0, outline: palette === p ? "2px solid var(--primary)" : "none", outlineOffset: "2px" }} />
                        {PALETTE_LABELS[p]}
                      </button>
                    ))}
                    <div style={{ borderTop: "1px solid var(--border-subtle)", margin: "0.375rem 0" }} />
                    <button
                      onClick={() => { toggleTheme(); setIsPaletteOpen(false); }}
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", padding: "0.35rem 0.5rem", borderRadius: "0.25rem", border: "none", cursor: "pointer", background: "transparent", color: "var(--fg-muted)", fontSize: "0.75rem", textAlign: "left" }}
                    >
                      {theme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
                style={{ color: "var(--fg-muted)" }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div
              className="md:hidden pb-4 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="pt-3 flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-3 py-2.5 text-sm font-medium transition-colors duration-200"
                      style={{
                        color: active ? "var(--fg)" : "var(--fg-muted)",
                        borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <Link
                    href="/contact"
                    className="btn-accent block text-center text-sm"
                    style={{ padding: "0.6rem 1rem", borderRadius: 0 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Let&#39;s Talk
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Editorial overlay menu */}
      {isOverlayOpen && (
        <OverlayMenu
          activeIndex={activeIndex}
          onClose={() => setIsOverlayOpen(false)}
        />
      )}

      {/* Underline-from-left hover on nav links */}
      <style jsx global>{`
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 1px;
          width: 100%;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 200ms ease;
        }
        .nav-link:hover::after,
        .nav-link:focus-visible::after {
          transform: scaleX(1);
        }
        .nav-link[data-active="true"]::after {
          transform: scaleX(0);
        }
        @keyframes palette-flip-in {
          from {
            opacity: 0;
            transform: perspective(400px) rotateX(-90deg);
          }
          to {
            opacity: 1;
            transform: perspective(400px) rotateX(0deg);
          }
        }
        .palette-popover {
          transform-origin: top center;
          animation: palette-flip-in 160ms cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
        }
      `}</style>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */

function OverlayMenu({
  activeIndex,
  onClose,
}: {
  activeIndex: number;
  onClose: () => void;
}) {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setNow(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto"
      style={{ background: "var(--bg)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Editorial navigation menu"
    >
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-16 min-h-screen flex flex-col">
        {/* Top bar in overlay */}
        <div className="flex justify-between items-center mb-16">
          <span
            className="text-xs font-semibold uppercase"
            style={{
              color: "var(--fg-subtle)",
              letterSpacing: "0.2em",
            }}
          >
            Mattie Graham — Index
          </span>
          <button
            onClick={onClose}
            className="text-[0.6875rem] font-semibold uppercase px-3 py-2 transition-colors duration-200"
            style={{
              color: "var(--fg-muted)",
              letterSpacing: "0.15em",
              border: "1px solid var(--border)",
            }}
            aria-label="Close menu"
          >
            Close (ESC)
          </button>
        </div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 flex-1">
          {/* Oversized nav links */}
          <nav className="flex flex-col">
            {navItems.map((item, i) => {
              const isCurrent = i === activeIndex;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="overlay-link group relative flex items-baseline gap-4 py-3 transition-colors duration-200"
                  style={{
                    color: isCurrent ? "var(--accent)" : "var(--fg)",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span
                    className="text-[0.6875rem] font-semibold uppercase"
                    style={{
                      color: "var(--fg-subtle)",
                      letterSpacing: "0.15em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold transition-transform duration-200 group-hover:translate-x-2"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Editorial metadata panel */}
          <aside
            className="lg:w-72 flex flex-col gap-8 self-start"
          >
            <div>
              <p
                className="text-[0.6875rem] font-semibold uppercase mb-2"
                style={{
                  color: "var(--fg-subtle)",
                  letterSpacing: "0.15em",
                }}
              >
                Currently
              </p>
              <p className="text-sm" style={{ color: "var(--fg)" }}>
                MS AI · CU Boulder
                <br />
                <span style={{ color: "var(--fg-muted)" }}>
                  Shipping production AI &amp; analytics systems.
                </span>
              </p>
            </div>

            <div>
              <p
                className="text-[0.6875rem] font-semibold uppercase mb-2"
                style={{
                  color: "var(--fg-subtle)",
                  letterSpacing: "0.15em",
                }}
              >
                Local Time
              </p>
              <p
                className="text-sm"
                style={{
                  color: "var(--fg)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {now || "—"}
              </p>
            </div>

            <div>
              <p
                className="text-[0.6875rem] font-semibold uppercase mb-2"
                style={{
                  color: "var(--fg-subtle)",
                  letterSpacing: "0.15em",
                }}
              >
                Status
              </p>
              <p className="text-sm" style={{ color: "var(--success)" }}>
                ● Open to senior AI &amp; data roles
              </p>
            </div>

            <Link
              href="/contact"
              onClick={onClose}
              className="btn-accent text-sm self-start"
              style={{ padding: "0.6rem 1.25rem", borderRadius: 0 }}
            >
              Let&#39;s Talk
            </Link>
          </aside>
        </div>

        {/* Footer rule */}
        <div
          className="mt-16 pt-4 flex justify-between text-[0.6875rem] font-semibold uppercase"
          style={{
            color: "var(--fg-subtle)",
            letterSpacing: "0.15em",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <span>Volume 01 · 2026</span>
          <span>mattieg93.github.io</span>
        </div>
      </div>
    </div>
  );
}
