import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Flame } from 'lucide-react';

export default function CTA() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-[#1e2520] px-7 py-14 text-[#f8f9f5] sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#a7b1a6]">
              Every great thing starts somewhere
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-[1.12] tracking-[-.05em] sm:text-5xl">
              Make room for your
              <br />
              <span className="text-[#f79573]">next big idea.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#a7b1a6]">
              The foundation is here. The rest is yours to build.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-accent">
                Let’s start building
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/preview"
                className="btn border border-white/20 text-[#f8f9f5] hover:bg-white/5"
              >
                Explore first
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="auth-orbit absolute -right-12 top-1/2 hidden h-64 w-64 -translate-y-1/2 items-center justify-center rounded-full opacity-80 md:flex lg:right-20"
          >
            <Flame size={105} strokeWidth={1} className="text-[#f79573]" />
          </div>
        </div>
      </div>
    </section>
  );
}
