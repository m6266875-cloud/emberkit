import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'What exactly is Emberkit?',
    answer:
      'A customizable SaaS source-code foundation. You get a landing page, account flows, a dashboard, projects, profiles, settings, and an optional subscription billing integration—not a hosted service that owns your data.',
  },
  {
    question: 'Do I still need Supabase?',
    answer:
      'No. This version uses standard PostgreSQL through Prisma. Accounts and projects live in your own database, with email/password sign-in handled by Auth.js (NextAuth). It starts with fresh accounts rather than importing old Supabase data.',
  },
  {
    question: 'Can I use a hosted PostgreSQL database?',
    answer:
      'Yes. Neon and other PostgreSQL providers work with the same connection-string setup. Use a pooled connection for the app and a direct connection for migrations. The setup guide explains both.',
  },
  {
    question: 'How do payments work?',
    answer:
      'Stripe subscriptions are optional. Add your own test keys and recurring Price ID, configure the signed webhook, and enable the Stripe customer portal. Without those keys, billing stays disabled and the rest of the workspace still works.',
  },
  {
    question: 'Can I change the design and extend the app?',
    answer:
      'Absolutely. The interface uses reusable components and Tailwind styles. Add your own models, change the colors and copy, or turn the starter into an entirely different product.',
  },
];
export default function FAQ() {
  return (
    <section id="faq" className="border-t border-line py-20 sm:py-24">
      <div className="container-wide grid gap-10 lg:grid-cols-[.9fr_1.3fr] lg:gap-20">
        <div>
          <p className="eyebrow">05 / A few good questions</p>
          <h2 className="section-heading mt-5">
            Wondering
            <br />
            about something?
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            A little clarity before the first spark.
          </p>
        </div>
        <div className="divide-y divide-line border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between gap-5 text-[15px] font-semibold">
                <span>{faq.question}</span>
                <Plus size={17} className="shrink-0 text-muted transition group-open:rotate-45" />
              </summary>
              <p className="mt-4 pr-8 text-sm leading-7 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
