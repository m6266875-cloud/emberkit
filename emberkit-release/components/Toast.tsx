'use client';

import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export default function Toast({
  message,
  type = 'success',
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success:
      'border-emerald-800/50 bg-ink-soft text-emerald-400',
    error:
      'border-red-900/50 bg-ink-soft text-red-400',
    info:
      'border-ember-800/50 bg-ink-soft text-ember-400',
  };

  const markers = {
    success: '✓',
    error: '!',
    info: 'i',
  };

  return (
    <div className="fixed right-5 top-5 z-50 animate-ember-rise">
      <div
        className={`flex items-center gap-3 rounded border px-4 py-3 shadow-xl shadow-black/30 ${styles[type]}`}
      >
        <span className="font-mono text-sm font-semibold">
          {markers[type]}
        </span>

        <p className="text-sm font-medium text-paper">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="ml-2 font-mono text-ink-faint transition hover:text-paper"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}