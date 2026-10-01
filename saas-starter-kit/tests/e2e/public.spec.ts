import { test, expect } from '@playwright/test';

test('landing, docs, FAQ, and labeled demo are connected', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('From first spark');
  await page.locator('summary').filter({ hasText: 'Do I still need Supabase?' }).click();
  await expect(
    page.getByText('No. This version uses standard PostgreSQL', { exact: false }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Explore the workspace', exact: true }).click();
  await expect(page).toHaveURL(/\/preview$/);
  await expect(page.getByText('Demo workspace', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back, Alex');
  await page.goto('/guide');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your first spark');
  await expect(page.getByText('npm run db:deploy', { exact: false }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('theme preferences survive a reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('demo project search, filter, layout, create and edit are interactive without API writes', async ({
  page,
}) => {
  const mutationRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/api/projects') && request.method() !== 'GET')
      mutationRequests.push(request.url());
  });
  await page.goto('/preview?view=projects');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Your projects.');
  await page.getByLabel('Search projects').fill('Orbit');
  await expect(page.getByRole('heading', { name: 'Orbit — your next SaaS' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Studio website' })).not.toBeVisible();
  await page.getByLabel('Filter by status').selectOption('completed');
  await expect(page.getByRole('heading', { name: 'No ideas by that name.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByRole('button', { name: 'List view' }).click();
  await expect(page.getByRole('button', { name: 'List view' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'New project', exact: true }).click();
  await page.getByLabel('Project name').fill('A preview-only idea');
  await page.getByLabel('A little context').fill('Sample data, never saved.');
  await page.getByLabel('Where does it stand?').selectOption('in_progress');
  await page.getByRole('button', { name: 'Create project', exact: true }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button', { name: /A preview-only idea/ }).click();
  await page.getByLabel('Project name').fill('A better preview-only idea');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.getByRole('heading', { name: 'A better preview-only idea' })).toBeVisible();
  expect(mutationRequests).toEqual([]);
});

test('mobile navigation works and layouts do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  await page.locator('#mobile-site-nav').getByRole('link', { name: 'Get started →' }).click();
  await expect(page).toHaveURL(/\/signup$/);
  for (const path of [
    '/',
    '/signup',
    '/login',
    '/guide',
    '/preview',
    '/preview?view=projects',
    '/preview?view=profile',
    '/preview?view=settings',
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const size = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(size.content, `horizontal overflow on ${path}`).toBeLessThanOrEqual(size.viewport + 1);
  }
  await page.goto('/preview');
  await page.getByRole('button', { name: 'Open workspace navigation' }).click();
  await page.getByRole('dialog').getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/view=projects/);
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('auth forms cannot submit passwords into URLs before JavaScript is ready', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/signup');
    await expect(page.locator('form')).toHaveAttribute('method', 'post');
    await expect(page.getByLabel('Email address')).toBeDisabled();
    await expect(page.getByLabel('Password', { exact: true })).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Create your account', exact: true }),
    ).toBeDisabled();
    await expect(page.locator('noscript p')).toBeVisible();
    await expect(page.locator('noscript p')).toHaveText(
      'Enable JavaScript to use secure signup and sign-in.',
    );
  } finally {
    await context.close();
  }
});
