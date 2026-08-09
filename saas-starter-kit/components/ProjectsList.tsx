'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Toast from '@/components/Toast';

type Project = {
  id: string;
  name: string;
  description: string | null;
  status?: string | null;
  created_at: string;
};

type ProjectsListProps = {
  projects?: Project[];
  initialProjects?: Project[];
};

export default function ProjectsList({
  projects,
  initialProjects,
}: ProjectsListProps) {
  const router = useRouter();

  const projectList = projects ?? initialProjects ?? [];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        project.name.toLowerCase().includes(searchText) ||
        (project.description || '').toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === 'all' ||
        (project.status || 'draft') === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projectList, search, statusFilter]);

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    projectId: string
  ) {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    );

    if (!confirmed) return;

    setDeletingId(projectId);
    setToast(null);

    try {
      const response = await fetch('/api/projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: projectId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setToast({
        message: 'Project deleted successfully!',
        type: 'success',
      });

      router.refresh();
    } catch (error) {
      console.error('Delete project error:', error);

      setToast({
        message: 'Failed to delete project.',
        type: 'error',
      });
    } finally {
      setDeletingId(null);
    }
  }

  function getStatus(status?: string | null) {
    switch (status) {
      case 'in_progress':
        return {
          label: 'In Progress',
          icon: '🔵',
          className:
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        };

      case 'completed':
        return {
          label: 'Completed',
          icon: '🟢',
          className:
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        };

      default:
        return {
          label: 'Draft',
          icon: '🟡',
          className:
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        };
    }
  }

  if (projectList.length === 0) {
    return (
      <>
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">📁</div>

          <h3 className="text-lg font-semibold">
            No projects yet
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create your first project using the form above.
          </p>
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div>
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-11 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="md:w-52 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="draft">🟡 Draft</option>
            <option value="in_progress">🔵 In Progress</option>
            <option value="completed">🟢 Completed</option>
          </select>
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center">

            <div className="text-3xl mb-3">
              🔍
            </div>

            <h3 className="font-semibold">
              No matching projects
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Try a different search term or status.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Projects */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredProjects.map((project) => {
              const status = getStatus(project.status);

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group block"
                >
                  <div className="relative h-full border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900 hover:border-indigo-500 hover:shadow-lg transition-all duration-200">

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, project.id)}
                      disabled={deletingId === project.id}
                      className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition disabled:opacity-50 z-10"
                      aria-label="Delete project"
                    >
                      {deletingId === project.id ? '...' : '🗑️'}
                    </button>

                    {/* Project Icon */}
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl mb-5">
                      📁
                    </div>

                    {/* Project Name */}
                    <h3 className="text-lg font-semibold pr-10 group-hover:text-indigo-600 transition">
                      {project.name}
                    </h3>

                    {/* Date */}
                    <p className="text-xs text-gray-500 mt-1">
                      {project.created_at
                        ? new Date(
                            project.created_at
                          ).toLocaleDateString()
                        : ''}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-5 line-clamp-2">
                      {project.description ||
                        'No description provided.'}
                    </p>

                    {/* Status */}
                    <div className="mt-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                      >
                        <span>{status.icon}</span>
                        {status.label}
                      </span>
                    </div>

                    {/* View Project */}
                    <div className="mt-6 text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform">
                      View project →
                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        )}

        {/* Result Count */}
        {filteredProjects.length > 0 && (
          <p className="text-xs text-gray-500 mt-5">
            Showing {filteredProjects.length} of{' '}
            {projectList.length} projects
          </p>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}