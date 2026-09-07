import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

import SignOutButton from '@/components/SignOutButton';
import UpgradeButton from '@/components/UpgradeButton';
import ThemeToggle from '@/components/ThemeToggle';

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get all projects belonging to the logged-in user
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, name, description, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading dashboard projects:', error);
  }

  const userProjects = projects || [];

  const totalProjects = userProjects.length;

  const completedProjects = userProjects.filter(
    (project) => project.status?.toLowerCase() === 'completed'
  ).length;

  const inProgressProjects = userProjects.filter(
    (project) =>
      project.status?.toLowerCase() === 'in progress' ||
      project.status?.toLowerCase() === 'in_progress'
  ).length;

  const recentProjects = userProjects.slice(0, 5);

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">

      {/* App Shell: sidebar + top bar */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-ink-border bg-paper dark:bg-ink-soft md:flex">
          <div className="flex h-16 items-center gap-2 border-b border-ink-border px-5">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-ember-500 font-mono text-sm text-ink">
              e
            </span>
            <span className="font-display text-base font-semibold">Emberkit</span>
          </div>

          <nav className="flex-1 space-y-1 p-4 font-mono text-sm">
            <div className="flex items-center gap-2.5 rounded border-l-2 border-ember-500 bg-ember-500/10 px-3 py-2.5 text-ember-600 dark:text-ember-400">
              dashboard
            </div>
            <Link
              href="/projects"
              className="block rounded px-3 py-2.5 text-ink-muted transition hover:bg-ink-surface hover:text-ink dark:hover:text-paper"
            >
              projects
            </Link>
            <Link
              href="/profile"
              className="block rounded px-3 py-2.5 text-ink-muted transition hover:bg-ink-surface hover:text-ink dark:hover:text-paper"
            >
              profile
            </Link>
            <Link
              href="/settings"
              className="block rounded px-3 py-2.5 text-ink-muted transition hover:bg-ink-surface hover:text-ink dark:hover:text-paper"
            >
              settings
            </Link>
          </nav>

          <div className="border-t border-ink-border p-4">
            <p className="truncate font-mono text-xs text-ink-faint">{user.email}</p>
            <div className="mt-3">
              <SignOutButton />
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex-1 md:pl-56">

          {/* Top bar (mobile-friendly) */}
          <header className="flex h-16 items-center justify-between border-b border-ink-border px-6 md:hidden">
            <Link href="/dashboard" className="font-display text-lg font-semibold">
              Emberkit
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/projects" className="text-sm text-ink-muted">Projects</Link>
              <Link href="/profile" className="text-sm text-ink-muted">Profile</Link>
              <SignOutButton />
            </div>
          </header>

          <div className="hidden items-center justify-end border-b border-ink-border px-8 py-3 md:flex">
            <ThemeToggle />
          </div>

          {/* Content */}
          <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">

            {/* Welcome */}
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs text-ember-600 dark:text-ember-400">
                  dashboard
                </p>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Welcome back
                </h1>
                <p className="mt-2 text-ink-muted">
                  Here&apos;s what&apos;s happening with your workspace.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded bg-ember-500 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-ember-400"
              >
                + New Project
              </Link>
            </div>

            {/* Stats */}
            <div className="mb-10 grid grid-cols-1 gap-px overflow-hidden rounded border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">

              <div className="bg-paper p-6 dark:bg-ink-soft">
                <p className="font-mono text-xs text-ink-faint">total projects</p>
                <p className="mt-3 font-display text-3xl font-semibold">{totalProjects}</p>
                <p className="mt-2 text-xs text-ink-muted">Projects in your workspace</p>
              </div>

              <div className="bg-paper p-6 dark:bg-ink-soft">
                <p className="font-mono text-xs text-ink-faint">completed</p>
                <p className="mt-3 font-display text-3xl font-semibold text-emerald-500">{completedProjects}</p>
                <p className="mt-2 text-xs text-ink-muted">Successfully completed</p>
              </div>

              <div className="bg-paper p-6 dark:bg-ink-soft">
                <p className="font-mono text-xs text-ink-faint">in progress</p>
                <p className="mt-3 font-display text-3xl font-semibold text-ember-500">{inProgressProjects}</p>
                <p className="mt-2 text-xs text-ink-muted">Currently active</p>
              </div>

              <div className="bg-paper p-6 dark:bg-ink-soft">
                <p className="font-mono text-xs text-ink-faint">current plan</p>
                <p className="mt-3 font-display text-3xl font-semibold">Free</p>
                <p className="mt-2 text-xs text-ink-muted">Upgrade when you&apos;re ready</p>
              </div>

            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

              {/* Recent Projects */}
              <div className="overflow-hidden rounded-lg border border-ink-border bg-paper dark:bg-ink-soft lg:col-span-2">

                <div className="flex items-center justify-between border-b border-ink-border p-6">
                  <div>
                    <h2 className="font-display text-lg font-semibold">Recent projects</h2>
                    <p className="mt-1 text-sm text-ink-muted">Your latest projects</p>
                  </div>
                  <Link
                    href="/projects"
                    className="font-mono text-xs text-ember-600 hover:underline dark:text-ember-400"
                  >
                    view all →
                  </Link>
                </div>

                <div className="divide-y divide-ink-border">
                  {recentProjects.length === 0 ? (
                    <div className="p-10 text-center">
                      <p className="font-mono text-xs text-ink-faint">no projects yet</p>
                      <h3 className="mt-3 font-display font-semibold">Create your first project</h3>
                      <p className="mb-5 mt-1 text-sm text-ink-muted">
                        Get started building your workspace.
                      </p>
                      <Link
                        href="/projects"
                        className="inline-flex rounded bg-ember-500 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ember-400"
                      >
                        Create project
                      </Link>
                    </div>
                  ) : (
                    recentProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between gap-4 p-5 transition hover:bg-ink-surface/40"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-ink-border font-mono text-xs text-ink-muted">
                            {project.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-medium">{project.name}</h3>
                            <p className="truncate text-sm text-ink-muted">
                              {project.description || 'No description'}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[11px] ${
                            project.status?.toLowerCase() === 'completed'
                              ? 'border-emerald-800/60 bg-emerald-950/40 text-emerald-400'
                              : 'border-ember-800/60 bg-ember-950/30 text-ember-400'
                          }`}
                        >
                          {project.status || 'In Progress'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">

                <div className="rounded-lg border border-ink-border bg-paper p-6 dark:bg-ink-soft">
                  <h2 className="font-display text-lg font-semibold">Quick actions</h2>
                  <p className="mb-5 mt-1 text-sm text-ink-muted">
                    Manage your workspace quickly.
                  </p>

                  <div className="space-y-2">
                    <Link
                      href="/projects"
                      className="flex items-center gap-3 rounded border border-ink-border p-4 transition hover:border-ember-500/60 hover:bg-ember-500/5"
                    >
                      <span className="font-mono text-ember-500">+</span>
                      <div>
                        <p className="text-sm font-medium">Create project</p>
                        <p className="text-xs text-ink-muted">Start something new</p>
                      </div>
                    </Link>

                    <Link
                      href="/projects"
                      className="flex items-center gap-3 rounded border border-ink-border p-4 transition hover:border-ember-500/60 hover:bg-ember-500/5"
                    >
                      <span className="font-mono text-ink-faint">□</span>
                      <div>
                        <p className="text-sm font-medium">View projects</p>
                        <p className="text-xs text-ink-muted">Manage your projects</p>
                      </div>
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded border border-ink-border p-4 transition hover:border-ember-500/60 hover:bg-ember-500/5"
                    >
                      <span className="font-mono text-ink-faint">@</span>
                      <div>
                        <p className="text-sm font-medium">Edit profile</p>
                        <p className="text-xs text-ink-muted">Update your information</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Upgrade Card */}
                <div className="rounded-lg border border-ember-800/40 bg-ink p-6 text-paper">
                  <p className="font-mono text-xs text-ember-400">upgrade</p>
                  <h2 className="mt-2 font-display text-lg font-semibold">
                    Unlock more with Pro
                  </h2>
                  <p className="mb-5 mt-2 text-sm text-ink-muted">
                    Get access to advanced features and take your workspace
                    to the next level.
                  </p>
                  <UpgradeButton />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
