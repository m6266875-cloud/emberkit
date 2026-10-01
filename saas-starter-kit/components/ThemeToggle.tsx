'use client';
import { useHydrated } from '@/lib/use-hydrated';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const hydrated = useHydrated();
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className="icon-button"
      disabled={!hydrated}
      aria-label="Switch color theme"
      title="Switch color theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Moon size={16} className="dark:hidden" />
      <Sun size={16} className="hidden dark:block" />
    </button>
  );
}
