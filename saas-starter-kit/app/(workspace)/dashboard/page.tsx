import type { Metadata } from 'next';
import DashboardContent from '@/components/DashboardContent';
import { requireUser } from '@/lib/auth';
import { database } from '@/lib/db';
import { serializeProject } from '@/lib/projects';

export const metadata: Metadata = { title: 'Your workspace' };
export default async function DashboardPage() {
  const user = await requireUser();
  const projects = await database.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  });
  return <DashboardContent user={user} projects={projects.map(serializeProject)} />;
}
