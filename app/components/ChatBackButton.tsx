"use client";

import { useRouter } from "next/navigation";

export default function ChatBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
    >
      ← Back
    </button>
  );
}
