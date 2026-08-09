export default function WhyEmberkit() {
  return (
    <section className="overflow-hidden bg-gray-950 py-24 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
            Why Emberkit?
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Build your product,
            <span className="block text-indigo-400">
              not your boilerplate.
            </span>
          </h2>

          <p className="mt-6 max-w-xl leading-7 text-gray-400">
            Authentication, database integration, profiles, settings and
            deployment are already structured for you. Focus on your actual
            product idea.
          </p>

          <div className="mt-8 space-y-4">
            {[
              'Clean and customizable architecture',
              'Modern Next.js App Router',
              'Supabase authentication and database',
              'Deployment-ready for Vercel',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-sm text-indigo-400">
                  ✓
                </span>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-semibold">Your SaaS</span>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                Production Ready
              </span>
            </div>

            <div className="space-y-3">
              {[
                ['Authentication', 'Complete'],
                ['Database', 'Connected'],
                ['Dashboard', 'Ready'],
                ['Profile', 'Ready'],
                ['Settings', 'Ready'],
              ].map(([name, status]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 p-4"
                >
                  <span className="text-sm text-gray-300">{name}</span>
                  <span className="text-xs text-green-400">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}