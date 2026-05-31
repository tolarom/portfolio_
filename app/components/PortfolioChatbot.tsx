"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import React from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessage: ChatMessage = {
  role: "assistant",
  content:
    "Ask me anything about Tola's infiormations. Just type your question below!",
};

export default function PortfolioChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage();
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const nextMessages = [...messages, { role: "user", content: trimmed } as ChatMessage];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Chat request failed");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer || "No answer returned." },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `Sorry, I could not answer that right now: ${message}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="w-full h-[72vh] sm:h-[80vh] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700/60 dark:bg-zinc-950/80">
      <div className="flex flex-col h-full bg-white dark:bg-zinc-900/40">
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "assistant"
                    ? "flex justify-start"
                    : "flex justify-end"
                }
              >
                <div
                  className={
                    message.role === "assistant"
                      ? "max-w-[90%] rounded-2xl rounded-tl-sm px-5 py-4 text-lg leading-7 text-zinc-900 shadow-sm dark:text-zinc-100 bg-white chat-message-assistant"
                      : "max-w-[90%] rounded-2xl rounded-tr-sm px-5 py-4 text-lg leading-7 text-white shadow-sm chat-message-user"
                  }
                >
                  <div className="whitespace-pre-wrap text-inherit">
                    {renderMessageContent(message.content)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-zinc-200 p-4 dark:border-zinc-800 sm:p-5">
            <label htmlFor="portfolio-chat-input" className="sr-only">
              Ask about Tola&apos;s portfolio
            </label>
            <textarea
              id="portfolio-chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              placeholder="Ask about Tola's informations..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-teal-500 dark:focus:ring-teal-500/20 chat-textarea"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Powered by Gemini.
              </p>
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? "Thinking..." : "Send"}
              </button>
            </div>
          </form>
      </div>
    </div>
  );

  function renderMessageContent(text: string) {
    if (!text) return null;
    // Regex to find URLs
    const urlRegex = /https?:\/\/[\w\-./?&=#%:+,]+/g;
    const parts: Array<string | React.ReactNode> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = urlRegex.exec(text)) !== null) {
      const idx = match.index;
      if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
      const url = match[0];
      parts.push(
        <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="underline text-teal-600">
          {url}
        </a>
      );
      lastIndex = idx + url.length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    // If no URLs found, just return the text
    if (parts.length === 1 && typeof parts[0] === "string") return parts[0];
    return parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : p));
  }
}