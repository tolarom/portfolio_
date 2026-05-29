"use client";

import { ThemeProvider } from "./theme-context";
import { ThemeToggle } from "./theme-toggle";
import ChatLauncher from "./components/ChatLauncher";

export function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {children}
      <ChatLauncher />
    </ThemeProvider>
  );
}
