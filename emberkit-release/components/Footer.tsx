import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ink-border/60 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display font-semibold text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-ember-500 font-mono text-xs text-ink">
              e
            </span>
            Emberkit
          </Link>

          <p className="mt-2 text-sm text-ink-muted">
            Build your SaaS. Ship faster.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 font-mono text-xs text-ink-faint">
          <a href="#features" className="hover:text-ink dark:hover:text-paper">
            features
          </a>
          <a href="#pricing" className="hover:text-ink dark:hover:text-paper">
            pricing
          </a>
          <a href="#faq" className="hover:text-ink dark:hover:text-paper">
            faq
          </a>
          <Link href="/login" className="hover:text-ink dark:hover:text-paper">
            login
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl border-t border-ink-border/60 px-6 pt-6 font-mono text-xs text-ink-faint">
        © {new Date().getFullYear()} Emberkit. All rights reserved.
      </div>
    </footer>
  );
}
