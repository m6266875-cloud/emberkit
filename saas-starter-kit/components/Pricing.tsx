import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-24 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Simple pricing
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            One starter kit. Unlimited possibilities.
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Get the complete source code and start building your SaaS.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md rounded-3xl border border-indigo-200 bg-white p-8 shadow-xl shadow-indigo-500/10 dark:border-indigo-900 dark:bg-gray-950">
          <p className="font-semibold text-indigo-600">Emberkit</p>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-5xl font-bold">$49</span>
            <span className="mb-2 text-gray-500">one-time</span>
          </div>

          <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
            A complete foundation for your next SaaS project.
          </p>

          <div className="my-8 space-y-4">
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
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="text-indigo-600">✓</span>
                {item}
              </div>
            ))}
          </div>

          <Link
            href="/signup"
            className="block w-full rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
          >
            Get Emberkit →
          </Link>

          <p className="mt-4 text-center text-xs text-gray-500">
            Payment integration can be connected to your preferred provider.
          </p>
        </div>
      </div>
    </section>
  );
}