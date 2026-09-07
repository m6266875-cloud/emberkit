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
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Questions, answered.
        </h2>

        <div className="mt-10 divide-y divide-ink-border border-t border-ink-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                <span>{faq.question}</span>
                <span className="font-mono text-ink-faint transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 pr-8 text-sm leading-7 text-ink-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
