"use client";

import { useState } from "react";
import { ProjectFilter } from "@/components/project-filter";
import { ProjectCard } from "@/components/project-card";
import { projects } from '@/data/cms-config';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on category, tags, and search term
  const visibleProjects = projects.filter(project => !project.hidden);

  const filteredProjects = visibleProjects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag));
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesTags && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 pb-2" style={{ color: 'var(--secondary)' }}>
            My Projects
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-400">
            A collection of professional, academic, and personal work showcasing data-driven solutions
          </p>
          <div className="w-24 h-1 mx-auto mt-8" style={{ backgroundColor: 'var(--secondary)' }}></div>
        </div>

        <ProjectFilter
          projects={visibleProjects}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-gray-700 dark:text-gray-400">No projects match your current filters.</p>
            <button 
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTags([]);
                setSearchTerm("");
              }}
              className="mt-4 px-6 py-2 rounded-lg transition-colors text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}