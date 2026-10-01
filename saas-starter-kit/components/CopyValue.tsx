'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <code className="min-w-0 break-all font-mono text-[10px] leading-5 text-muted">
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="icon-button h-7 w-7"
          aria-label="Copy project ID"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
      <span aria-live="polite" className="text-[10px] text-muted">
        {failed ? 'Select the ID to copy it manually.' : copied ? 'Copied.' : ''}
      </span>
    </div>
  );
}
