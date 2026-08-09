import Link from 'next/link';

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-indigo-600 px-8 py-16 text-center text-white sm:px-16">
        <div className="animate-ember-pulse absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="animate-ember-pulse absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
            Start building
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-5xl">
            Your next SaaS starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-indigo-100">
            Stop rebuilding authentication, dashboards and settings from
            scratch. Start with Emberkit.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
          >
            Get Emberkit →
          </Link>
        </div>
      </div>
    </section>
  );
}