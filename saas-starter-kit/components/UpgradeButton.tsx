'use client';

import { useState } from 'react';

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  function handleUpgrade() {
    setLoading(true);

    window.location.href =
      'https://hudadigi.lemonsqueezy.com/checkout/buy/b551302a-0970-42a4-b47a-3835aa6fe93e';
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