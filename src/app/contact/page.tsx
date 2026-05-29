import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mattie Graham — AI & Analytics Engineer. Let's discuss your data project.",
};

const infoItems = [
  {
    label: "Location",
    value: "United States\nOpen to remote",
  },
  {
    label: "Response Time",
    value: "Within 24–48 hours",
  },
  {
    label: "Availability",
    value: "Open to new projects",
  },
];

const links = [
  { label: "Email", href: "mailto:eight-amens76@icloud.com", text: "eight-amens76@icloud.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mattiegraham", text: "linkedin.com/in/mattiegraham" },
  { label: "GitHub", href: "https://github.com/mattieg93", text: "github.com/mattieg93" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--fg)" }}>
            Let&apos;s build something{" "}
            <span style={{ color: "var(--accent)" }}>meaningful</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Whether you have a project in mind, a question about my work, or just want to connect —
            I&apos;d love to hear from you.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">

          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Info cards */}
            <div className="card p-6 space-y-5">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--fg-subtle)" }}>
                    {item.label}
                  </p>
                  <p className="text-sm whitespace-pre-line" style={{ color: "var(--fg-muted)" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--fg-subtle)" }}>
                Connect
              </p>
              <div className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-start gap-2 text-sm group"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <span
                      className="text-xs font-medium mt-0.5 w-16 flex-shrink-0"
                      style={{ color: "var(--fg-subtle)" }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="group-hover:underline"
                      style={{ color: "var(--primary)" }}
                    >
                      {link.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="rounded-xl p-5 text-center"
              style={{
                background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                border: "1px solid color-mix(in srgb, var(--accent) 22%, transparent)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 text-sm font-medium mb-2"
                style={{ color: "var(--accent)" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--success)" }}
                />
                Available for new projects
              </div>
              <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                AI &amp; data engineering, ML systems, analytics platforms
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
