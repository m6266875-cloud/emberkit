import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="pb-20 sm:pb-28">
      <div className="container-wide">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface lg:grid lg:grid-cols-[1.1fr_1fr]">
          <div className="p-8 sm:p-12">
            <p className="eyebrow">04 / Your next starting point</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-4xl">
              One foundation.
              <br />A world of possibilities.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              A complete source-code foundation, without the platform lock-in. Run it on your stack
              and build something that’s entirely yours.
            </p>
            <div className="mt-8 grid gap-3 text-[13px] sm:grid-cols-2">
              {[
                'Full TypeScript source',
                'PostgreSQL + Prisma',
                'Email/password accounts',
                'Connected project CRUD',
                'Light & dark themes',
                'Optional Stripe billing',
              ].map((item) => (
                <p key={item} className="flex items-center gap-2.5">
                  <Check size={14} className="text-ember" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-line bg-soft/60 p-8 sm:p-12 lg:border-l lg:border-t-0">
            <span className="flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider">
              <Sparkles size={12} className="text-ember" />
              The Emberkit starter
            </span>
            <div className="mt-6 flex items-end gap-2.5">
              <span className="text-6xl font-semibold leading-none tracking-[-.06em]">$49</span>
              <span className="pb-1 text-sm text-muted">one-time kit price</span>
            </div>
            <p className="mt-4 text-sm text-muted">
              Your code. Your database. Your next big thing.
            </p>
            <Link href="/signup" className="btn-primary mt-7">
              Create a free workspace
              <ArrowRight size={16} />
            </Link>
            <p className="mt-4 max-w-sm text-[11px] leading-5 text-muted">
              Template kit pricing. Creating an account does not charge you. App subscriptions are
              configured separately through your own Stripe account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
