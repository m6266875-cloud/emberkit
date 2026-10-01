import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              A little less boilerplate.
              <br />A lot more possibility.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-x-8 gap-y-3 text-sm text-muted">
            <Link href="/guide" className="hover:text-foreground">
              Documentation
            </Link>
            <Link href="/#faq" className="hover:text-foreground">
              FAQs
            </Link>
            <a
              href="https://github.com/m6266875-cloud/emberkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 font-mono text-[10px] text-muted sm:flex-row">
          <span>© 2026 Emberkit. Built to be made yours.</span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            FROM FIRST SPARK TO SOMETHING REAL
          </span>
        </div>
      </div>
    </footer>
  );
}
