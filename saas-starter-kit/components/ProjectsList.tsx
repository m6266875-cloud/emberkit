import Link from 'next/link';
import { ArrowUpRight, FolderKanban } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import type { ProjectRecord } from '@/lib/projects';

export default function ProjectsList({
  projects,
  view = 'grid',
  onSelect,
}: {
  projects: ProjectRecord[];
  view?: 'grid' | 'list';
  onSelect?: (project: ProjectRecord) => void;
}) {
  return (
    <div className={view === 'grid' ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-3'}>
      {projects.map((project, index) => {
        const content = (
          <>
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${index % 3 === 0 ? 'bg-[#ffede6] text-[#b34225] dark:bg-ember/15 dark:text-[#ffaf8c]' : index % 3 === 1 ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-[#e8ecdf] text-[#475638]'}`}
            >
              <FolderKanban size={21} strokeWidth={1.5} />
            </span>
            <div className={view === 'grid' ? 'mt-5 flex-1' : 'min-w-0 flex-1'}>
              <h3 className="truncate text-[15px] font-semibold tracking-tight">{project.name}</h3>
              <p
                className={`mt-2 text-xs leading-6 text-muted ${view === 'grid' ? 'line-clamp-2 min-h-12' : 'truncate'}`}
              >
                {project.description || 'Every good idea needs a starting point.'}
              </p>
            </div>
            <div
              className={
                view === 'grid'
                  ? 'mt-6 flex items-center justify-between border-t border-line pt-4'
                  : 'ml-auto flex shrink-0 items-center gap-4'
              }
            >
              <StatusBadge status={project.status} />
              <ArrowUpRight size={16} className="text-muted transition group-hover:text-ember" />
            </div>
          </>
        );
        const className = `group panel text-left transition hover:-translate-y-0.5 hover:border-ember/40 ${view === 'grid' ? 'flex min-w-0 flex-col p-6' : 'flex min-w-0 items-center gap-4 p-4 sm:p-5'}`;
        return onSelect ? (
          <button
            key={project.id}
            type="button"
            className={className}
            onClick={() => onSelect(project)}
          >
            {content}
          </button>
        ) : (
          <Link key={project.id} href={`/projects/${project.id}`} className={className}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
