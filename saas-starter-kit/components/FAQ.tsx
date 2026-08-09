const faqs = [
  {
    question: 'What is Emberkit?',
    answer:
      'Emberkit is a SaaS starter kit that gives developers a ready-made foundation for building modern web applications.',
  },
  {
    question: 'What technologies does it use?',
    answer:
      'The current stack includes Next.js, TypeScript, Supabase and Tailwind CSS, with deployment support for platforms such as Vercel.',
  },
  {
    question: 'Can I customize Emberkit?',
    answer:
      'Yes. The source code is designed to be customized so you can replace the UI, database structure and product-specific functionality.',
  },
  {
    question: 'Can I use it for my own SaaS?',
    answer:
      'Yes. Emberkit is designed as a foundation that you can adapt to your own SaaS idea.',
  },
  {
    question: 'Does Emberkit include payments?',
    answer:
      'The architecture is designed to be subscription-ready. You can connect your preferred payment provider and use your own account and credentials.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-gray-200 p-6 dark:border-gray-800"
            >
              <summary className="cursor-pointer list-none font-semibold">
                <div className="flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-xl text-gray-400 transition group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <p className="mt-4 pr-8 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}