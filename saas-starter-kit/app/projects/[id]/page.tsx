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
      <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="max-w-3xl mx-auto px-6 py-12">

          <Link
            href="/projects"
            className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Projects
          </Link>

          <div className="mt-10 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
            <h1 className="text-xl font-bold">
              Project not found
            </h1>

            <p className="text-gray-500 mt-2">
              This project may have been deleted or you don't have access to it.
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

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">

          <Link
            href="/projects"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Projects
          </Link>

          <span className="font-bold">
            Emberkit
          </span>

        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-3 mb-3">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Project
            </p>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800">
              {statusLabel}
            </span>
          </div>

          <h1 className="text-3xl font-bold">
            Edit Project
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update your project information and status.
          </p>

        </div>

        {/* Edit Form */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900">

          <EditProjectForm
            projectId={project.id}
            initialName={project.name}
            initialDescription={project.description || ''}
            initialStatus={project.status || 'draft'}
          />

        </div>

        {/* Project Information */}
        <div className="mt-6 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

          <h2 className="font-semibold mb-4">
            Project Information
          </h2>

          <div className="space-y-5">

            {/* Project ID */}
            <div>
              <p className="text-sm text-gray-500">
                Project ID
              </p>

              <p className="font-mono text-sm mt-1 break-all">
                {project.id}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-500">
                Current Status
              </p>

              <p className="text-sm font-medium mt-1">
                {statusLabel}
              </p>
            </div>

            {/* Created */}
            <div>
              <p className="text-sm text-gray-500">
                Created
              </p>

              <p className="text-sm mt-1">
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