import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Terminal } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Connect your foundation.',
    text: 'Create a hosted PostgreSQL database, add your connection URLs, and apply the included migration.',
  },
  {
    number: '02',
    title: 'Make room for your idea.',
    text: 'Give the interface your personality. Build on typed models, reusable components, and clear API routes.',
  },
  {
    number: '03',
    title: 'Get to the good part.',
    text: 'Create your first account, add a project, and start turning “what if” into something real.',
  },
];
export default function WhyEmberkit() {
  return (
    <section id="workflow" className="section-space border-y border-line bg-soft/60">
      <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow">02 / Less friction, more momentum</p>
          <h2 className="section-heading mt-5">
            A shorter path
            <br />
            from <span className="text-ember">idea to launch.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            The foundation shouldn’t be the project. Get it connected, make it yours, and spend your
            energy where it counts.
          </p>
          <Link href="/guide" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
            Follow the setup guide
            <ArrowUpRight size={16} />
          </Link>
          <div className="mt-9 max-w-md overflow-hidden rounded-xl border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-[10px] text-muted">
              <Terminal size={13} />
              YOUR FIRST FEW COMMANDS
            </div>
            <div className="space-y-3 p-5 font-mono text-[11px]">
              {['npm install', 'npm run db:deploy', 'npm run dev'].map((command) => (
                <p key={command} className="flex items-center justify-between">
                  <span>
                    <span className="mr-3 text-ember">$</span>
                    {command}
                  </span>
                  <Check size={13} className="text-muted" />
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="self-center">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex gap-5 border-b border-line py-7 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-[11px] text-muted">
                {step.number}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-muted">{step.text}</p>
                {index === 2 && (
                  <Link
                    href="/signup"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold"
                  >
                    Let’s get started
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
