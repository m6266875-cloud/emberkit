import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function Logo({
  href = '/',
  inverse = false,
}: {
  href?: string;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Emberkit home"
      className={`inline-flex shrink-0 items-center gap-2.5 text-[22px] font-bold tracking-[-0.06em] ${inverse ? 'text-[#f8f9f5]' : 'text-foreground'}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-ember text-[#1e2520]">
        <Flame size={22} strokeWidth={2} />
      </span>
      emberkit<span className="ml-[-5px] text-ember">.</span>
    </Link>
  );
}
