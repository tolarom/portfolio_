"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringTextField, setIsHoveringTextField] = useState(false);
  const [isHoveringNoCursor, setIsHoveringNoCursor] = useState(false);

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
      // If hovering an element that should show the native cursor (e.g. image previews)
      if (target.closest && target.closest(".cursor-zoom-in")) {
        setIsHoveringNoCursor(true);
      } else {
        setIsHoveringNoCursor(false);
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
          /* hide global pointers for body, links and buttons */
          body, a, button {
            cursor: none !important;
          }

          /* ensure text inputs and editable areas show the text caret */
          input, textarea, [contenteditable="true"] {
            cursor: text !important;
          }

          /* show zoom-in cursor for image previews on desktop */
          .cursor-zoom-in, .cursor-zoom-in * {
            cursor: zoom-in !important;
          }
        }
      `}</style>
      
      {/* The trailing round border */}
      {!isHoveringTextField && !isHoveringNoCursor && (
        <div
          className={`pointer-events-none fixed left-0 top-0 z-[1000001] rounded-full border-2 transition-all duration-100 ease-out hidden md:block border-zinc-700 dark:border-zinc-300 bg-zinc-700/20 dark:bg-zinc-300/20 backdrop-blur-[2px]`}
          style={{
            transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </>
  );
}