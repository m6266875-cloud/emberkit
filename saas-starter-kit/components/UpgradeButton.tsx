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
      className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition disabled:opacity-50"
    >
      {loading ? 'Redirecting...' : 'Upgrade now'}
    </button>
  );
}
