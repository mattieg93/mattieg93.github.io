import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { FeaturedProjects } from "@/components/featured-projects";
import { Capabilities } from "@/components/capabilities";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <Hero />
      <StatsBar />
      <FeaturedProjects />
      <Capabilities />

      {/* CTA section */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            Let&#39;s build something meaningful.
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--fg-muted)' }}>
            Open to senior AI &amp; data engineering roles where business outcomes drive the work.
            If you have a hard problem at the intersection of strategy, data, and AI — let&#39;s talk.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-accent">Get in Touch</Link>
            <Link href="/work" className="btn-outline">View My Work</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
