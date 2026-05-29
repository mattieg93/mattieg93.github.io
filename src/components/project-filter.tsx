"use client";

import { useState } from "react";

interface ProjectFilterProps {
  projects: { category: string; tags: string[] }[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClear?: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  professional: "Professional",
  academic: "Academic",
  personal: "Personal",
};

export function ProjectFilter({
  projects,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  searchTerm,
  onSearchChange,
  onClear,
}: ProjectFilterProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  const categories = ["all", "professional", "academic", "personal"].filter(
    (c) => c === "all" || projects.some((p) => p.category === c)
  );

  const tagCounts = projects.reduce<Record<string, number>>((acc, p) => {
    p.tags.forEach((tag) => { acc[tag] = (acc[tag] || 0) + 1; });
    return acc;
  }, {});

  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([tag, count]) => ({ tag, count }));

  const VISIBLE = 10;
  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, VISIBLE);

  const toggleTag = (tag: string) => {
    onTagsChange(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const hasFilters = selectedCategory !== "all" || selectedTags.length > 0 || searchTerm;

  return (
    <div className="space-y-5 mb-8">
      {/* Search */}
      <div className="relative max-w-sm">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: 'var(--fg-subtle)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-md border"
          style={{
            background: 'var(--bg-surface)',
            color: 'var(--fg)',
            borderColor: 'var(--border)',
          }}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const count = c === "all" ? projects.length : projects.filter((p) => p.category === c).length;
          const active = selectedCategory === c;
          return (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className="text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors duration-150"
              style={{
                background: active ? 'var(--primary)' : 'var(--pill-bg)',
                color: active ? 'var(--on-emphasis)' : 'var(--pill-fg)',
                borderColor: active ? 'var(--primary)' : 'var(--pill-border)',
              }}
            >
              {CATEGORY_LABELS[c]}
              <span className="ml-1.5 opacity-60 text-xs">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {visibleTags.map(({ tag, count }) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="text-xs px-3 py-1 rounded-full border transition-colors duration-150"
              style={{
                background: active ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--pill-bg)',
                color: active ? 'var(--accent)' : 'var(--pill-fg)',
                borderColor: active ? 'color-mix(in srgb, var(--accent) 45%, transparent)' : 'var(--pill-border)',
              }}
            >
              {tag}
              <span className="ml-1 opacity-50">{count}</span>
            </button>
          );
        })}
        {!showAllTags && sortedTags.length > VISIBLE && (
          <button
            onClick={() => setShowAllTags(true)}
            className="text-xs px-3 py-1 rounded-full border border-dashed"
            style={{ color: 'var(--fg-subtle)', borderColor: 'var(--border)' }}
          >
            +{sortedTags.length - VISIBLE} more
          </button>
        )}
        {showAllTags && sortedTags.length > VISIBLE && (
          <button
            onClick={() => setShowAllTags(false)}
            className="text-xs px-3 py-1 rounded-full border border-dashed"
            style={{ color: 'var(--fg-subtle)', borderColor: 'var(--border)' }}
          >
            Show less
          </button>
        )}
      </div>

      {/* Active filter chips + clear */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--fg-subtle)' }}>Active:</span>
          {selectedCategory !== "all" && (
            <span
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
              style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)', color: 'var(--primary)', borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)' }}
            >
              {CATEGORY_LABELS[selectedCategory]}
              <button onClick={() => onCategoryChange("all")} className="hover:opacity-70" aria-label="Remove">×</button>
            </span>
          )}
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
              style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)', borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
            >
              {tag}
              <button onClick={() => toggleTag(tag)} className="hover:opacity-70" aria-label="Remove">×</button>
            </span>
          ))}
          {onClear && (
            <button
              onClick={onClear}
              className="text-xs ml-1 underline-offset-2 underline"
              style={{ color: 'var(--fg-subtle)' }}
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

