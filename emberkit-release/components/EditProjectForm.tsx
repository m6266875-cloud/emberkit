'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Toast from '@/components/Toast';

interface EditProjectFormProps {
  projectId: string;
  initialName: string;
  initialDescription: string;
  initialStatus: string;
}

export default function EditProjectForm({
  projectId,
  initialName,
  initialDescription,
  initialStatus,
}: EditProjectFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus || 'draft');

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
      .update({
        name: name.trim(),
        description: description.trim() || null,
        status,
      })
      .eq('id', projectId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Update project error:', error);

      setToast({
        message: error.message,
        type: 'error',
      });

      setLoading(false);
      return;
    }

    setToast({
      message: 'Project updated successfully!',
      type: 'success',
    });

    setLoading(false);

    router.refresh();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Project name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="w-full rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
            rows={5}
            className="w-full resize-none rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded border border-ink-border bg-paper px-4 py-2.5 text-ink outline-none transition focus:border-ember-500 focus:ring-1 focus:ring-ember-500 dark:bg-ink dark:text-paper"
          >
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Save */}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-ember-500 px-5 py-2.5 font-semibold text-ink transition hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Save changes'}
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