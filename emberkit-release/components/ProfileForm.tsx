'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface ProfileFormProps {
  userId: string;
  email: string;
  initialFullName: string;
  initialUsername: string;
  initialWebsite: string;
}

export default function ProfileForm({
  userId,
  email,
  initialFullName,
  initialUsername,
  initialWebsite,
}: ProfileFormProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState(initialFullName || '');
  const [username, setUsername] = useState(initialUsername || '');
  const [website, setWebsite] = useState(initialWebsite || '');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: userId,
            full_name: fullName.trim(),
            username: username.trim(),
            website: website.trim(),
          },
          {
            onConflict: 'id',
          }
        );

      if (error) {
        console.error('Profile update error:', error);
        setMessage(error.message);
        return;
      }

      setMessage('Profile updated successfully!');

      // Refresh the Server Component so the updated
      // profile information appears immediately.
      router.refresh();
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full cursor-not-allowed rounded border border-ink-border bg-ink-surface/60 px-4 py-2.5 text-ink-muted dark:bg-ink"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
        />
      </div>

      {/* Username */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          className="w-full rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
        />
      </div>

      {/* Website */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          Website
        </label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="w-full rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-ember-500 px-4 py-2.5 font-semibold text-ink transition hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Saving…' : 'Save changes'}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`text-sm ${
            message.includes('successfully')
              ? 'text-emerald-500'
              : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}

    </form>
  );
}
