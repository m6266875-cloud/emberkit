export default function TechStack() {
  const technologies = [
    'Next.js',
    'TypeScript',
    'Supabase',
    'Tailwind CSS',
    'Vercel',
  ];

  return (
    <section className="border-y border-gray-200 py-12 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
          Built with modern technologies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {technologies.map((technology) => (
            <div
              key={technology}
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            >
              {technology}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}