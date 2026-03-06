"use client";

import { useState } from "react";

interface ProjectFilterProps {
  projects: any[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ProjectFilter({
  projects,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  searchTerm,
  onSearchChange,
}: ProjectFilterProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  // Only show category buttons that have at least one project
  const rawCategories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "professional", label: "Professional", count: projects.filter(p => p.category === "professional").length },
    { id: "academic", label: "Academic", count: projects.filter(p => p.category === "academic").length },
    { id: "personal", label: "Personal", count: projects.filter(p => p.category === "personal").length },
  ];
  const categories = rawCategories.filter(c => c.id === "all" || c.count > 0);

  // Compute tag frequency across all projects, sorted descending by count
  const tagCounts = projects.reduce((acc, project) => {
    project.tags.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = (Object.entries(tagCounts) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  const VISIBLE_COUNT = 8;
  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, VISIBLE_COUNT);
  const hiddenCount = sortedTags.length - VISIBLE_COUNT;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 focus:border-[var(--primary)] focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Category Filter - only show categories with at least one project */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? "text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50 border border-gray-300 dark:border-gray-700"
            }`}
            style={selectedCategory === category.id ? {
              backgroundColor: 'var(--secondary)'
            } : {}}
          >
            {category.label}
            <span className="ml-2 text-sm opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Tag Filter - sorted by frequency desc, collapsed to first 8 with expand toggle */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center uppercase tracking-wider">
          Filter by Technology
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {visibleTags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 border ${
                selectedTags.includes(tag)
                  ? ""
                  : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50 border-gray-300 dark:border-gray-700"
              }`}
              style={selectedTags.includes(tag) ? {
                backgroundColor: 'color-mix(in srgb, var(--secondary) 20%, transparent)',
                color: 'var(--secondary)',
                borderColor: 'color-mix(in srgb, var(--secondary) 50%, transparent)'
              } : {}}
            >
              {tag}
              <span className="ml-1 opacity-50 text-xs">{count}</span>
            </button>
          ))}

          {hiddenCount > 0 && !showAllTags && (
            <button
              onClick={() => setShowAllTags(true)}
              className="px-3 py-1 text-sm rounded-full border border-dashed border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-300"
            >
              +{hiddenCount} more
            </button>
          )}
          {showAllTags && sortedTags.length > VISIBLE_COUNT && (
            <button
              onClick={() => setShowAllTags(false)}
              className="px-3 py-1 text-sm rounded-full border border-dashed border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-300"
            >
              Show less
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "all" || selectedTags.length > 0 || searchTerm) && (
        <div className="flex flex-wrap justify-center gap-2 pt-4 border-t border-gray-300 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-400 text-sm">Active filters:</span>
          {selectedCategory !== "all" && (
            <span 
              className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
                color: 'var(--primary)'
              }}
            >
              {selectedCategory}
              <button 
                onClick={() => onCategoryChange("all")}
                className="hover:opacity-80"
              >
                ×
              </button>
            </span>
          )}
          {selectedTags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--secondary) 20%, transparent)',
                color: 'var(--secondary)'
              }}
            >
              {tag}
              <button 
                onClick={() => toggleTag(tag)}
                className="hover:opacity-80"
              >
                ×
              </button>
            </span>
          ))}
          {searchTerm && (
            <span 
              className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--secondary) 20%, transparent)',
                color: 'var(--secondary)'
              }}
            >
              &quot;{searchTerm}&quot;
              <button 
                onClick={() => onSearchChange("")}
                className="hover:opacity-80"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}