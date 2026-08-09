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
      'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400',
    error:
      'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400',
    info:
      'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  };

  const icons = {
    success: '✓',
    error: '!',
    info: 'i',
  };

  return (
    <div className="fixed right-5 top-5 z-50 animate-in slide-in-from-right duration-300">
      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles[type]}`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/70 font-bold">
          {icons[type]}
        </span>

        <p className="text-sm font-medium">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-lg opacity-60 hover:opacity-100"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}