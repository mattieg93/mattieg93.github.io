import Link from "next/link";
import { projects } from '@/data/cms-config';
import ProjectImage from './project-image';
import { ScrollReveal } from './scroll-reveal';

const featuredProjects = projects
  .filter((p) => p.featured && !p.hidden)
  .slice(0, 3);

export function FeaturedProjects() {
  return (
    <section className="py-20 px-6" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-heading mb-3">Selected Work</h2>
              <p className="mt-4 text-base" style={{ color: 'var(--fg-muted)' }}>
                A sample of recent projects across AI, data engineering, and full-stack.
              </p>
            </div>
            <Link
              href="/work"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--primary)' }}
            >
              View all work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              <Link
                href={`/work/${project.id}`}
                className="card group flex flex-col h-full overflow-hidden block"
              >
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    width={480}
                    height={180}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category badge */}
                  <span
                    className="absolute top-3 left-3 pill"
                    style={{
                      background: 'color-mix(in srgb, var(--primary) 85%, transparent)',
                      color: 'var(--on-emphasis)',
                      borderColor: 'transparent',
                      fontSize: '0.7rem',
                      textTransform: 'capitalize',
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-semibold text-base leading-snug transition-colors duration-200 group-hover:text-[var(--primary)]"
                    style={{ color: 'var(--fg)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--fg-muted)' }}>
                    {project.description}
                  </p>

                  {project.impact && (
                    <div className="pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                        {project.impact.value}
                      </span>
                      <span className="text-xs ml-1" style={{ color: 'var(--fg-subtle)' }}>
                        {project.impact.metric}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="pill" style={{ fontSize: '0.7rem' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/work" className="btn-outline text-sm px-5 py-2.5 inline-block rounded-md">
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
