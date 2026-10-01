import { request, expect, type APIRequestContext } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export const baseURL = process.env.E2E_BASE_URL || 'http://127.0.0.1:3000';
export const testPassword = 'SyntheticAccount_123!';
export async function accountContext() {
  return request.newContext({ baseURL, extraHTTPHeaders: { Origin: new URL(baseURL).origin } });
}
export async function register(
  context: APIRequestContext,
  email: string,
  name = 'Synthetic Builder',
) {
  const response = await context.post('/api/auth/register', {
    data: { name, email, password: testPassword },
  });
  expect(response.status()).toBe(201);
  return (await response.json()).user as { id: string; name: string; email: string };
}
export async function login(context: APIRequestContext, email: string, password = testPassword) {
  const csrf = await (await context.get('/api/auth/csrf')).json();
  const response = await context.post('/api/auth/callback/credentials', {
    form: { csrfToken: csrf.csrfToken, email, password, callbackUrl: '/dashboard', json: 'true' },
  });
  return { response, body: await response.json() };
}
export function testDatabase() {
  if (process.env.E2E_DATABASE_READY !== '1' || !process.env.DATABASE_URL)
    throw new Error('A disposable PostgreSQL test database must be explicitly enabled.');
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL, max: 2 }),
  });
}
