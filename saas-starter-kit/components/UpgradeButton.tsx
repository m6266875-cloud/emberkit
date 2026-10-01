'use client';
import { useState } from 'react';
import { ArrowUpRight, CreditCard, LoaderCircle } from 'lucide-react';
import Notice from '@/components/Notice';
import { apiFetch } from '@/lib/api-client';

export default function UpgradeButton({
  enabled,
  subscribed = false,
}: {
  enabled: boolean;
  subscribed?: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function openBilling() {
    setPending(true);
    setError('');
    try {
      const result = await apiFetch<{ url: string }>(
        subscribed ? '/api/stripe/portal' : '/api/stripe/checkout',
        'POST',
      );
      window.location.assign(result.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to open billing.');
      setPending(false);
    }
  }
  return (
    <div>
      <button
        type="button"
        className="btn-primary"
        onClick={openBilling}
        disabled={!enabled || pending}
      >
        {pending ? <LoaderCircle size={15} className="spinner" /> : <CreditCard size={15} />}
        {!enabled
          ? 'Billing not configured'
          : pending
            ? 'Opening Stripe…'
            : subscribed
              ? 'Manage subscription'
              : 'Explore your configured plan'}
        {enabled && !pending && <ArrowUpRight size={14} />}
      </button>
      {error && (
        <div className="mt-4">
          <Notice type="error">{error}</Notice>
        </div>
      )}
    </div>
  );
}
