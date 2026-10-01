import { CircleAlert, CircleCheck, Info } from 'lucide-react';

export default function Notice({
  children,
  type = 'info',
}: {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'info';
}) {
  const Icon = type === 'error' ? CircleAlert : type === 'success' ? CircleCheck : Info;
  const colors =
    type === 'error'
      ? 'border-red-400/30 bg-red-500/5 text-red-700 dark:text-red-300'
      : type === 'success'
        ? 'border-emerald-400/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200'
        : 'border-ember/25 bg-ember/5 text-foreground';
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-[13px] leading-6 ${colors}`}
    >
      <Icon size={17} className="mt-1 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
