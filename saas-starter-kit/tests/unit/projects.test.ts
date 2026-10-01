import { describe, expect, it } from 'vitest';
import { projectCounts, serializeProject } from '@/lib/projects';

describe('project presentation', () => {
  it('derives counts from actual project statuses', () => {
    expect(
      projectCounts([
        { status: 'draft' },
        { status: 'in_progress' },
        { status: 'completed' },
        { status: 'completed' },
      ]),
    ).toEqual({ total: 4, active: 1, completed: 2, draft: 1 });
  });
  it('handles a new empty workspace without fake statistics', () => {
    expect(projectCounts([])).toEqual({ total: 0, active: 0, completed: 0, draft: 0 });
  });
  it('serializes dates and omits private owner fields', () => {
    const project = {
      id: 'id',
      userId: 'private-owner',
      name: 'Idea',
      description: null,
      status: 'draft' as const,
      createdAt: new Date('2026-10-02T00:00:00Z'),
      updatedAt: new Date('2026-10-02T00:00:00Z'),
    };
    const serialized = serializeProject(project);
    expect(serialized.createdAt).toBe('2026-10-02T00:00:00.000Z');
    expect(serialized).not.toHaveProperty('userId');
  });
});
