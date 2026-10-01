'use client';
import { RefreshCw } from 'lucide-react';
export default function WorkspaceError({ reset }: { reset: () => void }) {
  return (
    <section className="panel p-10 text-center">
      <h1 className="page-heading">A little bump in the road.</h1>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted">
        We couldn’t load your workspace. Check your PostgreSQL connection and try again.
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-7">
        <RefreshCw size={15} />
        Try again
      </button>
    </section>
  );
}
