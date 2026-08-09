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
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Header */}
      <nav className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href="/dashboard"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Dashboard
          </a>

          <span className="font-bold">Emberkit</span>
        </div>
      </nav>

      {/* Page */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage your projects.
          </p>
        </div>

        {/* Create Project */}
        <section className="mb-12">
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900">

            <h2 className="text-xl font-semibold mb-2">
              Create a new project
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Start a new project for your workspace.
            </p>

            <CreateProjectForm />

          </div>
        </section>

        {/* Project Statistics */}
        <ProjectStats 
          projects={projects ?? []}
        />
        <section>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Your Projects
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {projects?.length ?? 0} project
                {(projects?.length ?? 0) !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <ProjectsList
            projects={projects ?? []}
          />

        </section>

      </div>
    </main>
  );
}