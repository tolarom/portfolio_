"use client";

import { useRouter } from "next/navigation";

export default function ChatBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className="fixed left-8 top-12 z-50 flex items-center justify-center h-12 w-12 rounded-full bg-white/90 border border-zinc-200 text-zinc-700 shadow-lg hover:bg-teal-50 dark:bg-zinc-900/90 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-teal-700/10"
    >
      <span className="sr-only">Back</span>
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
