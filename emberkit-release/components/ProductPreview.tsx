export default function ProductPreview() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-lg border border-ink-border bg-ink-soft shadow-2xl shadow-ink/40">

          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-ink-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-ink-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-ink-border" />
            </div>
            <div className="ml-3 flex-1 rounded bg-ink px-3 py-1.5 font-mono text-xs text-ink-faint">
              app.yoursaas.com/dashboard
            </div>
          </div>

          <div className="grid min-h-[420px] md:grid-cols-[180px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-ink-border p-4 md:block">
              <div className="mb-8 flex items-center gap-2 px-2 font-display text-sm font-semibold text-paper">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-ember-500 font-mono text-xs text-ink">
                  e
                </span>
                Emberkit
              </div>

              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2 rounded border-l-2 border-ember-500 bg-ember-500/10 px-3 py-2 text-ember-400">
                  dashboard
                </div>
                <div className="px-3 py-2 text-ink-faint">profile</div>
                <div className="px-3 py-2 text-ink-faint">settings</div>
              </div>
            </aside>

            {/* Content */}
            <div className="p-6 sm:p-7">
              <div className="mb-7">
                <p className="font-mono text-xs text-ink-faint">dashboard</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-paper">
                  Welcome back
                </h3>
              </div>

              <div className="grid gap-px overflow-hidden rounded border border-ink-border bg-ink-border sm:grid-cols-3">
                <div className="bg-ink-soft p-4">
                  <p className="font-mono text-[11px] text-ink-faint">PLAN</p>
                  <p className="mt-2 font-display text-xl font-semibold text-paper">Pro</p>
                </div>
                <div className="bg-ink-soft p-4">
                  <p className="font-mono text-[11px] text-ink-faint">USAGE</p>
                  <p className="mt-2 font-display text-xl font-semibold text-paper">72%</p>
                </div>
                <div className="bg-ink-soft p-4">
                  <p className="font-mono text-[11px] text-ink-faint">PROJECTS</p>
                  <p className="mt-2 font-display text-xl font-semibold text-paper">12</p>
                </div>
              </div>

              <div className="mt-4 rounded border border-ink-border p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-paper">Build faster</p>
                    <p className="mt-1 text-xs text-ink-faint">
                      Everything you need to start your SaaS.
                    </p>
                  </div>
                  <div className="hidden rounded bg-ember-500 px-3 py-1.5 font-mono text-xs font-semibold text-ink sm:block">
                    Upgrade
                  </div>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink-border">
                  <div className="h-full w-[72%] rounded-full bg-ember-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
