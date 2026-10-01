import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CreditCard, LockKeyhole, Palette } from 'lucide-react';
import AppearanceSettings from '@/components/AppearanceSettings';
import PasswordForm from '@/components/PasswordForm';
import UpgradeButton from '@/components/UpgradeButton';
import SignOutButton from '@/components/SignOutButton';
import Notice from '@/components/Notice';
import { requireUser } from '@/lib/auth';
import { isBillingConfigured } from '@/lib/env';

export const metadata: Metadata = { title: 'Your settings' };
export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ billing?: string }>;
}) {
  const user = await requireUser();
  const enabled = isBillingConfigured();
  const billing = (await searchParams).billing;
  return (
    <>
      <div className="mb-8">
        <p className="eyebrow">The little things, your way</p>
        <h1 className="page-heading mt-3">
          Your settings<span className="text-ember">.</span>
        </h1>
        <p className="mt-3 text-sm text-muted">
          Make the workspace comfortable. Keep your account secure.
        </p>
      </div>
      {billing === 'success' && (
        <div className="mb-6">
          <Notice type="success">
            Checkout completed. Your plan updates after the signed Stripe webhook is received.
          </Notice>
        </div>
      )}
      {billing === 'cancelled' && (
        <div className="mb-6">
          <Notice>Checkout cancelled. You haven’t been charged by this checkout.</Notice>
        </div>
      )}
      <div className="grid items-start gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <section className="panel p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-muted">
                <Palette size={19} />
              </span>
              <div>
                <h2 className="text-base font-semibold">A look that feels like you</h2>
                <p className="mt-1 text-xs leading-6 text-muted">
                  Choose a theme. It’s remembered on this browser.
                </p>
              </div>
            </div>
            <AppearanceSettings />
          </section>
          <section className="panel p-6 sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-muted">
                <LockKeyhole size={19} />
              </span>
              <div>
                <h2 className="text-base font-semibold">Keep your account yours</h2>
                <p className="mt-1 text-xs leading-6 text-muted">
                  A strong password is a good starting point.
                </p>
              </div>
            </div>
            <PasswordForm />
          </section>
        </div>
        <div className="space-y-6">
          <section className="panel p-6">
            <CreditCard size={21} className="text-ember" />
            <p className="eyebrow mt-5 text-[9px]">Your current plan</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {user.isSubscribed ? 'Pro workspace' : 'Starter workspace'}
            </h2>
            <p className="mt-3 text-xs leading-6 text-muted">
              {enabled
                ? 'Subscriptions and invoices are managed through your configured Stripe account.'
                : 'Your workspace works without payments. Add Stripe keys when you’re ready for subscriptions.'}
            </p>
            <div className="mt-6">
              <UpgradeButton enabled={enabled} subscribed={user.isSubscribed} />
            </div>
            {!enabled && (
              <Link
                href="/guide#billing"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold"
              >
                Connect optional billing
                <ArrowUpRight size={12} />
              </Link>
            )}
          </section>
          <section className="rounded-2xl border border-line p-6">
            <h2 className="text-sm font-semibold">Signing out for a bit?</h2>
            <p className="mt-2 break-all text-xs leading-6 text-muted">
              You’re signed in as {user.email}. Your projects will be here when you’re back.
            </p>
            <div className="mt-5">
              <SignOutButton />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
