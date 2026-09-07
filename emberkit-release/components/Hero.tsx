import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-border/60 pt-36 pb-24 sm:pt-44 sm:pb-32">
      {/* Background texture */}
      <div className="absolute inset-0 -z-10 bg-grid-paper dark:bg-grid-ink [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-ember-500/10 blur-[100px]" />

      <div className="mx-auto max-w-5xl px-6">
        <div className="animate-ember-rise mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-ink-border bg-ink-surface/60 px-3 py-1.5 font-mono text-xs text-ink-muted dark:bg-ink-surface">
          <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
          v1.0.0 — now with Stripe subscriptions
        </div>

        <h1 className="animate-ember-rise mx-auto max-w-3xl text-center font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Ship your SaaS this weekend, not this quarter.
        </h1>

        <p className="animate-ember-rise mx-auto mt-7 max-w-xl text-center text-lg leading-7 text-ink-muted">
          Emberkit is a production-ready Next.js and Supabase foundation —
          authentication, profiles, a real dashboard and subscription
          billing, wired up and ready to extend.
        </p>

        <div className="animate-ember-rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="w-full rounded bg-ember-500 px-7 py-3.5 text-center font-semibold text-ink transition hover:bg-ember-400 sm:w-auto"
          >
            Get Emberkit
          </Link>

          <a
            href="#showcase"
            className="w-full rounded border border-ink-border px-7 py-3.5 text-center font-semibold text-ink transition hover:border-ink-faint hover:bg-ink-surface/50 dark:text-paper sm:w-auto"
          >
            See how it's built
          </a>
        </div>

        <div className="animate-ember-rise mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs text-ink-faint">
          <span>Next.js 14</span>
          <span className="h-1 w-1 rounded-full bg-ink-border" />
          <span>Supabase</span>
          <span className="h-1 w-1 rounded-full bg-ink-border" />
          <span>Stripe</span>
          <span className="h-1 w-1 rounded-full bg-ink-border" />
          <span>Tailwind CSS</span>
          <span className="h-1 w-1 rounded-full bg-ink-border" />
          <span>TypeScript</span>
        </div>
      </div>
    </section>
  );
}
