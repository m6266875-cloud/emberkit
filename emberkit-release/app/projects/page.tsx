import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import CreateProjectForm from '@/components/CreateProjectForm';
import ProjectsList from '@/components/ProjectsList';
import ProjectStats from '@/components/ProjectStats';

export default async function ProjectsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <main className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">

      {/* Header */}
      <nav className="border-b border-ink-border px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a
            href="/dashboard"
            className="font-mono text-xs text-ink-muted transition hover:text-ink dark:hover:text-paper"
          >
            ← dashboard
          </a>

          <span className="font-display font-semibold">Emberkit</span>
        </div>
      </nav>

      {/* Page */}
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* Heading */}
        <div className="mb-10">
          <p className="font-mono text-xs text-ember-600 dark:text-ember-400">projects</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-ink-muted">Create and manage your projects.</p>
        </div>

        {/* Create Project */}
        <section className="mb-12">
          <div className="rounded-lg border border-ink-border bg-paper p-6 dark:bg-ink-soft">
            <h2 className="mb-2 font-display text-xl font-semibold">
              Create a new project
            </h2>
            <p className="mb-6 text-sm text-ink-muted">
              Start a new project for your workspace.
            </p>

            <CreateProjectForm />
          </div>
        </section>

        {/* Project Statistics */}
        <ProjectStats projects={projects ?? []} />

        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Your projects</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {projects?.length ?? 0} project
                {(projects?.length ?? 0) !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <ProjectsList projects={projects ?? []} />
        </section>

      </div>
    </main>
  );
}
