'use client';
import { useState } from 'react';
import { useHydrated } from '@/lib/use-hydrated';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LoaderCircle, LockKeyhole } from 'lucide-react';
import Notice from '@/components/Notice';
import { apiFetch } from '@/lib/api-client';

export default function PasswordForm() {
  const router = useRouter();
  const hydrated = useHydrated();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      await apiFetch('/api/account/password', 'PATCH', { currentPassword, newPassword });
      await signOut({ redirect: false });
      router.replace('/login?password=changed');
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to change your password.');
      setPending(false);
    }
  }
  return (
    <form method="post" onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="current-password" className="field-label">
          Current password
        </label>
        <input
          id="current-password"
          className="field"
          type="password"
          required
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          disabled={pending || !hydrated}
        />
      </div>
      <div>
        <label htmlFor="new-password" className="field-label">
          New password
        </label>
        <input
          id="new-password"
          className="field"
          type="password"
          required
          minLength={10}
          autoComplete="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          disabled={pending || !hydrated}
        />
        <p className="field-help">
          Use at least 10 characters, up to 72 bytes. Updating your password signs out all existing
          sessions.
        </p>
      </div>
      {error && <Notice type="error">{error}</Notice>}
      <button type="submit" className="btn-secondary" disabled={pending || !hydrated}>
        {pending ? <LoaderCircle size={15} className="spinner" /> : <LockKeyhole size={15} />}
        {pending ? 'Updating password…' : 'Update password'}
      </button>
    </form>
  );
}
