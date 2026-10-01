'use client';
import { useHydrated } from '@/lib/use-hydrated';
import { Search } from 'lucide-react';
import type { ProjectStatus } from '@/lib/projects';

export default function ProjectFilters({
  search,
  status,
  sort,
  onSearch,
  onStatus,
  onSort,
}: {
  search: string;
  status: 'all' | ProjectStatus;
  sort: string;
  onSearch: (value: string) => void;
  onStatus: (value: 'all' | ProjectStatus) => void;
  onSort: (value: string) => void;
}) {
  const hydrated = useHydrated();
  return (
    <fieldset disabled={!hydrated} className="flex min-w-0 flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <label htmlFor="project-search" className="sr-only">
          Search projects
        </label>
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          id="project-search"
          type="search"
          className="field bg-surface pl-10"
          placeholder="Find that next big idea…"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>
      <label className="sr-only" htmlFor="status-filter">
        Filter by status
      </label>
      <select
        id="status-filter"
        className="field bg-surface md:w-[155px]"
        value={status}
        onChange={(event) => onStatus(event.target.value as 'all' | ProjectStatus)}
      >
        <option value="all">All statuses</option>
        <option value="draft">Draft</option>
        <option value="in_progress">In progress</option>
        <option value="completed">Completed</option>
      </select>
      <label className="sr-only" htmlFor="project-sort">
        Sort projects
      </label>
      <select
        id="project-sort"
        className="field bg-surface md:w-[175px]"
        value={sort}
        onChange={(event) => onSort(event.target.value)}
      >
        <option value="updated">Recently updated</option>
        <option value="name">Name, A to Z</option>
      </select>
    </fieldset>
  );
}
