export default function Showcase() {
  return (
    <section id="showcase" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A foundation you can actually build on.
          </h2>
          <p className="mt-4 text-ink-muted">
            Every part of Emberkit is designed to be understandable,
            customizable and ready for your own SaaS idea.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded border border-ink-border bg-ink-border md:grid-cols-2">
          <div className="bg-paper p-8 dark:bg-ink">
            <p className="font-mono text-xs text-ember-600 dark:text-ember-400">architecture</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">
              Modular by design
            </h3>
            <p className="mt-3 leading-7 text-ink-muted">
              Keep your application organized with clear routes,
              components and server-side utilities.
            </p>

            <div className="mt-7 rounded border border-ink-border bg-ink-soft p-5 font-mono text-sm text-ink-muted dark:bg-ink">
              <div className="text-paper">app/</div>
              <div className="pl-4">dashboard/</div>
              <div className="pl-4">profile/</div>
              <div className="pl-4">settings/</div>
              <div className="text-paper">components/</div>
              <div className="pl-4">ProfileForm.tsx</div>
              <div className="pl-4">ThemeProvider.tsx</div>
            </div>
          </div>

          <div className="bg-paper p-8 dark:bg-ink">
            <p className="font-mono text-xs text-ember-600 dark:text-ember-400">deployment</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">
              Live in minutes
            </h3>
            <p className="mt-3 leading-7 text-ink-muted">
              Connect your repository to Vercel, configure your environment
              variables and launch your SaaS.
            </p>

            <div className="mt-7 rounded border border-ink-border p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-muted">
                  production deployment
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  live
                </span>
              </div>

              <div className="mt-5 h-1.5 rounded-full bg-ink-border">
                <div className="h-1.5 w-full rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
