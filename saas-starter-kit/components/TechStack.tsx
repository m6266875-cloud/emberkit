import { Code2, CreditCard, Database, Fingerprint, Triangle } from 'lucide-react';

export default function TechStack() {
  return (
    <section className="border-y border-line bg-surface/40 py-7">
      <div className="container-wide flex flex-col items-center justify-between gap-6 lg:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-[.13em] text-muted">
          Real tools.
          <br className="hidden lg:block" /> No black boxes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-5 sm:gap-x-10">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] text-canvas">
              N
            </span>
            Next.js
          </span>
          {[
            { Icon: Database, label: 'PostgreSQL' },
            { Icon: Triangle, label: 'Prisma' },
            { Icon: Fingerprint, label: 'Auth.js' },
            { Icon: CreditCard, label: 'Stripe' },
            { Icon: Code2, label: 'TypeScript' },
          ].map(({ Icon, label }) => (
            <span key={label} className="flex items-center gap-2 text-sm font-semibold">
              <Icon size={18} strokeWidth={1.7} className="text-muted" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
