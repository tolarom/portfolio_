"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: messageText }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks — you're subscribed!");
        setEmail("");
        setMessageText("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 w-full">
      <div>
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-lg border border-zinc-900/10 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none placeholder:text-zinc-500 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-800/[0.4] dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>

      <div>
        <label htmlFor="newsletter-message" className="sr-only">Optional message</label>
        <textarea
          id="newsletter-message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Optional message — how did you hear about me?"
          rows={3}
          className="w-full rounded-lg border border-zinc-900/10 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none placeholder:text-zinc-500 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-800/[0.4] dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="newsletter-join-button inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-base font-semibold transition disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Join"}
      </button>

      <div aria-live="polite">
        {message ? (
          <p className={`text-sm ${status === "success" ? "text-teal-600" : "text-rose-600"}`}>
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}