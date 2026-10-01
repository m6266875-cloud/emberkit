'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';
import Notice from '@/components/Notice';
import { apiFetch } from '@/lib/api-client';

export default function DeleteProjectButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function remove() {
    setPending(true);
    setError('');
    try {
      await apiFetch(`/api/projects/${id}`, 'DELETE');
      router.replace('/projects');
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to delete your project.');
      setPending(false);
    }
  }
  return (
    <>
      <button type="button" className="btn-danger" onClick={() => setOpen(true)}>
        <Trash2 size={14} />
        Delete project
      </button>
      {open && (
        <Modal
          title="Let this idea go?"
          onClose={() => {
            if (!pending) setOpen(false);
          }}
        >
          <p className="text-sm leading-7 text-muted">
            This permanently deletes{' '}
            <strong className="font-semibold text-foreground">{name}</strong>. It can’t be undone.
          </p>
          {error && (
            <div className="mt-4">
              <Notice type="error">{error}</Notice>
            </div>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="btn-secondary"
              disabled={pending}
              onClick={() => setOpen(false)}
            >
              Keep project
            </button>
            <button type="button" className="btn-danger" disabled={pending} onClick={remove}>
              {pending ? <LoaderCircle size={14} className="spinner" /> : <Trash2 size={14} />}
              {pending ? 'Deleting…' : 'Yes, delete project'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
