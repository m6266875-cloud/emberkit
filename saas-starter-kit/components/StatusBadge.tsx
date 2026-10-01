import { statusLabels, type ProjectStatus } from '@/lib/projects';

const statusClasses: Record<ProjectStatus, string> = {
  draft: 'status-draft',
  in_progress: 'status-in_progress',
  completed: 'status-completed',
};
export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status-badge ${statusClasses[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
