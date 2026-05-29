"use client";

import { useState } from "react";
import { ProjectFilter } from "@/components/project-filter";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/cms-config";

// Note: metadata must be in a server component — defined in layout or a separate server wrapper.
// For dynamic filtering, this page itself is a client component.

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const visibleProjects = projects.filter((p) => !p.hidden);

  const filteredProjects = visibleProjects.filter((p) => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchTags = selectedTags.length === 0 || selectedTags.some((t) => p.tags.includes(t));
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCategory && matchTags && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--fg)' }}>
            Work
          </h1>
          <p className="text-base" style={{ color: 'var(--fg-muted)' }}>
            {visibleProjects.length} projects across AI engineering, data platforms, and full-stack development.
          </p>
        </div>

        <ProjectFilter
          projects={visibleProjects}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={() => {
            setSelectedCategory("all");
            setSelectedTags([]);
            setSearchTerm("");
          }}
        />

        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-base mb-4" style={{ color: 'var(--fg-muted)' }}>
              No projects match these filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTags([]);
                setSearchTerm("");
              }}
              className="btn-outline text-sm px-4 py-2 rounded-md"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
