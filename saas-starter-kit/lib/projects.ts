import type { Project } from '@prisma/client';

export type ProjectStatus = 'draft' | 'in_progress' | 'completed';
export type ProjectRecord = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};
export const statusLabels: Record<ProjectStatus, string> = {
  draft: 'Draft',
  in_progress: 'In progress',
  completed: 'Completed',
};

export function serializeProject(project: Project): ProjectRecord {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export function projectCounts(projects: { status: ProjectStatus }[]) {
  return {
    total: projects.length,
    active: projects.filter((project) => project.status === 'in_progress').length,
    completed: projects.filter((project) => project.status === 'completed').length,
    draft: projects.filter((project) => project.status === 'draft').length,
  };
}
