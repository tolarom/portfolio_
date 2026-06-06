"use client";
import Image from "next/image";
import React, { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  category?: string;
  images?: string[];
};

function ProjectCard({ project }: { project: Project }) {
  const images = project.images ?? [];
  const [imageIndex, setImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState("");

  const hasMultipleImages = images.length > 1;
  const currentImage = images[imageIndex] ?? "/window.svg";

  const goToPreviousImage = () => {
    if (!hasMultipleImages) {
      return;
    }

    setImageIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    if (!hasMultipleImages) {
      return;
    }

    setImageIndex((current) => (current + 1) % images.length);
  };

  const openModal = (src: string, alt: string) => {
    setModalSrc(src);
    setModalAlt(alt);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalSrc(null);
    setModalAlt("");
  };

  const prevInModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!hasMultipleImages) return;
    setImageIndex((current) => {
      const next = (current - 1 + images.length) % images.length;
      setModalSrc(images[next] ?? "/window.svg");
      return next;
    });
  };

  const nextInModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!hasMultipleImages) return;
    setImageIndex((current) => {
      const next = (current + 1) % images.length;
      setModalSrc(images[next] ?? "/window.svg");
      return next;
    });
  };

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevInModal();
      if (e.key === "ArrowRight") nextInModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  useEffect(() => {
    // prevent background scrolling while modal is open
    const prev = typeof document !== "undefined" ? document.body.style.overflow : undefined;
    if (modalOpen && typeof document !== "undefined") document.body.style.overflow = "hidden";
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = prev ?? "";
    };
  }, [modalOpen]);

  return (
    <article className="group relative rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700/40 dark:bg-zinc-900/40 sm:p-6">
      <div
        className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:h-44 cursor-zoom-in"
        onClick={() => openModal(currentImage, `${project.title} preview ${imageIndex + 1}`)}
      >
        <Image
          src={currentImage}
          alt={`${project.title} preview ${imageIndex + 1}`}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {hasMultipleImages && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-center">
            <div className="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200">
              {imageIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </div>

      {modalOpen && modalSrc && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center bg-black/70 p-4"
              role="dialog"
              aria-modal="true"
              onClick={closeModal}
            >
              <div className="relative max-h-[90vh] max-w-[90vw]">
                  <img
                    src={modalSrc}
                    alt={modalAlt}
                    className="max-h-[90vh] max-w-[90vw] object-contain rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close image"
                  className="absolute top-6 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg focus:outline-none"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => prevInModal(e)}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-md focus:outline-none"
                    >
                      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 stroke-current" aria-hidden="true">
                        <path d="M12.5 4.75 7.25 10l5.25 5.25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => nextInModal(e)}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-md focus:outline-none"
                    >
                      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 stroke-current" aria-hidden="true">
                        <path d="m7.5 4.75 5.25 5.25-5.25 5.25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </>
                )}
            </div>,
            document.body
          )
        : null}

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
        <a
          href={project.link}
          className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition hover:text-teal-700"
        >
          View Project
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 stroke-current" aria-hidden="true">
            <path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}

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
          <ProjectCard
            key={project.title}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
