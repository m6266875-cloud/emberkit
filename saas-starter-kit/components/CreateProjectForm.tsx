'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Toast from '@/components/Toast';

export default function CreateProjectForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name.trim()) {
      setToast({
        message: 'Project name is required.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    setToast(null);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setToast({
        message: 'You must be logged in.',
        type: 'error',
      });

      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: name.trim(),
        description: description.trim() || null,
        status,
      });

    if (error) {
      console.error('Create project error:', error);

      setToast({
        message: error.message,
        type: 'error',
      });

      setLoading(false);
      return;
    }

    setName('');
    setDescription('');
    setStatus('draft');

    setToast({
      message: 'Project created successfully!',
      type: 'success',
    });

    setLoading(false);

    router.refresh();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900 space-y-5"
      >
        {/* Heading */}
        <div>
          <h2 className="text-lg font-semibold">
            Create a New Project
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Start a new project and manage it from your dashboard.
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. My SaaS App"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="draft">🟡 Draft</option>
            <option value="in_progress">🔵 In Progress</option>
            <option value="completed">🟢 Completed</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}