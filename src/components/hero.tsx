import Image from "next/image";
import Link from "next/link";

const highlights = [
  { value: "$9B+", label: "Decisions guided" },
  { value: "9+", label: "Years in production" },
  { value: "160+", label: "Analyst hrs/mo automated" },
  { value: "400+", label: "MAU platform" },
];

export function Hero() {
  return (
    <section
      className="min-h-screen flex items-center px-6 pt-24 pb-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">
        {/* Text column */}
        <div>
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border text-xs font-medium"
            style={{
              borderColor: "color-mix(in srgb, var(--success) 35%, transparent)",
              background: "color-mix(in srgb, var(--success) 8%, transparent)",
              color: "var(--success)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Open to senior AI &amp; data roles
          </div>

          {/* Swiss-style eyebrow with accent rule */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className="text-xs font-semibold uppercase"
              style={{
                color: "var(--accent)",
                letterSpacing: "0.2em",
              }}
            >
              Senior AI &amp; Analytics Engineer
            </span>
            <span
              className="h-px flex-1 max-w-[120px]"
              style={{ background: "var(--accent)" }}
            />
          </div>

          {/* Display name */}
          <h1
            className="text-6xl lg:text-8xl font-bold mb-8 leading-[0.95]"
            style={{
              color: "var(--fg)",
              letterSpacing: "-0.04em",
            }}
          >
            Mattie
            <br />
            Graham
          </h1>

          {/* Body paragraph — copy preserved verbatim */}
          <p
            className="text-base lg:text-lg leading-relaxed mb-12 max-w-xl"
            style={{ color: "var(--fg-muted)" }}
          >
            I sit at the intersection of{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              business strategy, data engineering, and applied AI
            </strong>{" "}
            — turning ambiguous problems into production systems that ship measurable outcomes.
            9+ years embedded with{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              Meta and Microsoft
            </strong>{" "}
            teams, building experimentation frameworks, forecasting models, RAG systems, and the
            analytics infrastructure beneath them.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-16">
            <Link href="/work" className="btn-primary">
              See My Work
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>

          {/* Stats: editorial tabular strip with thin top rule */}
          <div
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            {highlights.map(({ value, label }) => (
              <div key={label} className="text-left">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{
                    color: "var(--fg)",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </p>
                <p
                  className="font-semibold uppercase"
                  style={{
                    color: "var(--fg-subtle)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo column — hard-edged offset accent block, no gradient */}
        <div className="hidden lg:flex justify-end">
          <div className="relative w-80 h-80">
            {/* Hard offset accent block — peeks out behind photo as editorial frame */}
            <div
              className="absolute"
              style={{
                background: "var(--accent)",
                top: "16px",
                left: "16px",
                right: "-16px",
                bottom: "-16px",
              }}
              aria-hidden="true"
            />

            {/* Photo */}
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                border: "2px solid var(--fg)",
              }}
            >
              <Image
                src="/assets/images/1843.png"
                alt="Mattie Graham"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Name badge — kept */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 text-xs font-semibold"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--fg-muted)",
              }}
            >
              Mattie #1843
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
