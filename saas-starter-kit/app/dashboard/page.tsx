import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from '@/components/SignOutButton';
import UpgradeButton from '@/components/UpgradeButton';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen">
      <nav className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <span className="font-bold">Emberkit</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <SignOutButton />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">Welcome back 👋</h1>
        <p className="text-gray-600 mb-8">
          This is your protected dashboard. Replace this with your actual product.
        </p>

        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold mb-2">Not subscribed yet?</h2>
          <p className="text-gray-600 text-sm mb-4">
            Upgrade to unlock full access.
          </p>
          <UpgradeButton />
        </div>
      </div>
    </main>
  );
}
