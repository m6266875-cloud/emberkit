'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/login?message=Check your email to confirm your account');
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-6 dark:bg-ink">
      <div className="absolute inset-0 -z-10 bg-grid-paper dark:bg-grid-ink [mask-image:radial-gradient(ellipse_50%_50%_at_50%_40%,black,transparent)]" />

      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2 font-display text-lg font-semibold text-ink dark:text-paper"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-ember-500 font-mono text-sm text-ink">
            e
          </span>
          Emberkit
        </Link>

        <div className="rounded-lg border border-ink-border bg-paper p-8 shadow-xl shadow-ink/5 dark:bg-ink-soft dark:shadow-black/40">
          <h1 className="font-display text-2xl font-semibold text-ink dark:text-paper">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Start your free trial, no card required.
          </p>

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-ink-border bg-paper px-4 py-2.5 text-ink placeholder-ink-faint outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-ink-border bg-paper px-4 py-2.5 text-ink placeholder-ink-faint outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
                placeholder="At least 6 characters"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-ember-500 py-2.5 font-semibold text-ink transition hover:bg-ember-400 disabled:opacity-50"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-ember-600 dark:text-ember-400">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
