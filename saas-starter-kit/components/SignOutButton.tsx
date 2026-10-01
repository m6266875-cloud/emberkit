'use client';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoaderCircle, LogOut } from 'lucide-react';

export default function SignOutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function logout() {
    setPending(true);
    setError('');
    try {
      await signOut({ redirect: false });
      router.replace('/login');
      router.refresh();
    } catch {
      setError('Unable to sign out. Try again.');
      setPending(false);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={logout}
        disabled={pending}
        className={
          compact ? 'icon-button h-8 w-8 border-transparent bg-transparent' : 'btn-secondary'
        }
        aria-label="Sign out"
      >
        {pending ? <LoaderCircle size={16} className="spinner" /> : <LogOut size={16} />}
        {!compact && 'Sign out'}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
