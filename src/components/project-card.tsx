import Link from "next/link";
import { Project } from '@/data/cms-config';
import ProjectImage from './project-image';

interface ProjectCardProps {
  project: Project;
}

const CATEGORY_COLORS: Record<string, string> = {
  professional: 'var(--primary)',
  academic: 'var(--accent)',
  personal: 'var(--success)',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const link = `/work/${project.id}`;
  const year = new Date(project.date).getFullYear();
  const color = CATEGORY_COLORS[project.category] ?? 'var(--fg-muted)';

  return (
    <Link href={link} className="card group flex flex-col h-full overflow-hidden block">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '180px' }}>
        <ProjectImage
          src={project.image}
          alt={project.title}
          width={480}
          height={180}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'color-mix(in srgb, var(--bg) 50%, transparent)' }}
        />
        <span
          className="absolute top-3 left-3 pill"
          style={{
            background: `color-mix(in srgb, ${color} 85%, transparent)`,
            color: 'var(--on-emphasis)',
            borderColor: 'transparent',
            fontSize: '0.7rem',
            textTransform: 'capitalize',
          }}
        >
          {project.category}
        </span>
        <span
          className="absolute top-3 right-3 pill"
          style={{ background: 'color-mix(in srgb, var(--fg) 70%, transparent)', color: 'var(--bg)', borderColor: 'transparent', fontSize: '0.7rem' }}
        >
          {year}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3
          className="font-semibold text-sm leading-snug transition-colors duration-200 group-hover:text-[var(--primary)]"
          style={{ color: 'var(--fg)' }}
        >
          {project.title}
        </h3>
        <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--fg-muted)' }}>
          {project.description}
        </p>

        {project.impact && (
          <div className="pt-2 text-xs" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <span className="font-bold" style={{ color: 'var(--accent)' }}>{project.impact.value}</span>
            <span className="ml-1" style={{ color: 'var(--fg-subtle)' }}>{project.impact.metric}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="pill" style={{ fontSize: '0.68rem' }}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}


interface ProjectCardProps {
  project: Project;
}
