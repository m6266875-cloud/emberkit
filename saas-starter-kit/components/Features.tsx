const features = [
  {
    icon: '🔐',
    title: 'Authentication',
    description:
      'Production-ready signup, login, logout and protected routes powered by Supabase.',
  },
  {
    icon: '👤',
    title: 'User Profiles',
    description:
      'Give every user a personal profile with editable information and persistent data.',
  },
  {
    icon: '⚙️',
    title: 'Settings',
    description:
      'A clean account settings system ready for customization and expansion.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode',
    description:
      'Beautiful light and dark themes with a reusable theme provider.',
  },
  {
    icon: '📊',
    title: 'Dashboard',
    description:
      'A protected SaaS dashboard foundation that you can customize for your product.',
  },
  {
    icon: '💳',
    title: 'Subscriptions',
    description:
      'Payment-ready architecture designed for SaaS plans and subscription workflows.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Everything you need
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Stop rebuilding the boring parts.
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Start with a solid foundation and spend your time building the
            features that make your product unique.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:rotate-3 group-hover:scale-110 dark:bg-indigo-950/50">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}