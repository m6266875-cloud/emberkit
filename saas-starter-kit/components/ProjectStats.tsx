interface Project {
  id: string;
  status?: string | null;
}

interface ProjectStatsProps {
  projects: Project[];
}

export default function ProjectStats({
  projects,
}: ProjectStatsProps) {
  const total = projects.length;

  const draft = projects.filter(
    (project) => !project.status || project.status === 'draft'
  ).length;

  const inProgress = projects.filter(
    (project) => project.status === 'in_progress'
  ).length;

  const completed = projects.filter(
    (project) => project.status === 'completed'
  ).length;

  const stats = [
    {
      label: 'Total Projects',
      value: total,
      icon: '📁',
    },
    {
      label: 'Draft',
      value: draft,
      icon: '🟡',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: '🔵',
    },
    {
      label: 'Completed',
      value: completed,
      icon: '🟢',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 bg-white dark:bg-gray-900"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">
              {stat.icon}
            </span>

            <span className="text-3xl font-bold">
              {stat.value}
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}