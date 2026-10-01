import type { Metadata } from 'next';
import AppShell, { type WorkspaceView } from '@/components/AppShell';
import DemoWorkspace from '@/components/DemoWorkspace';
import { demoUser } from '@/lib/demo';

export const metadata: Metadata = { title: 'Explore the demo workspace' };
export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; new?: string; project?: string }>;
}) {
  const query = await searchParams;
  const view = ['projects', 'profile', 'settings'].includes(query.view || '')
    ? (query.view as WorkspaceView)
    : 'dashboard';
  return (
    <AppShell user={demoUser} demo demoView={view}>
      <DemoWorkspace
        view={view}
        initialCreate={query.new === '1'}
        initialProjectId={query.project}
      />
    </AppShell>
  );
}
