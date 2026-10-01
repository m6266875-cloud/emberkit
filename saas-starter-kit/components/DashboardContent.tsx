import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleCheck,
  Database,
  Flame,
  FolderKanban,
  Plus,
  UserRound,
} from 'lucide-react';
import ProjectStats from '@/components/ProjectStats';
import StatusBadge from '@/components/StatusBadge';
import type { WorkspaceUser } from '@/components/AppShell';
import { projectCounts, type ProjectRecord } from '@/lib/projects';

export default function DashboardContent({
  user,
  projects,
  demo = false,
}: {
  user: WorkspaceUser;
  projects: ProjectRecord[];
  demo?: boolean;
}) {
  const counts = projectCounts(projects);
  const completion = counts.total ? Math.round((counts.completed / counts.total) * 100) : 0;
  const route = (view: string) => (demo ? `/preview?view=${view}` : `/${view}`);
  const createHref = `${route('projects')}${demo ? '&' : '?'}new=1`;
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Your workspace, at a glance</p>
          <h1 className="page-heading mt-3">
            Welcome back, {user.name.split(' ')[0]}
            <span className="text-ember">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            A good day to turn your next idea into something real.
          </p>
        </div>
        <Link href={createHref} className="btn-primary self-start">
          <Plus size={16} />
          New project
        </Link>
      </div>
      <ProjectStats projects={projects} />
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_310px]">
        <div className="min-w-0 space-y-6">
          <section className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line p-5 sm:px-6">
              <div>
                <h2 className="text-[15px] font-semibold tracking-tight">Recent projects</h2>
                <p className="mt-1 text-[11px] text-muted">The things you’ve been working on.</p>
              </div>
              <Link
                href={route('projects')}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted hover:text-foreground"
              >
                View all
                <ArrowUpRight size={13} />
              </Link>
            </div>
            {projects.length ? (
              <div className="divide-y divide-line">
                {projects.slice(0, 5).map((project, index) => (
                  <Link
                    key={project.id}
                    href={
                      demo
                        ? `/preview?view=projects&project=${project.id}`
                        : `/projects/${project.id}`
                    }
                    className="group flex items-center justify-between gap-3 px-5 py-5 transition hover:bg-canvas sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${index % 2 ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-[#ffede6] text-[#b34225] dark:bg-ember/15 dark:text-[#ffaf8c]'}`}
                      >
                        <FolderKanban size={19} strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold">{project.name}</p>
                        <p className="mt-1 truncate text-[11px] text-muted">
                          {project.description || 'Your next great idea, in the making.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <StatusBadge status={project.status} />
                      <ArrowUpRight
                        size={14}
                        className="hidden text-muted group-hover:text-ember sm:block"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-muted">
                  <FolderKanban size={26} strokeWidth={1.3} />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  Every great thing starts somewhere.
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-muted">
                  Your workspace is ready. Give your first idea a name and start making progress.
                </p>
                <Link href={createHref} className="btn-secondary mt-5">
                  <Plus size={14} />
                  Create your first project
                </Link>
              </div>
            )}
          </section>
          <section className="relative overflow-hidden rounded-2xl bg-[#1e2520] p-6 text-[#f8f9f5] sm:p-7">
            <div className="relative z-10 max-w-md">
              <p className="font-mono text-[9px] uppercase tracking-wider text-[#a7b1a6]">
                A little momentum goes a long way
              </p>
              <h2 className="mt-3 text-xl font-medium tracking-tight">
                Build something worth sharing.
              </h2>
              <p className="mt-3 max-w-sm text-xs leading-6 text-[#a7b1a6]">
                The foundations are connected. Explore the guide, make the interface yours, and keep
                the good ideas moving.
              </p>
              <Link
                href="/guide"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#f79573]"
              >
                Find your next step
                <ArrowRight size={14} />
              </Link>
            </div>
            <Flame
              size={130}
              strokeWidth={0.8}
              className="absolute -bottom-9 -right-5 text-[#f79573]/20"
            />
          </section>
        </div>
        <div className="min-w-0 space-y-6">
          <section className="panel p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">A little progress</h2>
              <CircleCheck size={16} className="text-muted" />
            </div>
            <div className="mt-6 flex items-end justify-between">
              <p className="text-[38px] font-semibold leading-none tracking-tight">
                {completion}
                <span className="ml-1 text-lg text-muted">%</span>
              </p>
              <p className="text-[10px] text-muted">
                {counts.completed} of {counts.total} completed
              </p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-soft">
              <div
                className="h-full rounded-full bg-ember transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-4 text-[11px] leading-5 text-muted">
              {counts.total
                ? 'Small steps count. Keep your projects moving at your own pace.'
                : 'Create a project to start tracking your progress.'}
            </p>
          </section>
          <section className="panel p-6">
            <h2 className="text-sm font-semibold">Make yourself at home</h2>
            <div className="mt-5 space-y-4">
              {[
                {
                  done: true,
                  title: demo ? 'Explore the sample account' : 'Create your account',
                  href: route('profile'),
                },
                {
                  done: Boolean(user.username),
                  title: 'Add your personal touch',
                  href: route('profile'),
                },
                { done: projects.length > 0, title: 'Start your first project', href: createHref },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 text-[11px]"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${item.done ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/35 dark:text-emerald-200' : 'border border-line text-muted'}`}
                  >
                    {item.done ? (
                      <Check size={12} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-line" />
                    )}
                  </span>
                  {item.title}
                  <ArrowUpRight size={12} className="ml-auto text-muted" />
                </Link>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-line p-5">
            <p className="eyebrow text-[9px]">Quick links</p>
            <div className="mt-4 space-y-4">
              {[
                { href: route('profile'), label: 'Edit your profile', Icon: UserRound },
                { href: '/guide', label: 'Read the setup guide', Icon: BookOpen },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-2.5 text-xs text-muted hover:text-foreground"
                >
                  <Icon size={15} />
                  {label}
                  <ArrowUpRight size={12} className="ml-auto" />
                </Link>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[10px] text-muted">
              <Database size={13} />
              {demo ? 'Preview mode · no database writes' : 'Your PostgreSQL workspace'}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
