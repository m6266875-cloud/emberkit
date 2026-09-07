'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-ink-border/60 bg-paper/90 backdrop-blur-xl dark:bg-ink/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-ember-500 font-mono text-sm font-semibold text-ink">
            e
          </span>
          <span>Emberkit</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[13px] text-ink-muted transition-colors hover:text-ink dark:hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-ink dark:hover:text-paper"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded bg-ember-500 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ember-400"
          >
            Get Emberkit
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded border border-ink-border text-ink transition hover:bg-ink-surface dark:text-paper dark:hover:bg-ink-surface"
          >
            <span className="font-mono text-sm">{mobileOpen ? '×' : '≡'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-ink-border bg-paper px-6 py-5 dark:bg-ink md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-3 font-mono text-sm text-ink-muted transition hover:bg-ink-surface hover:text-ink dark:hover:text-paper"
              >
                {link.label}
              </a>
            ))}

            <div className="my-2 border-t border-ink-border" />

            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded px-3 py-3 text-sm font-medium text-ink-muted hover:bg-ink-surface"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded bg-ember-500 px-3 py-3 text-center text-sm font-semibold text-ink hover:bg-ember-400"
            >
              Get Emberkit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
