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
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            ← Back to Dashboard
          </Link>

          <span className="font-bold">Emberkit</span>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account and application preferences.
          </p>
        </div>

        <div className="space-y-6">

          {/* Account */}
          <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold">
              Account
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your account information.
            </p>

            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                Email address
              </label>

              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-4 py-3 text-gray-500"
              />
            </div>

            <div className="mt-4">
              <Link
                href="/profile"
                className="inline-block rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                Edit Profile
              </Link>
            </div>
          </section>

          {/* Appearance */}
          <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose how Emberkit looks for you.
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-900 p-4">
              <div>
                <p className="font-medium">
                  Theme
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark mode.
                </p>
              </div>

              <ThemeToggle />
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold">
              Security
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your current session.
            </p>

            <div className="mt-5">
              <SignOutButton />
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-2xl border border-red-200 dark:border-red-900/50 p-6">
            <h2 className="text-lg font-semibold text-red-600">
              Danger Zone
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Permanently deleting an account should be handled carefully.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-500 opacity-50 cursor-not-allowed"
            >
              Delete Account
            </button>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Account deletion will be added after the billing and
              subscription system is complete.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}