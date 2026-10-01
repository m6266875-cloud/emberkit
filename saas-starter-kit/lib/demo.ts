import type { ProjectRecord } from '@/lib/projects';

export const demoUser = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  username: 'alexbuilds',
  website: 'https://example.com',
  isSubscribed: false,
};
export const demoProjects: ProjectRecord[] = [
  {
    id: '15d4d44b-b3f9-4b12-9e3c-05db83c2f841',
    name: 'Orbit — your next SaaS',
    description: 'A calmer place for teams to plan their next big move.',
    status: 'in_progress',
    createdAt: '2026-09-24T10:00:00Z',
    updatedAt: '2026-10-02T09:00:00Z',
  },
  {
    id: 'f32f5f28-bf4c-4c65-8cd2-65f952d59ae2',
    name: 'Studio website',
    description: 'A home on the internet for your best work.',
    status: 'completed',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-10-01T09:00:00Z',
  },
  {
    id: 'ec3ed0eb-1a25-4dfb-9016-2e2ddfe132b4',
    name: 'The launch plan',
    description: 'A few thoughtful steps toward a very exciting day.',
    status: 'draft',
    createdAt: '2026-09-29T10:00:00Z',
    updatedAt: '2026-09-30T09:00:00Z',
  },
  {
    id: 'ab1e99fe-3129-4ea3-81b9-90d271581d3f',
    name: 'Northstar',
    description: 'A small tool that helps good ideas find their direction.',
    status: 'in_progress',
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-29T09:00:00Z',
  },
  {
    id: '0e93c74f-de73-414b-864f-57ff3d995b8a',
    name: 'The reading corner',
    description: 'Make a little space for the things worth keeping.',
    status: 'completed',
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-26T09:00:00Z',
  },
  {
    id: 'd6c2ce30-86af-4653-bb8b-d43dfb4c55d7',
    name: 'Small hours',
    description: 'An early idea for a more intentional daily routine.',
    status: 'draft',
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-09-22T09:00:00Z',
  },
];
