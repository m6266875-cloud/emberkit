import Link from 'next/link';

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-ink-border bg-ink px-8 py-16 text-center sm:px-16">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500/20 blur-[100px]" />

        <div className="relative">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold text-paper sm:text-5xl">
            Your next SaaS starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-ink-muted">
            Stop rebuilding authentication, dashboards and settings from
            scratch. Start with Emberkit.
          </p>

          <Link
            href="/signup"
            className="mt-9 inline-flex rounded bg-ember-500 px-7 py-3.5 font-semibold text-ink transition hover:bg-ember-400"
          >
            Get Emberkit
          </Link>
        </div>
      </div>
    </section>
  );
}
