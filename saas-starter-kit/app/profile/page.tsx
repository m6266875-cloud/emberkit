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
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <span className="font-bold">Emberkit</span>

        </div>
      </nav>

      {/* Page */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Your Profile
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your personal information.
          </p>
        </div>

        {/* PROFILE SUMMARY */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8 bg-white dark:bg-gray-900">

          {/* Avatar + Name */}
          <div className="flex items-center gap-5 mb-6">

            <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
              {avatarLetter}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {displayName}
              </h2>

              {username ? (
                <p className="text-gray-500 dark:text-gray-400">
                  @{username}
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No username added
                </p>
              )}
            </div>

          </div>

          {/* Profile Information */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Email */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Email
              </p>

              <p className="mt-1 font-medium break-all">
                {user.email || 'No email'}
              </p>
            </div>

            {/* Full Name */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Full Name
              </p>

              <p className="mt-1 font-medium">
                {fullName || 'Not added yet'}
              </p>
            </div>

            {/* Username */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Username
              </p>

              <p className="mt-1 font-medium">
                {username ? `@${username}` : 'Not added yet'}
              </p>
            </div>

            {/* Website */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Website
              </p>

              {website ? (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-medium text-indigo-500 hover:text-indigo-400 break-all"
                >
                  {website}
                </a>
              ) : (
                <p className="mt-1 font-medium">
                  Not added yet
                </p>
              )}
            </div>

          </div>
        </div>

        {/* EDIT PROFILE */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Edit Profile
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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