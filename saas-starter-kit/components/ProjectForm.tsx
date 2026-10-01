'use client';
import { useState } from 'react';
import { useHydrated } from '@/lib/use-hydrated';
import { useRouter } from 'next/navigation';
import { Check, LoaderCircle, Plus } from 'lucide-react';
import Notice from '@/components/Notice';
import { apiFetch } from '@/lib/api-client';
import { statusLabels, type ProjectRecord, type ProjectStatus } from '@/lib/projects';

export type ProjectFormInput = { name: string; description: string; status: ProjectStatus };
export type ProjectFormProps = {
  project?: ProjectRecord;
  onSuccess?: (project: ProjectRecord) => void;
  onSave?: (input: ProjectFormInput, id?: string) => Promise<ProjectRecord>;
};

export default function ProjectForm({ project, onSuccess, onSave }: ProjectFormProps) {
  const router = useRouter();
  const hydrated = useHydrated();
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'draft');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    setSaved(false);
    try {
      const input = { name, description, status };
      const result = onSave
        ? await onSave(input, project?.id)
        : (
            await apiFetch<{ project: ProjectRecord }>(
              project ? `/api/projects/${project.id}` : '/api/projects',
              project ? 'PATCH' : 'POST',
              input,
            )
          ).project;
      setSaved(true);
      onSuccess?.(result);
      if (!onSave) router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save your project.');
    } finally {
      setPending(false);
    }
  }
  return (
    <form method="post" onSubmit={submit} className="space-y-5">
      <fieldset disabled={pending || !hydrated} className="space-y-5">
        <div>
          <label htmlFor="project-name" className="field-label">
            Project name
          </label>
          <input
            id="project-name"
            name="name"
            className="field"
            required
            maxLength={100}
            placeholder="Your next big idea"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="project-description" className="field-label">
            A little context <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="project-description"
            name="description"
            className="field min-h-[125px] resize-y"
            rows={4}
            maxLength={2000}
            placeholder="What are you making? What does a great outcome look like?"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <p className="field-help">Give future you a helpful place to start.</p>
        </div>
        <div>
          <label htmlFor="project-status" className="field-label">
            Where does it stand?
          </label>
          <select
            id="project-status"
            name="status"
            className="field"
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectStatus)}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {error && <Notice type="error">{error}</Notice>}
      {saved && !onSuccess && <Notice type="success">Your changes are saved.</Notice>}
      <div className="border-t border-line pt-5">
        <button type="submit" className="btn-primary" disabled={pending || !hydrated}>
          {pending ? (
            <LoaderCircle size={15} className="spinner" />
          ) : project ? (
            <Check size={15} />
          ) : (
            <Plus size={15} />
          )}
          {pending ? 'Saving your idea…' : project ? 'Save changes' : 'Create project'}
        </button>
      </div>
    </form>
  );
}
