const features = [
  {
    tag: 'auth',
    title: 'Authentication',
    description:
      'Production-ready signup, login, logout and protected routes powered by Supabase.',
  },
  {
    tag: 'profile',
    title: 'User profiles',
    description:
      'Give every user a personal profile with editable information and persistent data.',
  },
  {
    tag: 'settings',
    title: 'Settings',
    description:
      'A clean account settings system ready for customization and expansion.',
  },
  {
    tag: 'theme',
    title: 'Dark mode',
    description:
      'Beautiful light and dark themes with a reusable theme provider.',
  },
  {
    tag: 'dashboard',
    title: 'Dashboard',
    description:
      'A protected SaaS dashboard foundation that you can customize for your product.',
  },
  {
    tag: 'billing',
    title: 'Subscriptions',
    description:
      'Payment-ready architecture designed for SaaS plans and subscription workflows.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Stop rebuilding the boring parts.
          </h2>
          <p className="mt-4 text-ink-muted">
            Start with a solid foundation and spend your time building the
            features that make your product unique.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-paper p-7 transition-colors hover:bg-ink-surface/40 dark:bg-ink"
            >
              <p className="font-mono text-xs text-ember-600 dark:text-ember-400">
                {feature.tag}
              </p>

              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-ink-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
