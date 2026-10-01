import {
  Activity,
  ArrowUpRight,
  CircleCheck,
  Code2,
  Folder,
  FolderKanban,
  LayoutDashboard,
  Settings,
  UserRound,
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function ProductPreview() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-float"
      aria-label="Illustrative workspace preview with sample data"
    >
      <div className="flex h-10 items-center justify-between border-b border-line bg-canvas px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#efaaa0]" />
          <span className="h-2 w-2 rounded-full bg-[#eecb87]" />
          <span className="h-2 w-2 rounded-full bg-[#a4c9a6]" />
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[8px] text-muted">
          <Code2 size={10} />
          emberkit / workspace
        </span>
        <span className="w-8" />
      </div>
      <div className="flex">
        <div className="hidden w-[108px] shrink-0 flex-col border-r border-line bg-canvas px-3 pb-4 pt-5 sm:flex">
          <span className="mb-5 text-[13px] font-bold tracking-tight">
            emberkit<span className="text-ember">.</span>
          </span>
          <div className="space-y-1.5">
            {[
              { Icon: LayoutDashboard, label: 'Overview' },
              { Icon: FolderKanban, label: 'Projects' },
              { Icon: UserRound, label: 'Profile' },
              { Icon: Settings, label: 'Settings' },
            ].map(({ Icon, label }, index) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-2 text-[8px] ${index === 0 ? 'bg-surface font-medium text-foreground shadow-sm' : 'text-muted'}`}
              >
                <Icon size={10} />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-16 font-mono text-[7px] text-muted">PERSONAL WORKSPACE</div>
        </div>
        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[7px] uppercase tracking-wider text-muted">
              Workspace overview
            </p>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-soft text-[8px] font-semibold">
              AM
            </span>
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-[-.04em]">A good day to build.</h2>
          <p className="mt-1 text-[9px] text-muted">Here’s where your ideas stand.</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { label: 'Projects', value: '8', Icon: Folder },
              { label: 'In progress', value: '3', Icon: Activity },
              { label: 'Completed', value: '5', Icon: CircleCheck },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="rounded-xl border border-line bg-canvas p-3">
                <div className="flex items-center justify-between text-muted">
                  <span className="text-[8px]">{label}</span>
                  <Icon size={10} />
                </div>
                <p className="mt-3 text-[23px] font-semibold leading-none tracking-tight">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-line p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold">Recent projects</p>
              <ArrowUpRight size={12} className="text-muted" />
            </div>
            <div className="mt-1.5">
              {[
                {
                  name: 'Orbit — your next SaaS',
                  status: 'in_progress' as const,
                  color: 'bg-violet-100 text-violet-700',
                },
                {
                  name: 'Studio website',
                  status: 'completed' as const,
                  color: 'bg-blue-100 text-blue-700',
                },
                {
                  name: 'The launch plan',
                  status: 'completed' as const,
                  color: 'bg-orange-100 text-orange-700',
                },
              ].map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between gap-2 border-t border-line py-3 first:border-0"
                >
                  <span className="flex items-center gap-2 text-[9px] font-medium">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${project.color}`}
                    >
                      <FolderKanban size={12} />
                    </span>
                    {project.name}
                  </span>
                  <span className="scale-[.75] origin-right">
                    <StatusBadge status={project.status} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-wider text-muted">
            <span className="h-1 w-1 rounded-full bg-ember" />
            UI PREVIEW · ILLUSTRATIVE SAMPLE DATA
          </p>
        </div>
      </div>
    </div>
  );
}
