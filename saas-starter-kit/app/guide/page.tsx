import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, CircleCheck, Database, Terminal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Notice from '@/components/Notice';

export const metadata: Metadata = { title: 'The setup guide' };
const secretCommand = `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`;
function Code({ children }: { children: string }) {
  return (
    <pre className="my-5 min-w-0 max-w-full overflow-x-auto rounded-xl bg-[#1e2520] p-5 font-mono text-[11px] leading-7 text-[#d9e1d5]">
      <code>{children}</code>
    </pre>
  );
}
export default function GuidePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container-wide py-14 sm:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">A little guidance. A lot of possibility.</p>
          <h1 className="section-heading mt-5">
            Your first spark
            <br />
            starts here<span className="text-ember">.</span>
          </h1>
          <p className="mt-6 text-sm leading-7 text-muted">
            From a folder on Windows to a connected PostgreSQL workspace. Follow these steps inside{' '}
            <code className="rounded bg-soft px-1.5 py-1 font-mono text-xs">saas-starter-kit</code>,
            the updated application.
          </p>
        </div>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-2xl border border-line p-5 lg:sticky lg:top-28">
            <p className="eyebrow text-[9px]">In this guide</p>
            <nav aria-label="Guide sections" className="mt-4 space-y-3 text-xs text-muted">
              {[
                { href: '#prerequisites', text: '01 · Open the right folder' },
                { href: '#database', text: '02 · Create your database' },
                { href: '#environment', text: '03 · Add local configuration' },
                { href: '#run', text: '04 · Apply migrations & run' },
                { href: '#billing', text: '05 · Optional Stripe billing' },
                { href: '#deployment', text: '06 · Deployment & security' },
              ].map((link) => (
                <a key={link.href} href={link.href} className="block hover:text-foreground">
                  {link.text}
                </a>
              ))}
            </nav>
            <Link
              href="/preview"
              className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold"
            >
              See the demo
              <ArrowUpRight size={13} />
            </Link>
          </aside>
          <div className="min-w-0 max-w-3xl space-y-8">
            <section id="prerequisites" className="panel p-6 sm:p-8">
              <BookOpen size={22} className="text-ember" />
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                01. Open the right folder.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Install Node.js 22.19 or newer LTS. Extract or clone the repository into a permanent
                folder. In VS Code, open the{' '}
                <strong className="text-foreground">saas-starter-kit</strong> folder—the one
                containing package.json and .env.example.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Use Terminal → New Terminal → PowerShell. Keep the old emberkit-release folder as a
                reference; it has not been migrated.
              </p>
              <Code>{'node --version\nnpm install'}</Code>
            </section>
            <section id="database" className="panel p-6 sm:p-8">
              <Database size={22} className="text-ember" />
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                02. Create a hosted PostgreSQL database.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Create a project with{' '}
                <a
                  href="https://neon.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline underline-offset-4"
                >
                  Neon
                </a>{' '}
                or another PostgreSQL provider. Use a{' '}
                <strong className="text-foreground">new, empty database</strong> for this
                fresh-start version.
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                <li>
                  <strong className="text-foreground">DATABASE_URL</strong> — your app’s connection
                  string, usually the pooled URL.
                </li>
                <li>
                  <strong className="text-foreground">DIRECT_URL</strong> — the direct/unpooled URL
                  for migrations. If your provider has no pooling, use the same URL for both.
                </li>
                <li>
                  Keep the provider’s SSL parameters. Do not paste real connection strings into chat
                  or commit them to Git.
                </li>
              </ul>
              <div className="mt-5">
                <Notice>
                  This creates new accounts and tables. It does not import Supabase data, and should
                  not be pointed at your old live database.
                </Notice>
              </div>
            </section>
            <section id="environment" className="panel p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                03. Make your local configuration.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Create .env.local only if it’s missing, then generate a random auth secret:
              </p>
              <Code>{`if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }\n${secretCommand}`}</Code>
              <p className="text-sm leading-7 text-muted">
                Open .env.local in VS Code. Add your two PostgreSQL URLs and put the generated
                secret in NEXTAUTH_SECRET. Keep these URLs for Windows development:
              </p>
              <Code>
                {
                  'NEXTAUTH_URL="http://localhost:3000"\nNEXT_PUBLIC_SITE_URL="http://localhost:3000"'
                }
              </Code>
              <p className="text-sm leading-7 text-muted">
                The old NEXT_PUBLIC_SUPABASE variables are no longer used. Stripe variables can stay
                empty. Save with Ctrl + S and restart the dev server after configuration changes.
              </p>
            </section>
            <section id="run" className="panel p-6 sm:p-8">
              <Terminal size={22} className="text-ember" />
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                04. Connect the workspace.
              </h2>
              <Code>{'npm run db:deploy\nnpm run dev'}</Code>
              <p className="text-sm leading-7 text-muted">
                The first command applies the included migration to your new database. The scripts
                load .env.local automatically. Open{' '}
                <code className="rounded bg-soft px-1.5 py-1 font-mono text-xs">
                  http://localhost:3000
                </code>{' '}
                on your Windows computer, create an account, and add your first project.
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm leading-7 text-muted">
                <CircleCheck size={16} className="mt-1 shrink-0 text-ember" />
                Accounts and projects now live in PostgreSQL. Authentication no longer depends on
                Supabase.
              </p>
              <Link href="/signup" className="btn-primary mt-6">
                Create your first account
                <ArrowRight size={15} />
              </Link>
            </section>
            <section id="billing" className="panel p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                05. Connect billing only when you need it.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                In your Stripe test account, create a recurring Price. Set STRIPE_SECRET_KEY and
                STRIPE_PRICE_ID. For local webhooks, install the Stripe CLI and run:
              </p>
              <Code>{'stripe listen --forward-to localhost:3000/api/stripe/webhook'}</Code>
              <p className="text-sm leading-7 text-muted">
                Copy its signing secret into STRIPE_WEBHOOK_SECRET. Enable Stripe’s customer portal.
                For a deployed site, register the public /api/stripe/webhook URL and the
                subscription lifecycle events listed in README.md. Until Stripe is configured,
                checkout stays disabled.
              </p>
            </section>
            <section id="deployment" className="panel p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">
                06. A few details before going public.
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted">
                <li>
                  Add all private configuration to your hosting provider’s environment settings—not
                  to GitHub.
                </li>
                <li>
                  Set NEXTAUTH_URL and NEXT_PUBLIC_SITE_URL to your real HTTPS domain and use a
                  fresh production auth secret.
                </li>
                <li>Apply migrations with npm run db:deploy before launching the updated app.</li>
                <li>
                  Email verification, password recovery, and OAuth are not included in this fresh
                  email/password implementation. Add an email delivery and recovery flow before
                  relying on those features.
                </li>
                <li>
                  Use database backups and a trusted reverse proxy. Keep dependency patches current;
                  clean expired rate-limit buckets periodically.
                </li>
              </ul>
              <p className="mt-5 text-sm leading-7 text-muted">
                For exact environment variables, checks, API routes, and troubleshooting, see the
                updated README.md inside saas-starter-kit.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
