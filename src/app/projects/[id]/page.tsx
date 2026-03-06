import Image from 'next/image';
import Link from 'next/link';
import { projects, Project } from '@/data/cms-config';
import { QdnImageGallery } from '@/components/qdn-image-gallery';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static paths for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

function renderProjectContent(projectId: string, htmlContent: string) {
  // Check if this is the QDN project with the gallery marker
  if (projectId === 'queer-data-network' && htmlContent.includes('<!--QDN_IMAGE_GALLERY-->')) {
    // Split the content at the marker
    const [beforeGallery, afterGallery] = htmlContent.split('<!--QDN_IMAGE_GALLERY-->');
    
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: beforeGallery }} />
        <div className="my-8">
          <QdnImageGallery />
        </div>
        <div dangerouslySetInnerHTML={{ __html: afterGallery }} />
      </>
    );
  }
  
  // Default rendering for other projects
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project not found</h1>
          <Link href="/projects" className="text-purple-400 hover:text-purple-300">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 transition-colors mb-8"
          style={{ color: 'var(--secondary)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm border" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 20%, transparent)', color: 'var(--primary)', borderColor: 'color-mix(in srgb, var(--primary) 50%, transparent)' }}>
              {project.category}
            </span>
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
            {project.title}
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-700 mb-8">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Project Meta */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-purple-400 font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-gray-300 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {project.impact && (
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-emerald-400 font-semibold mb-2">Impact</h3>
                <p className="text-2xl font-bold text-white">{project.impact.value}</p>
                <p className="text-gray-400 text-sm">{project.impact.metric}</p>
              </div>
            )}
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-purple-500 font-semibold mb-2">Links</h3>
              <div className="space-y-2">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    GitHub Repository →
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-gray-300 leading-relaxed space-y-6">
            {project.longDescription && renderProjectContent(project.id, project.longDescription)}
          </div>
        </div>

        {/* Image Gallery for Supply-Demand Project */}
        {project.id === 'supply-demand' && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Image Gallery</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src="/assets/images/supply-demand-regional.png"
                    alt="Regional Supply and Demand Analysis"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-gray-400 text-center">Regional analysis showing supply and demand patterns across different geographic areas</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src="/assets/images/supply-demand-site.png"
                    alt="Site-Level Supply and Demand Analysis"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-gray-400 text-center">Site-level breakdown providing granular insights into individual location performance</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}