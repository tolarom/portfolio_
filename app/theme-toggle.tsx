'use client';

import { useTheme } from './theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  const isLightTheme = theme === 'light';
  const buttonStyle = {
    backgroundColor: 'var(--theme-toggle-bg)',
    borderColor: 'var(--theme-toggle-border)',
    color: 'var(--theme-toggle-fg)',
  } as const;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={buttonStyle}
      className="fixed right-4 top-4 z-50 inline-flex items-center justify-center rounded-xl border p-3 shadow-sm backdrop-blur transition-colors duration-200 hover:opacity-90 sm:right-8 sm:top-8"
    >
      {isLightTheme ? (
        // Light mode → show moon icon on a dark button with a light icon
        <svg
          style={{ color: 'var(--theme-toggle-fg)' }}
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3c.36 0 .71.02 1.06.06A7 7 0 0 0 21 12.79Z" />
        </svg>
      ) : (
        // Dark mode → show sun icon on a light button with a dark icon
        <svg
          style={{ color: 'var(--theme-toggle-fg)' }}
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
        </svg>
      )}
    </button>
  );
}