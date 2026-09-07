'use client';

import { useState } from 'react';

interface ProjectFiltersProps {
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function ProjectFilters({
  onSearch,
  onStatusChange,
}: ProjectFiltersProps) {
  const [search, setSearch] = useState('');

  function handleSearch(value: string) {
    setSearch(value);
    onSearch(value);
  }

  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row">

      {/* Search */}
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-ink-faint">
          /
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded border border-ink-border bg-paper px-9 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink-soft dark:text-paper"
        />
      </div>

      {/* Status Filter */}
      <select
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink-soft dark:text-paper md:w-48"
        defaultValue="all"
      >
        <option value="all">All statuses</option>
        <option value="draft">Draft</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

    </div>
  );
}