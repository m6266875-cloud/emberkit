export default function WhyEmberkit() {
  return (
    <section className="overflow-hidden border-y border-ink-border/60 bg-ink py-24 text-paper">
      <div className="mx-auto grid max-w-5xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Build your product, not your boilerplate.
          </h2>

          <p className="mt-6 max-w-md leading-7 text-ink-muted">
            Authentication, database integration, profiles, settings and
            deployment are already structured for you. Focus on your actual
            product idea.
          </p>

          <div className="mt-9 space-y-4">
            {[
              'Clean and customizable architecture',
              'Modern Next.js App Router',
              'Supabase authentication and database',
              'Deployment-ready for Vercel',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />
                <span className="text-sm text-ink-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 -z-10 rounded-full bg-ember-500/10 blur-[100px]" />

          <div className="rounded-lg border border-ink-border bg-ink-soft p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs text-ink-faint">status.json</span>
              <span className="rounded-full border border-emerald-800/60 bg-emerald-950/40 px-2.5 py-1 font-mono text-[11px] text-emerald-400">
                production ready
              </span>
            </div>

            <div className="space-y-2">
              {[
                ['authentication', 'complete'],
                ['database', 'connected'],
                ['dashboard', 'ready'],
                ['profile', 'ready'],
                ['settings', 'ready'],
              ].map(([name, status]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded border border-ink-border bg-ink px-4 py-3"
                >
                  <span className="font-mono text-xs text-ink-muted">{name}</span>
                  <span className="font-mono text-xs text-emerald-400">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
