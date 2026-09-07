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
      label: 'total',
      value: total,
      accent: 'text-ink dark:text-paper',
    },
    {
      label: 'draft',
      value: draft,
      accent: 'text-ink-muted',
    },
    {
      label: 'in progress',
      value: inProgress,
      accent: 'text-ember-500',
    },
    {
      label: 'completed',
      value: completed,
      accent: 'text-emerald-500',
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-px overflow-hidden rounded border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-paper p-5 dark:bg-ink-soft">
          <p className="font-mono text-xs text-ink-faint">{stat.label}</p>
          <p className={`mt-3 font-display text-3xl font-semibold ${stat.accent}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}