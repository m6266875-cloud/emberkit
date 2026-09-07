import { redirect } from 'next/navigation';
import Link from 'next/link';

import { createClient } from '@/lib/supabase/server';
import EditProjectForm from '@/components/EditProjectForm';

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (error || !project) {
    return (
      <main className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
        <div className="mx-auto max-w-3xl px-6 py-12">

          <Link
            href="/projects"
            className="font-mono text-xs text-ink-muted transition hover:text-ink dark:hover:text-paper"
          >
            ← back to projects
          </Link>

          <div className="mt-10 rounded-lg border border-ink-border p-8 text-center">
            <p className="font-mono text-xs text-ink-faint">404</p>
            <h1 className="mt-2 font-display text-xl font-semibold">
              Project not found
            </h1>

            <p className="mt-2 text-ink-muted">
              This project may have been deleted or you don&apos;t have access to it.
            </p>
          </div>

        </div>
      </main>
    );
  }

  const status = project.status || 'draft';

  const statusLabel =
    status === 'in_progress'
      ? 'In Progress'
      : status === 'completed'
      ? 'Completed'
      : 'Draft';

  const statusClassName =
    status === 'in_progress'
      ? 'border-ember-800/60 bg-ember-950/30 text-ember-400'
      : status === 'completed'
      ? 'border-emerald-800/60 bg-emerald-950/40 text-emerald-400'
      : 'border-ink-border bg-ink-surface/60 text-ink-muted';

  return (
    <main className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">

      {/* Navigation */}
      <nav className="border-b border-ink-border px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">

          <Link
            href="/projects"
            className="font-mono text-xs text-ink-muted transition hover:text-ink dark:hover:text-paper"
          >
            ← back to projects
          </Link>

          <span className="font-display font-semibold">
            Emberkit
          </span>

        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* Header */}
        <div className="mb-8">

          <div className="mb-3 flex items-center gap-3">
            <p className="font-mono text-xs text-ember-600 dark:text-ember-400">
              project
            </p>

            <span
              className={`rounded-full border px-3 py-1 font-mono text-[11px] ${statusClassName}`}
            >
              {statusLabel}
            </span>
          </div>

          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Edit project
          </h1>

          <p className="mt-2 text-ink-muted">
            Update your project information and status.
          </p>

        </div>

        {/* Edit Form */}
        <div className="rounded-lg border border-ink-border bg-paper p-6 dark:bg-ink-soft">

          <EditProjectForm
            projectId={project.id}
            initialName={project.name}
            initialDescription={project.description || ''}
            initialStatus={project.status || 'draft'}
          />

        </div>

        {/* Project Information */}
        <div className="mt-6 rounded-lg border border-ink-border p-6">

          <h2 className="mb-5 font-display text-lg font-semibold">
            Project information
          </h2>

          <div className="grid gap-px overflow-hidden rounded border border-ink-border bg-ink-border sm:grid-cols-3">

            {/* Project ID */}
            <div className="bg-paper p-4 dark:bg-ink">
              <p className="font-mono text-[11px] text-ink-faint">
                project id
              </p>

              <p className="mt-1 break-all font-mono text-xs text-ink">
                {project.id}
              </p>
            </div>

            {/* Status */}
            <div className="bg-paper p-4 dark:bg-ink">
              <p className="font-mono text-[11px] text-ink-faint">
                current status
              </p>

              <p className="mt-1 text-sm font-medium">
                {statusLabel}
              </p>
            </div>

            {/* Created */}
            <div className="bg-paper p-4 dark:bg-ink">
              <p className="font-mono text-[11px] text-ink-faint">
                created
              </p>

              <p className="mt-1 text-sm font-medium">
                {project.created_at
                  ? new Date(project.created_at).toLocaleDateString()
                  : 'Unknown'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
