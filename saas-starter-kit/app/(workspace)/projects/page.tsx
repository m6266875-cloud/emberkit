import type { Metadata } from 'next';
import ProjectsManager from '@/components/ProjectsManager';
import { requireUser } from '@/lib/auth';
import { database } from '@/lib/db';
import { serializeProject } from '@/lib/projects';

export const metadata: Metadata = { title: 'Your projects' };
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  const user = await requireUser();
  const projects = await database.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  });
  return (
    <ProjectsManager
      projects={projects.map(serializeProject)}
      initialCreate={(await searchParams).new === '1'}
    />
  );
}
