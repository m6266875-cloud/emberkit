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
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          disabled
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-4 py-3 text-gray-500"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Full Name
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Username
        </label>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Website
        </label>

        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yourwebsite.com"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`text-sm ${
            message.includes('successfully')
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}

    </form>
  );
}