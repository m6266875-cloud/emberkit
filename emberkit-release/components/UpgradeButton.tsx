'use client';

import { useState } from 'react';

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    const res = await fetch('/api/stripe/checkout', { method: 'POST' });
    const data = await res.json();
    setLoading(false);

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="w-full rounded bg-ember-500 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-ember-400 disabled:opacity-50"
    >
      {loading ? 'Redirecting…' : 'Upgrade now'}
    </button>
  );
}
