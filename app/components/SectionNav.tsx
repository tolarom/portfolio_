"use client";

import { useEffect, useState } from "react";

type SectionLink = {
  label: string;
  href: string;
};

export function SectionNav({ sections }: { sections: SectionLink[] }) {
  const [activeHref, setActiveHref] = useState(sections[0]?.href ?? "");

  useEffect(() => {
    const getActiveSection = () => {
      const offset = 180;

      const candidates = sections
        .map((section) => document.getElementById(section.href.replace("#", "")))
        .filter((element): element is HTMLElement => Boolean(element))
        .map((element) => ({
          href: `#${element.id}`,
          top: element.getBoundingClientRect().top,
        }));

      if (candidates.length === 0) return;

      const passedSections = candidates.filter((candidate) => candidate.top <= offset);
      const activeSection = (passedSections.at(-1) ?? candidates[0]).href;

      setActiveHref(activeSection);
    };

    getActiveSection();
    window.addEventListener("scroll", getActiveSection, { passive: true });
    window.addEventListener("resize", getActiveSection);

    return () => {
      window.removeEventListener("scroll", getActiveSection);
      window.removeEventListener("resize", getActiveSection);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-1/2 top-5 z-40 w-[min(92vw,48rem)] -translate-x-1/2 rounded-2xl border px-3 py-2 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:shadow-black/20 sm:top-6"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {sections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            aria-current={activeHref === section.href ? "page" : undefined}
            className="rounded-full px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition"
            style={{
              color: activeHref === section.href ? "#ffffff" : "inherit",
              backgroundColor:
                activeHref === section.href
                  ? "rgba(34, 197, 94, 0.9)"
                  : "transparent",
            }}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
