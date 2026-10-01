'use client';
import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={id}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-line p-6">
        <div>
          <h2 id={id} className="text-xl font-semibold tracking-tight">
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        <button
          type="button"
          className="icon-button h-8 w-8"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
