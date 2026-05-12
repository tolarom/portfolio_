"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringTextField, setIsHoveringTextField] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a text field
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "input" || 
        target.tagName.toLowerCase() === "textarea" ||
        target.isContentEditable
      ) {
        setIsHoveringTextField(true);
      } else {
        setIsHoveringTextField(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Hide the default cursor only on desktop to allow custom cursor to shine */
        @media (min-width: 768px) {
          body, a, button, input, textarea, [contenteditable="true"] {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* The trailing round border */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[99999] rounded-full border-2 transition-all duration-100 ease-out hidden md:block border-zinc-700 dark:border-zinc-300 bg-zinc-700/20 dark:bg-zinc-300/20 backdrop-blur-[2px]`}
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
          width: "24px",
          height: "24px",
        }}
      />
    </>
  );
}