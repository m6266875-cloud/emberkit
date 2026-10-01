import Link from 'next/link';
import {
  ArrowUpRight,
  CircleCheck,
  CreditCard,
  Database,
  Fingerprint,
  FolderKanban,
  Palette,
  ShieldCheck,
} from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="section-space">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">01 / A stronger foundation</p>
            <h2 className="section-heading mt-5">
              The boring parts,
              <br />
              <span className="text-muted">beautifully taken care of.</span>
            </h2>
          </div>
          <p className="max-w-[340px] text-sm leading-7 text-muted">
            Authentication, a real workspace, and a database you control. Not disconnected
            templates—one considered starting point.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr_1fr]">
          <article className="relative overflow-hidden rounded-2xl bg-[#1e2520] p-7 text-[#f8f9f5]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#f79573]">
              <Database size={22} strokeWidth={1.6} />
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">
              Your database.
              <br />
              Your rules.
            </h3>
            <p className="mt-3 text-[13px] leading-6 text-[#a7b1a6]">
              Standard PostgreSQL, typed Prisma queries, and versioned migrations. No
              platform-specific client in the browser.
            </p>
            <div className="mt-7 rounded-xl border border-white/10 bg-[#171d19] p-4 font-mono text-[10px] leading-6">
              <p className="text-[#91a995]">{'// built on your own data'}</p>
              <p>
                <span className="text-[#b4a2e1]">const</span> project ={' '}
                <span className="text-[#b4a2e1]">await</span>
              </p>
              <p className="pl-2">database.project.create({'{'}</p>
              <p className="pl-4">data: {'{'}</p>
              <p className="pl-6">
                name: <span className="text-[#f79573]">{'"Your next idea"'}</span>,
              </p>
              <p className="pl-6">userId: user.id</p>
              <p className="pl-4">{'}'}</p>
              <p className="pl-2">{'}'});</p>
            </div>
            <Link
              href="/guide"
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-[#f79573]"
            >
              Meet your new stack
              <ArrowUpRight size={14} />
            </Link>
          </article>
          <article className="panel overflow-hidden p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              <Fingerprint size={22} strokeWidth={1.6} />
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">
              A warm welcome.
              <br />A secure way in.
            </h3>
            <p className="mt-3 text-[13px] leading-6 text-muted">
              Email/password accounts, hashed passwords, and signed sessions. Thoughtful details,
              right from the first hello.
            </p>
            <div className="mt-7 rounded-xl border border-line bg-canvas p-4">
              <p className="text-[11px] font-semibold">Welcome back, builder.</p>
              <div className="mt-3 rounded-lg border border-line bg-surface p-2.5 text-[10px] text-muted">
                you@your-next-idea.com
              </div>
              <div className="mt-2 rounded-lg border border-line bg-surface p-2.5 text-[10px] text-muted">
                ••••••••••••
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-foreground p-2.5 text-[10px] font-semibold text-canvas">
                You’re in
                <CircleCheck size={11} />
              </div>
            </div>
          </article>
          <article className="panel overflow-hidden p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ffede6] text-[#b34225] dark:bg-ember/15 dark:text-[#ffaf8c]">
              <FolderKanban size={22} strokeWidth={1.6} />
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">
              Ideas, organized.
              <br />
              Progress, visible.
            </h3>
            <p className="mt-3 text-[13px] leading-6 text-muted">
              A personal dashboard, searchable projects, and profiles. The everyday experience,
              already connected to your database.
            </p>
            <div className="mt-7 space-y-2">
              {[
                { text: 'Map out the big idea', done: true },
                { text: 'Build something real', done: true },
                { text: 'Share it with the world', done: false },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas p-3 text-[10px]"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${item.done ? 'bg-emerald-100 text-emerald-800' : 'border border-line'}`}
                  >
                    {item.done && <CircleCheck size={12} />}
                  </span>
                  <span className={item.done ? 'text-muted' : 'font-medium'}>{item.text}</span>
                </div>
              ))}
            </div>
            <Link
              href="/preview"
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold"
            >
              Look around the workspace
              <ArrowUpRight size={14} />
            </Link>
          </article>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            {
              Icon: CreditCard,
              title: 'Billing, when you’re ready',
              text: 'Optional Stripe subscriptions and a customer portal.',
            },
            {
              Icon: Palette,
              title: 'A look that’s yours',
              text: 'Responsive layouts, light/dark themes, and reusable styles.',
            },
            {
              Icon: ShieldCheck,
              title: 'Boundaries built in',
              text: 'Server-side validation and per-user project access.',
            },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border border-line p-5">
              <Icon size={20} className="mt-0.5 shrink-0 text-muted" strokeWidth={1.6} />
              <div>
                <h3 className="text-[13px] font-semibold">{title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
