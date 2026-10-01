import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CircleCheck, Code2, Flame } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

export default function AuthFrame({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="grid min-h-screen lg:grid-cols-[.95fr_1.05fr]">
      <aside className="relative hidden flex-col overflow-hidden bg-[#1e2520] p-12 text-[#f8f9f5] lg:flex xl:p-16">
        <Logo inverse />
        <div className="relative z-10 my-auto py-16">
          <p className="font-mono text-[11px] uppercase tracking-[.17em] text-[#a7b1a6]">
            A home for your next big idea
          </p>
          <h2 className="mt-6 max-w-md text-5xl font-medium leading-[1.13] tracking-[-.05em] xl:text-6xl">
            A little spark.
            <br />A lot of <span className="text-[#f79573]">possibility.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-7 text-[#a7b1a6]">
            Your projects, your database, your next chapter. Everything you need to start building
            something that matters.
          </p>
          <div className="mt-10 space-y-4 text-sm text-[#d9e1d5]">
            {[
              'A workspace that grows with your ideas',
              'PostgreSQL data that belongs to you',
              'Thoughtfully built, from login to launch',
            ].map((text) => (
              <p key={text} className="flex items-center gap-3">
                <CircleCheck size={16} className="text-[#f79573]" />
                {text}
              </p>
            ))}
          </div>
        </div>
        <div className="auth-orbit absolute -bottom-24 -right-20 flex h-64 w-64 items-center justify-center rounded-full">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-ember/90 text-[#1e2520]">
            <Flame size={60} strokeWidth={1.5} />
          </div>
        </div>
        <p className="relative z-10 flex items-center gap-2 font-mono text-[10px] text-[#a7b1a6]">
          <Code2 size={15} />
          NEXT.JS + POSTGRESQL · MADE TO BE YOURS
        </p>
      </aside>
      <section className="flex flex-col p-6 sm:p-10 lg:p-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto my-auto w-full max-w-[390px] py-12">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          {children}
          <p className="mt-10 flex items-center justify-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Your data. Your database. Your rules.
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>© 2026 Emberkit</span>
          <Link href="/guide" className="inline-flex items-center gap-1.5 hover:text-foreground">
            Need a hand?
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>
    </main>
  );
}
