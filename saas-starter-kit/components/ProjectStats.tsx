import { Activity, CircleCheck, FolderKanban } from 'lucide-react';
import { projectCounts, type ProjectRecord } from '@/lib/projects';

export default function ProjectStats({ projects }: { projects: ProjectRecord[] }) {
  const counts = projectCounts(projects);
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        {
          label: 'Total projects',
          value: counts.total,
          detail: 'Ideas in your workspace',
          Icon: FolderKanban,
          color: 'bg-soft text-muted',
        },
        {
          label: 'In progress',
          value: counts.active,
          detail: 'Good things in the making',
          Icon: Activity,
          color: 'bg-amber-100/70 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
        },
        {
          label: 'Completed',
          value: counts.completed,
          detail: 'From idea to done',
          Icon: CircleCheck,
          color: 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
        },
      ].map(({ label, value, detail, Icon, color }) => (
        <div key={label} className="panel p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted">{label}</p>
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
              <Icon size={17} strokeWidth={1.7} />
            </span>
          </div>
          <p className="mt-5 text-4xl font-semibold leading-none tracking-[-.04em]">
            {value.toString().padStart(2, '0')}
          </p>
          <p className="mt-3 text-[11px] text-muted">{detail}</p>
        </div>
      ))}
    </div>
  );
}
