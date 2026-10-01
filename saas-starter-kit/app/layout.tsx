import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource/dm-mono/400.css';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: { default: 'Emberkit — From first spark to something real', template: '%s · Emberkit' },
  description:
    'A thoughtfully built SaaS foundation with Next.js, PostgreSQL, Prisma, email/password authentication, and optional Stripe billing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
