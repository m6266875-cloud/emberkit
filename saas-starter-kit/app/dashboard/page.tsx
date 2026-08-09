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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <Link
            href="/dashboard"
            className="text-xl font-bold tracking-tight"
          >
            Emberkit
          </Link>

          <div className="flex items-center gap-4">

            <ThemeToggle />

            <Link
              href="/projects"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Projects
            </Link>

            <Link
              href="/profile"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Profile
            </Link>

            <Link
              href="/settings"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              Settings
            </Link>

            <span className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </span>

            <SignOutButton />

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
              Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome back 👋
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what's happening with your workspace.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm font-semibold transition shadow-sm"
          >
            + New Project
          </Link>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* Total Projects */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Projects
              </span>

              <span className="text-2xl">
                📁
              </span>
            </div>

            <p className="text-3xl font-bold">
              {totalProjects}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Projects in your workspace
            </p>

          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Completed
              </span>

              <span className="text-2xl">
                ✅
              </span>
            </div>

            <p className="text-3xl font-bold">
              {completedProjects}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Successfully completed
            </p>

          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                In Progress
              </span>

              <span className="text-2xl">
                🔄
              </span>
            </div>

            <p className="text-3xl font-bold">
              {inProgressProjects}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Currently active
            </p>

          </div>

          {/* Plan */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">

            <div className="flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Current Plan
              </span>

              <span className="text-2xl">
                ⭐
              </span>
            </div>

            <p className="text-3xl font-bold">
              Free
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Upgrade when you're ready
            </p>

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Projects */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">

            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  Recent Projects
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your latest projects
                </p>
              </div>

              <Link
                href="/projects"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all →
              </Link>

            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-800">

              {recentProjects.length === 0 ? (

                <div className="p-10 text-center">

                  <div className="text-4xl mb-3">
                    📂
                  </div>

                  <h3 className="font-semibold mb-1">
                    No projects yet
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    Create your first project to get started.
                  </p>

                  <Link
                    href="/projects"
                    className="inline-flex rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition"
                  >
                    Create Project
                  </Link>

                </div>

              ) : (

                recentProjects.map((project) => (

                  <div
                    key={project.id}
                    className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-xl shrink-0">
                        📁
                      </div>

                      <div className="min-w-0">

                        <h3 className="font-semibold truncate">
                          {project.name}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {project.description || 'No description'}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full ${
                        project.status?.toLowerCase() === 'completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
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

            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">

              <h2 className="text-lg font-semibold mb-1">
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Manage your workspace quickly.
              </p>

              <div className="space-y-3">

                <Link
                  href="/projects"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
                >
                  <span className="text-xl">
                    ➕
                  </span>

                  <div>
                    <p className="font-medium text-sm">
                      Create Project
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Start something new
                    </p>
                  </div>
                </Link>

                <Link
                  href="/projects"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
                >
                  <span className="text-xl">
                    📁
                  </span>

                  <div>
                    <p className="font-medium text-sm">
                      View Projects
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Manage your projects
                    </p>
                  </div>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition"
                >
                  <span className="text-xl">
                    👤
                  </span>

                  <div>
                    <p className="font-medium text-sm">
                      Edit Profile
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Update your information
                    </p>
                  </div>
                </Link>

              </div>

            </div>

            {/* Upgrade Card */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 shadow-lg">

              <div className="text-2xl mb-3">
                🚀
              </div>

              <h2 className="text-lg font-bold mb-2">
                Unlock more with Pro
              </h2>

              <p className="text-sm text-blue-100 mb-5">
                Get access to advanced features and take your workspace to the next level.
              </p>

              <UpgradeButton />

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}