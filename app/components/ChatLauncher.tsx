"use client";

import { useRouter, usePathname } from "next/navigation";

export default function ChatLauncher() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide launcher when already on the chat page
  if (pathname?.startsWith("/chat")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        aria-label="Open chat"
        title="Open chat"
        onClick={() => router.push("/chat")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 p-2 text-white shadow-lg transition hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M2 12c0 4.418 4.03 8 9 8 1.18 0 2.295-.18 3.29-.5l3.21.8-.8-3.19C18.82 15.17 20 13.66 20 12c0-4.418-4.03-8-9-8S2 7.582 2 12z" />
        </svg>
      </button>
    </div>
  );
}
