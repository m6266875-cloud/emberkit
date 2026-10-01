import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="container-wide flex min-h-screen flex-col items-center justify-center py-16 text-center"
    >
      <Logo />
      <p className="eyebrow mt-12">404 / A little off the path</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Nothing here. Plenty ahead.</h1>
      <p className="mt-4 text-sm text-muted">Let’s get you back to a good starting point.</p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft size={15} />
        Back to home
      </Link>
    </main>
  );
}
