import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CircleCheck } from 'lucide-react';
import ProductPreview from '@/components/ProductPreview';

export default function Hero() {
  return (
    <section className="overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-[1.04fr_1fr] lg:gap-8">
        <div className="animate-enter relative z-10">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-2 font-mono text-[9px] tracking-[.08em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />A FRESH START. NOW WITH
            POSTGRESQL.
            <ArrowUpRight size={12} />
          </div>
          <h1 className="mt-7 max-w-[620px] text-[clamp(3rem,6.4vw,5.25rem)] font-medium leading-[1.04] tracking-[-.065em]">
            From first spark
            <br />
            to{' '}
            <span className="text-ember">
              something
              <br className="hidden lg:block" /> real.
            </span>
          </h1>
          <p className="mt-7 max-w-[430px] text-[16px] leading-7 text-muted">
            Good ideas shouldn’t get lost in setup. Meet the thoughtfully built SaaS foundation that
            gets you to the good part, faster.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="btn-primary px-6">
              Start building
              <ArrowRight size={17} />
            </Link>
            <Link href="/preview" className="btn-secondary px-5">
              Explore the workspace
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CircleCheck size={13} />
              Your code, your database
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CircleCheck size={13} />
              No Supabase dependency
            </span>
          </div>
        </div>
        <div
          className="animate-enter relative mx-auto w-full max-w-[540px] py-10 lg:py-16"
          style={{ animationDelay: '100ms' }}
        >
          <div className="hero-orbit" aria-hidden="true" />
          <div className="relative rotate-[-2deg] transition duration-500 hover:rotate-0">
            <ProductPreview />
          </div>
          <div className="absolute -bottom-1 right-3 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 shadow-soft sm:bottom-3 sm:right-[-10px]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <CircleCheck size={19} />
            </span>
            <div>
              <p className="text-xs font-semibold">Less boilerplate. More building.</p>
              <p className="mt-0.5 font-mono text-[9px] text-muted">THAT’S THE WHOLE IDEA.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
