'use client';
import { useHydrated } from '@/lib/use-hydrated';
import { useMemo, useState } from 'react';
import { FolderKanban, LayoutGrid, List, Plus, SearchX } from 'lucide-react';
import Modal from '@/components/Modal';
import ProjectForm, { type ProjectFormInput } from '@/components/ProjectForm';
import ProjectFilters from '@/components/ProjectFilters';
import ProjectsList from '@/components/ProjectsList';
import { projectCounts, type ProjectRecord, type ProjectStatus } from '@/lib/projects';

export default function ProjectsManager({
  projects,
  initialCreate = false,
  initialProjectId,
  demo = false,
  onDemoSave,
}: {
  projects: ProjectRecord[];
  initialCreate?: boolean;
  initialProjectId?: string;
  demo?: boolean;
  onDemoSave?: (input: ProjectFormInput, id?: string) => Promise<ProjectRecord>;
}) {
  const hydrated = useHydrated();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | ProjectStatus>('all');
  const [sort, setSort] = useState('updated');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [creating, setCreating] = useState(initialCreate);
  const [selected, setSelected] = useState<ProjectRecord | undefined>(() =>
    projects.find((project) => project.id === initialProjectId),
  );
  const counts = projectCounts(projects);
  const filtered = useMemo(
    () =>
      projects
        .filter(
          (project) =>
            (status === 'all' || project.status === status) &&
            `${project.name} ${project.description || ''}`
              .toLowerCase()
              .includes(search.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === 'name'
            ? a.name.localeCompare(b.name)
            : Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
        ),
    [projects, search, status, sort],
  );
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">A place for your next big thing</p>
          <h1 className="page-heading mt-3">
            Your projects<span className="text-ember">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">Good ideas need a little room to grow.</p>
        </div>
        <button
          type="button"
          className="btn-primary self-start"
          disabled={!hydrated}
          onClick={() => setCreating(true)}
        >
          <Plus size={16} />
          New project
        </button>
      </div>
      <div className="mb-8 flex flex-wrap gap-3 text-xs">
        <span className="rounded-full border border-line bg-surface px-4 py-2">
          <strong>{counts.total}</strong>
          <span className="ml-1.5 text-muted">total</span>
        </span>
        <span className="rounded-full border border-line bg-surface px-4 py-2">
          <strong>{counts.active}</strong>
          <span className="ml-1.5 text-muted">in progress</span>
        </span>
        <span className="rounded-full border border-line bg-surface px-4 py-2">
          <strong>{counts.completed}</strong>
          <span className="ml-1.5 text-muted">completed</span>
        </span>
      </div>
      <ProjectFilters
        search={search}
        status={status}
        sort={sort}
        onSearch={setSearch}
        onStatus={setStatus}
        onSort={setSort}
      />
      <div className="mb-5 mt-6 flex items-center justify-between">
        <p aria-live="polite" className="text-xs text-muted">
          {filtered.length} project{filtered.length === 1 ? '' : 's'}
          {search || status !== 'all' ? ` of ${projects.length}` : ''}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={!hydrated}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            onClick={() => setView('grid')}
            className={`icon-button h-8 w-8 ${view === 'grid' ? 'border-foreground/30 text-foreground' : ''}`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            type="button"
            disabled={!hydrated}
            aria-label="List view"
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
            className={`icon-button h-8 w-8 ${view === 'list' ? 'border-foreground/30 text-foreground' : ''}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>
      {filtered.length ? (
        <ProjectsList projects={filtered} view={view} onSelect={demo ? setSelected : undefined} />
      ) : (
        <div className="panel px-6 py-16 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-soft text-muted">
            {projects.length ? (
              <SearchX size={30} strokeWidth={1.4} />
            ) : (
              <FolderKanban size={30} strokeWidth={1.4} />
            )}
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight">
            {projects.length ? 'No ideas by that name.' : 'Your first idea starts here.'}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-muted">
            {projects.length
              ? 'Try another search or choose a different status. Your projects are still here.'
              : 'Big or small, polished or a little rough around the edges—give it a name and make it real.'}
          </p>
          {projects.length ? (
            <button
              type="button"
              className="btn-secondary mt-6"
              onClick={() => {
                setSearch('');
                setStatus('all');
              }}
            >
              Clear filters
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary mt-6"
              disabled={!hydrated}
              onClick={() => setCreating(true)}
            >
              <Plus size={16} />
              Create your first project
            </button>
          )}
        </div>
      )}
      {creating && (
        <Modal
          title="Give your idea a name."
          description={
            demo
              ? 'Demo only. This project will not be saved to a database.'
              : 'Every good project starts somewhere.'
          }
          onClose={() => setCreating(false)}
        >
          <ProjectForm
            onSave={demo ? onDemoSave : undefined}
            onSuccess={() => setCreating(false)}
          />
        </Modal>
      )}
      {demo && selected && (
        <Modal
          title="A little progress goes a long way."
          description="Edit this sample project. Demo changes are not saved."
          onClose={() => setSelected(undefined)}
        >
          <ProjectForm
            project={selected}
            onSave={onDemoSave}
            onSuccess={() => setSelected(undefined)}
          />
        </Modal>
      )}
    </>
  );
}
