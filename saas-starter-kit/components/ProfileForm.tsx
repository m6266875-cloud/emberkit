'use client';
import { useState } from 'react';
import { useHydrated } from '@/lib/use-hydrated';
import { useRouter } from 'next/navigation';
import { Check, LoaderCircle } from 'lucide-react';
import Notice from '@/components/Notice';
import { apiFetch } from '@/lib/api-client';

export default function ProfileForm({
  email,
  initialName,
  initialUsername,
  initialWebsite,
}: {
  email: string;
  initialName: string;
  initialUsername: string | null;
  initialWebsite: string | null;
}) {
  const router = useRouter();
  const hydrated = useHydrated();
  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername || '');
  const [website, setWebsite] = useState(initialWebsite || '');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    setSaved(false);
    try {
      await apiFetch('/api/profile', 'PATCH', { name, username, website });
      setSaved(true);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to update your profile.');
    } finally {
      setPending(false);
    }
  }
  return (
    <form method="post" onSubmit={submit} className="space-y-5">
      <fieldset disabled={pending || !hydrated} className="space-y-5">
        <div>
          <label htmlFor="profile-name" className="field-label">
            Full name
          </label>
          <input
            id="profile-name"
            className="field"
            required
            maxLength={80}
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profile-email" className="field-label">
            Email address
          </label>
          <input id="profile-email" className="field" type="email" value={email} disabled />
          <p className="field-help">
            Your account’s sign-in address. Email changes are not enabled.
          </p>
        </div>
        <div>
          <label htmlFor="profile-username" className="field-label">
            Username <span className="font-normal text-muted">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">@</span>
            <input
              id="profile-username"
              className="field pl-9"
              maxLength={30}
              placeholder="yourname"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <p className="field-help">3–30 letters, numbers, or underscores.</p>
        </div>
        <div>
          <label htmlFor="profile-website" className="field-label">
            Website <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="profile-website"
            className="field"
            type="url"
            maxLength={300}
            placeholder="https://your-corner-of-the-internet.com"
            autoComplete="url"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
      </fieldset>
      {error && <Notice type="error">{error}</Notice>}
      {saved && <Notice type="success">Your profile is looking good. Changes saved.</Notice>}
      <div className="border-t border-line pt-5">
        <button type="submit" disabled={pending || !hydrated} className="btn-primary">
          {pending ? <LoaderCircle size={15} className="spinner" /> : <Check size={15} />}
          {pending ? 'Saving your details…' : 'Save your profile'}
        </button>
      </div>
    </form>
  );
}
