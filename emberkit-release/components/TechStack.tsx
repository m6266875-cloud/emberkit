export default function TechStack() {
  const technologies = [
    { name: 'Next.js', detail: 'App Router' },
    { name: 'TypeScript', detail: 'Strict mode' },
    { name: 'Supabase', detail: 'Auth + Postgres' },
    { name: 'Tailwind CSS', detail: 'v3' },
    { name: 'Stripe', detail: 'Billing' },
    { name: 'Vercel', detail: 'Deploy' },
  ];

  return (
    <section className="border-b border-ink-border/60 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-8 font-mono text-xs text-ink-faint">
          // built with
        </p>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded border border-ink-border bg-ink-border sm:grid-cols-3 lg:grid-cols-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-paper px-4 py-5 transition hover:bg-ink-surface/60 dark:bg-ink"
            >
              <p className="font-display text-sm font-semibold text-ink">
                {tech.name}
              </p>
              <p className="mt-1 font-mono text-[11px] text-ink-faint">
                {tech.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
