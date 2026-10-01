'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, LockKeyhole, Palette } from 'lucide-react';
import DashboardContent from '@/components/DashboardContent';
import ProjectsManager from '@/components/ProjectsManager';
import ProfileSummary from '@/components/ProfileSummary';
import AppearanceSettings from '@/components/AppearanceSettings';
import Notice from '@/components/Notice';
import type { WorkspaceView } from '@/components/AppShell';
import type { ProjectFormInput } from '@/components/ProjectForm';
import type { ProjectRecord } from '@/lib/projects';
import { demoProjects, demoUser } from '@/lib/demo';

export default function DemoWorkspace({
  view,
  initialCreate,
  initialProjectId,
}: {
  view: WorkspaceView;
  initialCreate?: boolean;
  initialProjectId?: string;
}) {
  const [projects, setProjects] = useState<ProjectRecord[]>(demoProjects);
  async function saveDemo(input: ProjectFormInput, id?: string) {
    if (!input.name.trim()) throw new Error('Give your project a name.');
    const existing = projects.find((project) => project.id === id);
    const now = new Date().toISOString();
    const project: ProjectRecord = {
      ...input,
      name: input.name.trim(),
      description: input.description.trim() || null,
      id: existing?.id || crypto.randomUUID(),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    setProjects((current) =>
      existing
        ? current.map((record) => (record.id === existing.id ? project : record))
        : [project, ...current],
    );
    return project;
  }
  if (view === 'projects')
    return (
      <ProjectsManager
        projects={projects}
        demo
        onDemoSave={saveDemo}
        initialCreate={initialCreate}
        initialProjectId={initialProjectId}
      />
    );
  if (view === 'profile')
    return (
      <>
        <div className="mb-8">
          <p className="eyebrow">The personal touch / Demo</p>
          <h1 className="page-heading mt-3">
            Make yourself at home<span className="text-ember">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            This is an example profile, not a signed-in account.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
          <ProfileSummary {...demoUser} joined="2026-09-01T12:00:00Z" />
          <section className="panel p-7">
            <h2 className="text-lg font-semibold tracking-tight">A little corner that’s yours.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              In your real workspace, you can update your name, choose a username, and add your
              website. Changes are saved to your own PostgreSQL account.
            </p>
            <div className="mt-6">
              <Notice>
                This profile is sample data. Create an account to save your own details.
              </Notice>
            </div>
            <Link href="/signup" className="btn-primary mt-7">
              Create your account
              <ArrowRight size={16} />
            </Link>
          </section>
        </div>
      </>
    );
  if (view === 'settings')
    return (
      <>
        <div className="mb-8">
          <p className="eyebrow">The little things, your way / Demo</p>
          <h1 className="page-heading mt-3">
            Your settings<span className="text-ember">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            Try the appearance controls. Account and billing changes require a real account.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <section className="panel p-7">
            <Palette size={22} className="text-ember" />
            <h2 className="mb-2 mt-5 text-lg font-semibold">A look that feels like you</h2>
            <p className="mb-6 text-xs leading-6 text-muted">
              This preference is saved locally in your browser—even in the demo.
            </p>
            <AppearanceSettings />
          </section>
          <section className="panel p-7">
            <LockKeyhole size={22} className="text-ember" />
            <h2 className="mt-5 text-lg font-semibold">Keep your account yours</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Your real account includes password changes, session sign-out, and optional Stripe
              subscriptions. No credentials or payments are collected in this demo.
            </p>
            <Link href="/signup" className="btn-primary mt-7">
              Make a real workspace
              <ArrowRight size={15} />
            </Link>
          </section>
        </div>
      </>
    );
  return <DashboardContent user={demoUser} projects={projects} demo />;
}
