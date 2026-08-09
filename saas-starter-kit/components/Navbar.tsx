'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm transition-transform duration-300 hover:scale-110">
            E
          </span>

          <span>Emberkit</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            Features
          </a>

          <a
            href="#showcase"
            className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            Showcase
          </a>

          <a
            href="#pricing"
            className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            Pricing
          </a>

          <a
            href="#faq"
            className="text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          >
            FAQ
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20"
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
          >
            {mobileOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white/95 px-6 py-5 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95 md:hidden">
          <div className="flex flex-col gap-2">

            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
            >
              Features
            </a>

            <a
              href="#showcase"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
            >
              Showcase
            </a>

            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
            >
              Pricing
            </a>

            <a
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-indigo-400"
            >
              FAQ
            </a>

            <div className="my-2 border-t border-gray-200 dark:border-gray-800" />

            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Get Emberkit →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}