import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, FolderKanban, Info } from 'lucide-react';
import EditProjectForm from '@/components/EditProjectForm';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import CopyValue from '@/components/CopyValue';
import StatusBadge from '@/components/StatusBadge';
import { requireUser } from '@/lib/auth';
import { database } from '@/lib/db';
import { projectIdSchema } from '@/lib/validation';
import { serializeProject } from '@/lib/projects';

export const metadata: Metadata = { title: 'Project details' };
export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const parsed = projectIdSchema.safeParse((await params).id);
  if (!parsed.success) notFound();
  const project = await database.project.findFirst({ where: { id: parsed.data, userId: user.id } });
  if (!project) notFound();
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  return (
    <>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to your projects
      </Link>
      <div className="mb-8 mt-7">
        <div className="flex items-center gap-3">
          <p className="eyebrow">Make a little progress</p>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="page-heading mt-3 break-words">{project.name}</h1>
        <p className="mt-3 text-sm text-muted">
          A new detail, a next step, a little closer to done.
        </p>
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[1fr_290px]">
        <section className="panel p-6 sm:p-8">
          <div className="mb-7 flex items-center gap-3 border-b border-line pb-6">
            <FolderKanban size={20} className="text-ember" />
            <div>
              <h2 className="text-base font-semibold">The project details</h2>
              <p className="mt-1 text-xs text-muted">
                Keep your idea clear and your progress visible.
              </p>
            </div>
          </div>
          <EditProjectForm project={serializeProject(project)} />
        </section>
        <div className="space-y-5">
          <section className="panel p-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Info size={15} className="text-muted" />A little context
            </h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="eyebrow text-[9px]">Created</dt>
                <dd className="mt-2 flex items-center gap-2 text-xs">
                  <CalendarDays size={13} className="text-muted" />
                  {formatDate(project.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[9px]">Last updated</dt>
                <dd className="mt-2 text-xs">{formatDate(project.updatedAt)}</dd>
              </div>
              <div className="border-t border-line pt-5">
                <dt className="eyebrow mb-2 text-[9px]">Project ID</dt>
                <dd>
                  <CopyValue value={project.id} />
                </dd>
              </div>
            </dl>
          </section>
          <div className="rounded-2xl border border-line p-5">
            <p className="text-xs font-semibold">Your idea is in good hands.</p>
            <p className="mt-2 text-[11px] leading-6 text-muted">
              Only your account can see or change this project. Everything is saved in your
              PostgreSQL database.
            </p>
          </div>
        </div>
      </div>
      <section className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-red-400/20 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-semibold">Ready to let this one go?</h2>
          <p className="mt-1 text-xs text-muted">
            Deleting a project is permanent. There’s no undo.
          </p>
        </div>
        <DeleteProjectButton id={project.id} name={project.name} />
      </section>
    </>
  );
}
