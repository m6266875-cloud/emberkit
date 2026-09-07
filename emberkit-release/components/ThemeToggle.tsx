'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="flex h-9 w-9 items-center justify-center rounded border border-ink-border font-mono text-xs text-ink-muted transition hover:border-ink-faint hover:text-ink dark:hover:text-paper"
    >
      {theme === 'light' ? '◐' : '◑'}
    </button>
  );
}