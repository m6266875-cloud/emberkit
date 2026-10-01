import type { Metadata } from 'next';
import ProfileForm from '@/components/ProfileForm';
import ProfileSummary from '@/components/ProfileSummary';
import { requireUser } from '@/lib/auth';

export const metadata: Metadata = { title: 'Your profile' };
export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <>
      <div className="mb-8">
        <p className="eyebrow">The personal touch</p>
        <h1 className="page-heading mt-3">
          Make yourself at home<span className="text-ember">.</span>
        </h1>
        <p className="mt-3 text-sm text-muted">A few details that make this little corner yours.</p>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
        <ProfileSummary
          name={user.name}
          email={user.email}
          username={user.username}
          website={user.website}
          joined={user.createdAt.toISOString()}
        />
        <section className="panel p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight">Your details</h2>
          <p className="mb-7 mt-2 text-xs leading-6 text-muted">
            How you show up in your personal workspace.
          </p>
          <ProfileForm
            email={user.email}
            initialName={user.name}
            initialUsername={user.username}
            initialWebsite={user.website}
          />
        </section>
      </div>
    </>
  );
}
