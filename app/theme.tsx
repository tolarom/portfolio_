"use client";

import { ThemeProvider } from "./theme-context";
import { ThemeToggle } from "./theme-toggle";

export function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
}
