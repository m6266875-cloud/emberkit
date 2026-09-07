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
          className:
            'border-blue-800/50 bg-blue-950/30 text-blue-400',
        };

      case 'completed':
        return {
          label: 'Completed',
          className:
            'border-emerald-800/50 bg-emerald-950/30 text-emerald-400',
        };

      default:
        return {
          label: 'Draft',
          className:
            'border-ink-border bg-ink-surface/60 text-ink-muted',
        };
    }
  }

  if (projectList.length === 0) {
    return (
      <>
        <div className="rounded-lg border border-ink-border p-12 text-center">
          <p className="font-mono text-xs text-ink-faint">no projects yet</p>

          <h3 className="mt-3 font-display text-lg font-semibold">
            Nothing here yet
          </h3>

          <p className="mt-2 text-ink-muted">
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
        <div className="mb-6 flex flex-col gap-3 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-ink-faint">
              /
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded border border-ink-border bg-paper px-9 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink-soft dark:text-paper"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink-soft dark:text-paper md:w-48"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="rounded-lg border border-ink-border p-10 text-center">
            <p className="font-mono text-xs text-ink-faint">no matches</p>

            <h3 className="mt-3 font-display font-semibold">
              No matching projects
            </h3>

            <p className="mt-2 text-sm text-ink-muted">
              Try a different search term or status.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="mt-4 font-mono text-xs font-medium text-ember-600 hover:text-ember-500 dark:text-ember-400"
            >
              clear filters
            </button>
          </div>
        )}

        {/* Projects */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {filteredProjects.map((project) => {
              const status = getStatus(project.status);

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group block"
                >
                  <div className="relative h-full rounded-lg border border-ink-border bg-paper p-6 transition-all duration-200 hover:border-ember-500/60 hover:shadow-lg hover:shadow-ember-500/5 dark:bg-ink-soft">

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, project.id)}
                      disabled={deletingId === project.id}
                      className="absolute right-5 top-5 z-10 font-mono text-xs text-ink-faint transition hover:text-red-500 disabled:opacity-50"
                      aria-label="Delete project"
                    >
                      {deletingId === project.id ? '···' : 'delete'}
                    </button>

                    {/* Project Icon */}
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded border border-ink-border font-mono text-sm text-ink-muted">
                      {project.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Project Name */}
                    <h3 className="pr-14 font-display text-lg font-semibold transition group-hover:text-ember-600 dark:group-hover:text-ember-400">
                      {project.name}
                    </h3>

                    {/* Date */}
                    <p className="mt-1 font-mono text-xs text-ink-faint">
                      {project.created_at
                        ? new Date(
                            project.created_at
                          ).toLocaleDateString()
                        : ''}
                    </p>

                    {/* Description */}
                    <p className="mt-5 line-clamp-2 text-sm text-ink-muted">
                      {project.description ||
                        'No description provided.'}
                    </p>

                    {/* Status */}
                    <div className="mt-5">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    {/* View Project */}
                    <div className="mt-6 font-mono text-xs font-medium text-ember-600 transition-transform group-hover:translate-x-1 dark:text-ember-400">
                      view project →
                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        )}

        {/* Result Count */}
        {filteredProjects.length > 0 && (
          <p className="mt-5 font-mono text-xs text-ink-faint">
            showing {filteredProjects.length} of{' '}
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