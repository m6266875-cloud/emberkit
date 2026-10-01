import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { testDatabase, testPassword } from './helpers';

test.describe('connected workspace browser flow', () => {
  test.skip(
    process.env.E2E_DATABASE_READY !== '1',
    'Requires an explicitly enabled disposable PostgreSQL database.',
  );
  test('signup, create/edit/delete, profile, theme, and password changes through the UI', async ({
    page,
  }) => {
    const database = testDatabase();
    const key = randomUUID().slice(0, 8);
    const email = `browser-${key}@example.test`;
    let userId: string | undefined;
    try {
      await page.goto('/signup');
      await page.getByLabel('Your name').fill('Browser Builder');
      await page.getByLabel('Email address').fill(email);
      await page.getByLabel('Password', { exact: true }).fill(testPassword);
      await page.getByRole('button', { name: 'Create your account', exact: true }).click();
      await expect(page).toHaveURL(/\/dashboard$/);
      userId = (await database.user.findUniqueOrThrow({ where: { email } })).id;
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back, Browser');
      await page.getByRole('link', { name: 'New project', exact: true }).click();
      await page.getByLabel('Project name').fill('A connected browser idea');
      await page.getByLabel('A little context').fill('Saved to the actual test database.');
      await page.getByLabel('Where does it stand?').selectOption('in_progress');
      await page.getByRole('button', { name: 'Create project', exact: true }).click();
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await page.getByRole('link', { name: /A connected browser idea/ }).click();
      await page.getByLabel('Project name').fill('An even better browser idea');
      await page.getByLabel('Where does it stand?').selectOption('completed');
      await page.getByRole('button', { name: 'Save changes' }).click();
      await expect(page.getByText('Your changes are saved.', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        'An even better browser idea',
      );
      await page.getByRole('link', { name: 'My profile', exact: true }).click();
      await page.getByLabel('Full name').fill('Updated Builder');
      await page.getByLabel('Username').fill(`builder_${key}`);
      await page.getByLabel('Website').fill('https://example.com');
      await page.getByRole('button', { name: 'Save your profile' }).click();
      await expect(page.getByText('Your profile is looking good. Changes saved.')).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'Updated Builder', exact: true }),
      ).toBeVisible();
      await page.getByRole('link', { name: 'Settings', exact: true }).click();
      await page.getByRole('button', { name: 'Dark', exact: true }).click();
      await expect(page.locator('html')).toHaveClass(/dark/);
      await page.reload();
      await expect(page.locator('html')).toHaveClass(/dark/);
      await page.getByRole('button', { name: 'Light', exact: true }).click();
      const newPassword = 'UpdatedBrowserPassword_123!';
      await page.getByLabel('Current password').fill(testPassword);
      await page.getByLabel('New password').fill(newPassword);
      await page.getByRole('button', { name: 'Update password' }).click();
      await expect(page).toHaveURL(/\/login\?password=changed/);
      await page.getByLabel('Email address').fill(email);
      await page.getByLabel('Password', { exact: true }).fill(newPassword);
      await page.getByRole('button', { name: 'Log in to your workspace' }).click();
      await expect(page).toHaveURL(/\/dashboard$/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome back, Updated');
      await page.getByRole('link', { name: 'Projects', exact: true }).click();
      await page.getByRole('link', { name: /An even better browser idea/ }).click();
      await page.getByRole('button', { name: 'Delete project', exact: true }).click();
      await page.getByRole('button', { name: 'Keep project', exact: true }).click();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        'An even better browser idea',
      );
      await page.getByRole('button', { name: 'Delete project', exact: true }).click();
      await page.getByRole('button', { name: 'Yes, delete project' }).click();
      await expect(page).toHaveURL(/\/projects$/);
      await expect(
        page.getByRole('heading', { name: 'Your first idea starts here.' }),
      ).toBeVisible();
      expect(await database.project.count({ where: { userId } })).toBe(0);
    } finally {
      if (userId) await database.user.deleteMany({ where: { id: userId } });
      await database.$disconnect();
    }
  });
});
