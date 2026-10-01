'use client';
import { useHydrated } from '@/lib/use-hydrated';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

const links = [
  { href: '/#features', label: 'What’s inside' },
  { href: '/#workflow', label: 'The workflow' },
  { href: '/guide', label: 'Documentation' },
];
export default function Navbar() {
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-lg">
      <nav
        aria-label="Main navigation"
        className="container-wide flex h-20 items-center justify-between gap-4"
      >
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden px-2 text-[13px] font-semibold text-muted hover:text-foreground sm:block"
          >
            Log in
          </Link>
          <Link href="/signup" className="btn-primary hidden min-h-10 px-4 py-2.5 sm:inline-flex">
            Get started
            <ArrowUpRight size={15} />
          </Link>
          <button
            type="button"
            disabled={!hydrated}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-site-nav"
            className="icon-button lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>
      {open && (
        <nav
          id="mobile-site-nav"
          aria-label="Mobile navigation"
          className="border-t border-line px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {[
              ...links,
              { href: '/login', label: 'Log in' },
              { href: '/signup', label: 'Get started →' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-soft"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
