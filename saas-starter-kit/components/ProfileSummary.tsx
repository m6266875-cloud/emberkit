import { ArrowUpRight, CalendarDays, Globe, Mail } from 'lucide-react';

export default function ProfileSummary({
  name,
  email,
  username,
  website,
  joined,
}: {
  name: string;
  email: string;
  username?: string | null;
  website?: string | null;
  joined: string;
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
  return (
    <section className="panel overflow-hidden">
      <div className="h-24 border-b border-line bg-[#e8ecdf] dark:bg-[#333f32]">
        <div className="dot-pattern h-full opacity-60" />
      </div>
      <div className="px-6 pb-7">
        <span className="relative -mt-9 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-4 border-surface bg-[#dde5cb] text-2xl font-semibold text-[#475638]">
          {initials}
        </span>
        <h2 className="mt-4 text-xl font-semibold tracking-tight">{name}</h2>
        <p className="mt-1 text-xs text-muted">
          {username ? `@${username}` : 'A builder with a good idea.'}
        </p>
        <div className="mt-6 space-y-4 border-t border-line pt-5 text-xs text-muted">
          <p className="flex items-start gap-2.5">
            <Mail size={14} className="mt-0.5 shrink-0" />
            <span className="break-all">{email}</span>
          </p>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 hover:text-foreground"
            >
              <Globe size={14} className="mt-0.5 shrink-0" />
              <span className="break-all">{website.replace(/^https?:\/\//, '')}</span>
              <ArrowUpRight size={12} className="shrink-0" />
            </a>
          )}
          <p className="flex items-center gap-2.5">
            <CalendarDays size={14} />
            Joined{' '}
            {new Intl.DateTimeFormat('en', {
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            }).format(new Date(joined))}
          </p>
        </div>
      </div>
    </section>
  );
}
