import Link from "next/link";
import { Project } from '@/data/cms-config';
import ProjectImage from './project-image';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // For projects with rich longDescription content, prioritize internal project pages
  const hasRichContent = project.longDescription.includes('<h2') || project.longDescription.includes('<div');
  const link = hasRichContent ? `/projects/${project.id}` : (project.demoUrl || project.githubUrl || `/projects/${project.id}`);
  const isExternal = link.startsWith('http');
  const year = new Date(project.date).getFullYear().toString();
  
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'professional':
        return {
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          borderColor: 'color-mix(in srgb, var(--primary) 80%, white)'
        };
      case 'academic':
        return {
          backgroundColor: 'var(--secondary)',
          color: '#ffffff',
          borderColor: 'color-mix(in srgb, var(--secondary) 80%, white)'
        };
      case 'personal':
        return {
          backgroundColor: 'var(--secondary)',
          color: '#ffffff',
          borderColor: 'color-mix(in srgb, var(--secondary) 80%, white)'
        };
      default:
        return {
          backgroundColor: '#374151',
          color: '#ffffff',
          borderColor: '#4b5563'
        };
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'professional':
        return 'Professional';
      case 'academic':
        return 'Academic';
      case 'personal':
        return 'Personal';
      default:
        return category;
    }
  };

  return (
    <Link href={link} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : undefined}>
      <div className="group bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-[color-mix(in_srgb,var(--primary)_50%,transparent)] transition-all duration-500 ease-out hover:shadow-xl hover:transform hover:scale-[1.02] flex flex-col h-full cursor-pointer">
        {/* Image */}
        <div className="relative overflow-hidden h-48">
        <ProjectImage
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
        
        {/* Category Badge */}
        <div 
          className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full border"
          style={getCategoryStyle(project.category)}
        >
          {getCategoryLabel(project.category)}
        </div>
        
        {/* Year Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-full border border-gray-300 dark:border-gray-700">
          {year}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-600"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-600">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300 ease-out line-clamp-2 group-hover:text-primary">
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-700 dark:text-gray-400 mb-4 leading-relaxed flex-grow line-clamp-3">
          {project.description}
        </p>
        
        {/* Impact */}
        {project.impact && (
          <div 
            className="mb-4 px-3 py-2 bg-teal-50/50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-transparent border-l-4"
            style={{ borderLeftColor: 'var(--secondary)' }}
          >
            <p className="text-sm font-semibold text-gray-700 dark:text-teal-400">
              {project.impact.metric}: {project.impact.value}
            </p>
          </div>
        )}
        
        {/* Link Indicator */}
        <div className="inline-flex items-center gap-2 font-semibold transition-colors mt-auto text-gray-900 dark:text-teal-400">
          {hasRichContent || !isExternal ? 'Read More' : 'View Project'}
          {isExternal ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          ) : (
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
        </div>
      </div>
    </Link>
  );
}