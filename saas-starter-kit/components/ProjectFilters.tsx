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
    <div className="flex flex-col md:flex-row gap-4 mb-6">

      {/* Search */}
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-11 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Status Filter */}
      <select
        onChange={(e) => onStatusChange(e.target.value)}
        className="md:w-52 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        defaultValue="all"
      >
        <option value="all">All Statuses</option>
        <option value="draft">🟡 Draft</option>
        <option value="in_progress">🔵 In Progress</option>
        <option value="completed">🟢 Completed</option>
      </select>

    </div>
  );
}