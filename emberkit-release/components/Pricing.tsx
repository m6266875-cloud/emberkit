import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="pricing" className="border-y border-ink-border/60 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            One starter kit. Unlimited possibilities.
          </h2>
          <p className="mt-4 text-ink-muted">
            Get the complete source code and start building your SaaS.
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-lg border border-ink-border md:grid-cols-[1fr_1.1fr]">
          <div className="bg-ink-surface/40 p-8 dark:bg-ink-soft">
            <p className="font-mono text-xs text-ember-600 dark:text-ember-400">emberkit</p>

            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-5xl font-semibold text-ink">$49</span>
              <span className="mb-2 text-sm text-ink-muted">one-time</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-ink-muted">
              A complete foundation for your next SaaS project.
            </p>

            <Link
              href="/signup"
              className="mt-8 block w-full rounded bg-ember-500 px-5 py-3 text-center font-semibold text-ink transition hover:bg-ember-400"
            >
              Get Emberkit
            </Link>

            <p className="mt-4 text-xs text-ink-faint">
              Payment integration can be connected to your preferred provider.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-ink-border p-px sm:grid-cols-2">
            {[
              'Full source code',
              'Next.js + TypeScript',
              'Supabase authentication',
              'User profiles',
              'Dashboard',
              'Settings',
              'Dark mode',
              'Deployment-ready structure',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-paper px-5 py-4 text-sm text-ink dark:bg-ink">
                <span className="font-mono text-ember-500">+</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
