'use client';
import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Check, Laptop, Moon, Sun } from 'lucide-react';

const subscribe = () => () => {};
export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { value: 'light', label: 'Light', Icon: Sun },
        { value: 'dark', label: 'Dark', Icon: Moon },
        { value: 'system', label: 'System', Icon: Laptop },
      ].map(({ value, label, Icon }) => (
        <button
          type="button"
          key={value}
          disabled={!mounted}
          onClick={() => setTheme(value)}
          aria-pressed={mounted && theme === value}
          className={`rounded-xl border p-3 text-left transition ${mounted && theme === value ? 'border-ember bg-ember/5 ring-1 ring-ember/30' : 'border-line hover:border-muted/40'}`}
        >
          <span
            className={`flex h-16 overflow-hidden rounded-lg border p-2 ${value === 'dark' ? 'border-[#3b443c] bg-[#1e2520]' : value === 'system' ? 'border-[#c9d0c4] bg-gradient-to-r from-[#eef2e8] to-[#343d35]' : 'border-[#dee5d6] bg-[#f8f9f5]'}`}
          >
            <span
              className={`w-1/4 rounded-sm ${value === 'dark' ? 'bg-[#39433a]' : 'bg-[#dce5d0]'}`}
            />
            <span className="ml-2 flex flex-1 flex-col gap-1.5 pt-1">
              <span className="h-1 w-3/4 rounded-full bg-[#b3bdaa]/60" />
              <span className="h-1 w-1/2 rounded-full bg-[#b3bdaa]/40" />
              <span className="mt-1 h-5 rounded bg-[#f06642]/20" />
            </span>
          </span>
          <span className="mt-3 flex items-center gap-1.5 text-[11px] font-medium">
            <Icon size={13} />
            {label}
            {mounted && theme === value && <Check size={12} className="ml-auto text-ember" />}
          </span>
        </button>
      ))}
    </div>
  );
}
