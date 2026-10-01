import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { accountContext, login, register, testDatabase, testPassword } from './helpers';

test.describe('real PostgreSQL account and ownership integration', () => {
  test.skip(
    process.env.E2E_DATABASE_READY !== '1',
    'Requires an explicitly enabled disposable PostgreSQL database.',
  );

  test('signup, login, persistence, isolation, validation, rate limits, and session revocation', async () => {
    const database = testDatabase();
    const alice = await accountContext();
    const bob = await accountContext();
    const visitor = await accountContext();
    const createdIds: string[] = [];
    const key = randomUUID().slice(0, 8);
    const aliceEmail = `alice-${key}@example.test`;
    const bobEmail = `bob-${key}@example.test`;
    try {
      expect((await visitor.get('/api/projects')).status()).toBe(401);
      expect((await visitor.get('/dashboard', { maxRedirects: 0 })).headers().location).toContain(
        '/login',
      );
      const aliceUser = await register(alice, `  ${aliceEmail.toUpperCase()}  `);
      createdIds.push(aliceUser.id);
      const bobUser = await register(bob, bobEmail);
      createdIds.push(bobUser.id);
      expect(aliceUser.email).toBe(aliceEmail);
      const stored = await database.user.findUniqueOrThrow({ where: { id: aliceUser.id } });
      expect(stored.passwordHash).toMatch(/^\$2[ab]\$12\$/);
      expect(stored.passwordHash).not.toBe(testPassword);
      expect(JSON.stringify(aliceUser)).not.toContain('password');
      expect((await login(alice, aliceEmail)).response.ok()).toBe(true);
      expect((await login(bob, bobEmail)).response.ok()).toBe(true);
      const create = await alice.post('/api/projects', {
        data: {
          name: 'A real PostgreSQL idea',
          description: 'Persisted, not sample data.',
          status: 'draft',
        },
      });
      expect(create.status()).toBe(201);
      const project = (await create.json()).project;
      expect(project).not.toHaveProperty('userId');
      expect((await database.project.findUniqueOrThrow({ where: { id: project.id } })).userId).toBe(
        aliceUser.id,
      );
      expect((await alice.get(`/api/projects/${project.id}`)).status()).toBe(200);
      expect((await bob.get(`/api/projects/${project.id}`)).status()).toBe(404);
      expect(
        (
          await bob.patch(`/api/projects/${project.id}`, {
            data: { name: 'Stolen', status: 'completed' },
          })
        ).status(),
      ).toBe(404);
      expect((await bob.delete(`/api/projects/${project.id}`)).status()).toBe(404);
      const hiddenPage = await bob.get(`/projects/${project.id}`);
      const hiddenHtml = await hiddenPage.text();
      // Next.js streamed not-found pages may use HTTP 200; private data must still be absent.
      expect(hiddenHtml).toContain('That idea isn’t here.');
      expect(hiddenHtml).not.toContain('A real PostgreSQL idea');
      expect(hiddenHtml).toContain('noindex');
      expect((await (await bob.get('/api/projects')).json()).projects).toEqual([]);
      expect(
        (
          await alice.post('/api/projects', { data: { name: 'Forged owner', userId: bobUser.id } })
        ).status(),
      ).toBe(400);
      expect(
        (await alice.post('/api/projects', { data: { name: 'Idea', status: 'admin' } })).status(),
      ).toBe(400);
      expect(
        (
          await alice.post('/api/projects', {
            data: { name: 'Cross-site' },
            headers: { Origin: 'https://other-site.invalid' },
          })
        ).status(),
      ).toBe(403);
      expect(
        (
          await alice.post('/api/projects', {
            data: 'plain text',
            headers: { 'Content-Type': 'text/plain' },
          })
        ).status(),
      ).toBe(415);
      expect((await alice.get('/api/projects/not-a-uuid')).status()).toBe(400);
      expect(
        (
          await alice.patch(`/api/projects/${project.id}`, {
            data: {
              name: 'Updated PostgreSQL idea',
              description: 'Still mine.',
              status: 'completed',
            },
          })
        ).status(),
      ).toBe(200);
      expect((await database.project.findUniqueOrThrow({ where: { id: project.id } })).status).toBe(
        'completed',
      );
      expect(
        (
          await alice.patch('/api/profile', {
            data: {
              name: 'A Better Builder',
              username: `builder_${key}`,
              website: 'https://example.com',
            },
          })
        ).status(),
      ).toBe(200);
      expect((await database.user.findUniqueOrThrow({ where: { id: bobUser.id } })).name).toBe(
        'Synthetic Builder',
      );
      expect(
        (
          await alice.patch('/api/profile', {
            data: { name: 'Nope', username: '', website: 'javascript:alert(1)' },
          })
        ).status(),
      ).toBe(400);
      expect(
        (
          await alice.patch('/api/profile', {
            data: { name: 'Nope', username: '', website: '', id: bobUser.id },
          })
        ).status(),
      ).toBe(400);
      if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID)
        expect((await alice.post('/api/stripe/checkout', { data: {} })).status()).toBe(503);
      const anotherSession = await accountContext();
      try {
        expect((await login(anotherSession, aliceEmail)).response.ok()).toBe(true);
        const newPassword = 'DifferentSyntheticPassword_123!';
        expect(
          (
            await alice.patch('/api/account/password', {
              data: { currentPassword: 'WrongPassword_123!', newPassword },
            })
          ).status(),
        ).toBe(400);
        expect(
          (
            await alice.patch('/api/account/password', {
              data: { currentPassword: testPassword, newPassword },
            })
          ).status(),
        ).toBe(200);
        expect((await alice.get('/api/projects')).status()).toBe(401);
        expect((await anotherSession.get('/api/projects')).status()).toBe(401);
        const oldPassword = await login(alice, aliceEmail, testPassword);
        expect(oldPassword.body.url).toContain('CredentialsSignin');
        expect((await login(alice, aliceEmail, newPassword)).response.ok()).toBe(true);
        const projects = (await (await alice.get('/api/projects')).json()).projects;
        expect(projects.map((item: { id: string }) => item.id)).toContain(project.id);
      } finally {
        await anotherSession.dispose();
      }
      const blockedEmail = `rate-limit-${key}@example.test`;
      for (let attempt = 0; attempt < 10; attempt++)
        await login(visitor, blockedEmail, testPassword);
      expect((await login(visitor, blockedEmail, testPassword)).body.url).toContain('RATE_LIMITED');
      expect((await alice.delete(`/api/projects/${project.id}`)).status()).toBe(200);
      expect((await alice.get(`/api/projects/${project.id}`)).status()).toBe(404);
    } finally {
      await database.user.deleteMany({ where: { id: { in: createdIds } } });
      await database.$disconnect();
      await alice.dispose();
      await bob.dispose();
      await visitor.dispose();
    }
  });
});
