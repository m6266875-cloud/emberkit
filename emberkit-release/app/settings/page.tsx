import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/SignOutButton';
import ThemeToggle from '@/components/ThemeToggle';

export default async function SettingsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
      {/* Navigation */}
      <nav className="border-b border-ink-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="font-mono text-xs text-ink-muted transition hover:text-ink dark:hover:text-paper"
          >
            ← dashboard
          </Link>

          <span className="font-display font-semibold">Emberkit</span>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <p className="font-mono text-xs text-ember-600 dark:text-ember-400">settings</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-2 text-ink-muted">
            Manage your account and application preferences.
          </p>
        </div>

        <div className="space-y-6">

          {/* Account */}
          <section className="rounded-lg border border-ink-border p-6">
            <h2 className="font-display text-lg font-semibold">Account</h2>
            <p className="mt-1 text-sm text-ink-muted">Your account information.</p>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium">Email address</label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full cursor-not-allowed rounded border border-ink-border bg-ink-surface/60 px-4 py-2.5 text-ink-muted dark:bg-ink-soft"
              />
            </div>

            <div className="mt-4">
              <Link
                href="/profile"
                className="inline-block rounded border border-ink-border px-4 py-2 text-sm font-medium transition hover:bg-ink-surface dark:hover:bg-ink-soft"
              >
                Edit profile
              </Link>
            </div>
          </section>

          {/* Appearance */}
          <section className="rounded-lg border border-ink-border p-6">
            <h2 className="font-display text-lg font-semibold">Appearance</h2>
            <p className="mt-1 text-sm text-ink-muted">Choose how Emberkit looks for you.</p>

            <div className="mt-5 flex items-center justify-between rounded border border-ink-border p-4">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-sm text-ink-muted">Switch between light and dark mode.</p>
              </div>
              <ThemeToggle />
            </div>
          </section>

          {/* Security */}
          <section className="rounded-lg border border-ink-border p-6">
            <h2 className="font-display text-lg font-semibold">Security</h2>
            <p className="mt-1 text-sm text-ink-muted">Manage your current session.</p>

            <div className="mt-5">
              <SignOutButton />
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-lg border border-red-900/40 p-6">
            <h2 className="font-display text-lg font-semibold text-red-500">Danger zone</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Permanently deleting an account should be handled carefully.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed rounded border border-red-900/40 px-4 py-2 text-sm font-medium text-red-500 opacity-50"
            >
              Delete account
            </button>

            <p className="mt-2 text-xs text-ink-faint">
              Account deletion will be added after the billing and
              subscription system is complete.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
