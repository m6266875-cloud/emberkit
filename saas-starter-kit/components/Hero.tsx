import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="animate-ember-fade-up mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
          ⚡ The modern SaaS starter kit for developers
        </div>

        <h1 className="animate-ember-fade-up mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-6xl lg:text-7xl">
          Ship your SaaS
          <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            this weekend.
          </span>
        </h1>

        <p className="animate-ember-fade-up mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          A production-ready Next.js + Supabase starter kit with
          authentication, profiles, settings, dashboards and
          subscription-ready architecture.
        </p>

        <div className="animate-ember-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Get Emberkit →
          </Link>

          <a
            href="#showcase"
            className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            Explore features
          </a>
        </div>

        <div className="animate-ember-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-500">
          <span>✓ TypeScript</span>
          <span>✓ Supabase</span>
          <span>✓ Tailwind CSS</span>
          <span>✓ Vercel Ready</span>
        </div>
      </div>
    </section>
  );
}