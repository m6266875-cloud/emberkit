import Link from 'next/link';
import { ArrowUpRight, FolderKanban, LayoutDashboard, UserRound } from 'lucide-react';

export default function Showcase() {
  return (
    <section className="section-space">
      <div className="container-wide">
        <p className="eyebrow">03 / Not just a landing page</p>
        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="section-heading">
            Every corner.
            <br />
            <span className="text-muted">Considered.</span>
          </h2>
          <Link href="/preview" className="btn-secondary self-start">
            Take it for a spin
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: LayoutDashboard,
              label: 'The overview',
              title: 'See the bigger picture.',
              text: 'Real project counts, recent activity, and your next steps—all in one place.',
              href: '/preview',
            },
            {
              Icon: FolderKanban,
              label: 'The project space',
              title: 'Keep ideas moving.',
              text: 'Create, search, filter, and update projects. Move from draft to done, your way.',
              href: '/preview?view=projects',
            },
            {
              Icon: UserRound,
              label: 'The personal touch',
              title: 'Make yourself at home.',
              text: 'A profile, appearance preferences, and account security that belong to you.',
              href: '/preview?view=profile',
            },
          ].map(({ Icon, label, title, text, href }) => (
            <Link
              key={title}
              href={href}
              className="group panel p-7 transition hover:-translate-y-1 hover:border-ember/40"
            >
              <div className="flex items-center justify-between">
                <Icon size={25} strokeWidth={1.4} className="text-muted" />
                <ArrowUpRight size={18} className="text-muted transition group-hover:text-ember" />
              </div>
              <p className="eyebrow mt-9">{label}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
