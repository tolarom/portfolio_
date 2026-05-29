"use client";
import React, { useMemo, useState } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  category?: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category ?? "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inQuery =
        !q ||
        [p.title, p.description, ...(p.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const inCategory =
        category === "All" || (p.category ?? "Uncategorized") === category;
      return inQuery && inCategory;
    });
  }, [projects, query, category]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:flex-1">
          <div className="flex items-center justify-between w-full gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full sm:w-120 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 cursor-text"
            />
            <div className="flex-shrink-0 text-sm text-zinc-500 dark:text-zinc-400 font-bold mr-4">
              {filtered.length} project(s)
            </div>
          </div>

          <div className="mt-3 flex gap-2 flex-wrap">
            {categories.map((cat) => {
              const selected = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  aria-pressed={selected}
                  className={
                    "rounded-md px-3 py-2 text-sm border transition-colors whitespace-nowrap " +
                    (selected
                      ? "bg-teal-600 text-white border-teal-600 dark:bg-teal-500/90 dark:text-zinc-900"
                      : "bg-white text-zinc-900 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700")
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {filtered.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="group relative rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition hover:shadow-lg hover:-translate-y-1 dark:border-zinc-700/40 dark:bg-zinc-900/40 sm:p-6 cursor-pointer"
          >
            <div className="relative z-10">
              <div className="mb-4 h-28 w-full overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800 sm:h-36" />
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-sm">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/20 dark:text-teal-300">
                  {project.category}
                </span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/20 dark:text-teal-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition group-hover:text-teal-700">
                  View Project
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 stroke-current">
                    <path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
