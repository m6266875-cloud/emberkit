'use client';
import { useHydrated } from '@/lib/use-hydrated';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  FolderKanban,
  Layers,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Sparkles,
  UserRound,
} from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import SignOutButton from '@/components/SignOutButton';
import Modal from '@/components/Modal';

export type WorkspaceUser = {
  name: string;
  email: string;
  username?: string | null;
  isSubscribed: boolean;
};
export type WorkspaceView = 'dashboard' | 'projects' | 'profile' | 'settings';
const items = [
  { slug: 'dashboard', label: 'Overview', Icon: LayoutDashboard },
  { slug: 'projects', label: 'Projects', Icon: FolderKanban },
  { slug: 'profile', label: 'My profile', Icon: UserRound },
  { slug: 'settings', label: 'Settings', Icon: Settings },
];

export default function AppShell({
  user,
  children,
  demo = false,
  demoView = 'dashboard',
}: {
  user: WorkspaceUser;
  children: React.ReactNode;
  demo?: boolean;
  demoView?: WorkspaceView;
}) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = demo ? demoView : pathname.split('/')[1];
  const title = pathname.startsWith('/projects/')
    ? 'Project details'
    : items.find((item) => item.slug === active)?.label || 'Workspace';
  const initials =
    user.name
      .split(' ')
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase() || 'EK';
  const route = (slug: string) =>
    demo ? (slug === 'dashboard' ? '/preview' : `/preview?view=${slug}`) : `/${slug}`;
  const navigation = (
    <nav aria-label="Workspace navigation" className="space-y-1">
      {items.map(({ slug, label, Icon }) => (
        <Link
          key={slug}
          href={route(slug)}
          onClick={() => setMenuOpen(false)}
          aria-current={active === slug ? 'page' : undefined}
          className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition ${active === slug ? 'bg-surface text-foreground shadow-sm ring-1 ring-line' : 'text-muted hover:bg-soft hover:text-foreground'}`}
        >
          <Icon size={17} strokeWidth={1.7} />
          {label}
          {active === slug && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ember" />}
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="min-h-screen bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[240px] flex-col border-r border-line bg-canvas px-5 py-7 md:flex">
        <div className="px-2">
          <Logo href={route('dashboard')} />
        </div>
        <div className="mt-9 flex items-center gap-3 rounded-xl border border-line bg-surface/60 p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-soft text-muted">
            <Layers size={17} />
          </span>
          <div>
            <p className="text-xs font-semibold">Personal workspace</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
              {demo ? 'Demo preview' : user.isSubscribed ? 'Pro account' : 'Starter account'}
            </p>
          </div>
        </div>
        <p className="eyebrow mb-3 mt-8 px-3.5 text-[9px]">Workspace</p>
        {navigation}
        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-line bg-soft/50 p-4">
            <Sparkles size={18} className="text-ember" />
            <p className="mt-3 text-xs font-semibold">Make it your own.</p>
            <p className="mt-1.5 text-[11px] leading-5 text-muted">
              A small foundation for something much bigger.
            </p>
            <Link
              href="/guide"
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold"
            >
              Open the guide
              <ArrowUpRight size={12} />
            </Link>
          </div>
          <Link
            href="/guide"
            className="mt-5 flex items-center gap-2 px-3 text-xs text-muted hover:text-foreground"
          >
            <BookOpen size={15} />
            Documentation
          </Link>
          <div className="mt-5 flex items-center gap-2.5 border-t border-line pt-5">
            <Link href={route('profile')} className="flex min-w-0 flex-1 items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8ecdf] text-xs font-semibold text-[#475638]">
                {initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold">{user.name}</span>
                <span className="mt-1 block truncate text-[10px] text-muted">{user.email}</span>
              </span>
            </Link>
            {!demo && <SignOutButton compact />}
          </div>
        </div>
      </aside>
      <div className="md:pl-[240px]">
        {demo && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ember/20 bg-ember/10 px-6 py-3 text-[11px] sm:px-8">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-ember" />
              <strong className="font-semibold">Demo workspace</strong>
              <span className="text-muted">Sample data only. Changes aren’t saved.</span>
            </span>
            <Link href="/signup" className="inline-flex items-center gap-1.5 font-semibold">
              Create a real account
              <ArrowRight size={13} />
            </Link>
          </div>
        )}
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between gap-3 border-b border-line bg-canvas/95 px-6 backdrop-blur-lg sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="icon-button md:hidden"
              onClick={() => setMenuOpen(true)}
              disabled={!hydrated}
              aria-label="Open workspace navigation"
            >
              <Menu size={18} />
            </button>
            <div className="hidden items-center gap-2.5 text-xs md:flex">
              <span className="text-muted">Workspace</span>
              <ChevronRight size={12} className="text-muted" />
              <span className="font-medium">{title}</span>
            </div>
            <div className="md:hidden">
              <Logo href={route('dashboard')} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={route('projects')}
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-muted transition hover:bg-soft sm:flex"
            >
              <Search size={15} />
              Find a project
            </Link>
            <Link
              href="/guide"
              className="hidden text-muted hover:text-foreground sm:block"
              aria-label="Open setup guide"
            >
              <CircleHelp size={17} />
            </Link>
            <ThemeToggle />
            <Link
              href={route('profile')}
              className="hidden h-8 w-8 items-center justify-center rounded-full bg-[#e8ecdf] text-[10px] font-semibold text-[#475638] sm:flex"
              aria-label="Open your profile"
            >
              {initials}
            </Link>
          </div>
        </header>
        <main
          id="main-content"
          className="mx-auto max-w-[1280px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10"
        >
          {children}
        </main>
      </div>
      {menuOpen && (
        <Modal title="Your workspace" onClose={() => setMenuOpen(false)}>
          {navigation}
          <Link href="/guide" onClick={() => setMenuOpen(false)} className="btn-ghost mt-5">
            <BookOpen size={15} />
            Documentation
          </Link>
          {!demo && (
            <div className="mt-4 border-t border-line pt-4">
              <SignOutButton />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
