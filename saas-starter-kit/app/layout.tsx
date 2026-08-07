import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Emberkit — Ship your SaaS this weekend',
  description: 'A production-ready Next.js + Supabase + Stripe starter kit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className="antialiased text-gray-900 bg-white">
      <ThemeProvider>
      {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
