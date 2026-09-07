import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ProfileForm from '@/components/ProfileForm';

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  const fullName = profile?.full_name || '';
  const username = profile?.username || '';
  const website = profile?.website || '';

  const displayName = fullName || 'Your Name';

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">

      {/* Navbar */}
      <nav className="border-b border-ink-border px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/dashboard"
            className="font-mono text-xs text-ink-muted transition hover:text-ink dark:hover:text-paper"
          >
            ← dashboard
          </Link>

          <span className="font-display font-semibold">Emberkit</span>
        </div>
      </nav>

      {/* Page */}
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* Heading */}
        <div className="mb-8">
          <p className="font-mono text-xs text-ember-600 dark:text-ember-400">profile</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            Your profile
          </h1>
          <p className="mt-2 text-ink-muted">
            View and manage your personal information.
          </p>
        </div>

        {/* PROFILE SUMMARY */}
        <div className="mb-6 rounded-lg border border-ink-border bg-paper p-6 dark:bg-ink-soft">

          {/* Avatar + Name */}
          <div className="mb-6 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-500 font-display text-2xl font-semibold text-ink">
              {avatarLetter}
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold">{displayName}</h2>
              <p className="font-mono text-sm text-ink-faint">
                {username ? `@${username}` : 'no username added'}
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid gap-px overflow-hidden rounded border border-ink-border bg-ink-border sm:grid-cols-2">

            <div className="bg-paper p-4 dark:bg-ink">
              <p className="font-mono text-[11px] text-ink-faint">email</p>
              <p className="mt-1 break-all text-sm font-medium">{user.email || 'No email'}</p>
            </div>

            <div className="bg-paper p-4 dark:bg-ink">
              <p className="font-mono text-[11px] text-ink-faint">full name</p>
              <p className="mt-1 text-sm font-medium">{fullName || 'Not added yet'}</p>
            </div>

            <div className="bg-paper p-4 dark:bg-ink">
              <p className="font-mono text-[11px] text-ink-faint">username</p>
              <p className="mt-1 text-sm font-medium">
                {username ? `@${username}` : 'Not added yet'}
              </p>
            </div>

            <div className="bg-paper p-4 dark:bg-ink">
              <p className="font-mono text-[11px] text-ink-faint">website</p>
              {website ? (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block break-all text-sm font-medium text-ember-600 hover:text-ember-500 dark:text-ember-400"
                >
                  {website}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium">Not added yet</p>
              )}
            </div>
          </div>
        </div>

        {/* EDIT PROFILE */}
        <div className="rounded-lg border border-ink-border bg-paper p-6 dark:bg-ink-soft">
          <div className="mb-6">
            <h2 className="font-display text-lg font-semibold">Edit profile</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Update your personal information below.
            </p>
          </div>

          <ProfileForm
            userId={user.id}
            email={user.email || ''}
            initialFullName={fullName}
            initialUsername={username}
            initialWebsite={website}
          />
        </div>

      </div>
    </main>
  );
}
