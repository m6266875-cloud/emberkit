import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import { requireUser } from '@/lib/auth';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <AppShell
      user={{
        name: user.name,
        email: user.email,
        username: user.username,
        isSubscribed: user.isSubscribed,
      }}
    >
      {children}
    </AppShell>
  );
}
