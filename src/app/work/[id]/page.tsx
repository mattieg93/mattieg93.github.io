import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/cms-config';
import { QdnImageGallery } from '@/components/qdn-image-gallery';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

function renderContent(projectId: string, html: string) {
  if (projectId === 'queer-data-network' && html.includes('<!--QDN_IMAGE_GALLERY-->')) {
    const [before, after] = html.split('<!--QDN_IMAGE_GALLERY-->');
    return (
      <>
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: before }} />
        <div className="my-10"><QdnImageGallery /></div>
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: after }} />
      </>
    );
  }
  return <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default async function WorkDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg)' }}>Project not found</h1>
          <Link href="/work" className="text-sm" style={{ color: 'var(--primary)' }}>
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200"
          style={{ color: 'var(--fg-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Work
        </Link>

        {/* Header */}
        <div className="mb-10">
          {/* Category + tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span
              className="pill"
              style={{
                background: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                color: 'var(--primary)',
                borderColor: 'color-mix(in srgb, var(--primary) 35%, transparent)',
                textTransform: 'capitalize',
              }}
            >
              {project.category}
            </span>
            {project.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: 'var(--fg)' }}>
            {project.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            {project.description}
          </p>
        </div>

        {/* Hero image */}
        <div
          className="rounded-xl overflow-hidden mb-10"
          style={{ border: '1px solid var(--border)' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={540}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Meta cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {/* Technologies */}
          <div className="card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--fg-subtle)' }}>
              Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span key={t} className="pill" style={{ fontSize: '0.72rem' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Impact */}
          {project.impact && (
            <div className="card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--fg-subtle)' }}>
                Impact
              </h3>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {project.impact.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {project.impact.metric}
              </p>
            </div>
          )}

          {/* Links */}
          {(project.githubUrl || project.demoUrl) && (
            <div className="card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--fg-subtle)' }}>
                Links
              </h3>
              <div className="space-y-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: 'var(--primary)' }}
                  >
                    GitHub →
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: 'var(--accent)' }}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {project.longDescription && (
          <article className="max-w-3xl">
            {renderContent(project.id, project.longDescription)}
          </article>
        )}

        {/* Supply-demand image gallery */}
        {project.id === 'supply-demand' && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--fg)' }}>Image Gallery</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { src: '/assets/images/supply-demand-regional.png', caption: 'Regional supply and demand patterns' },
                { src: '/assets/images/supply-demand-site.png', caption: 'Site-level breakdown by location' },
              ].map(({ src, caption }) => (
                <div key={src} className="space-y-2">
                  <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                    <Image src={src} alt={caption} width={600} height={400} className="w-full h-auto" />
                  </div>
                  <p className="text-xs text-center" style={{ color: 'var(--fg-subtle)' }}>{caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
