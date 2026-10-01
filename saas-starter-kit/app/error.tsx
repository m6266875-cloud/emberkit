'use client';
import { RefreshCw } from 'lucide-react';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      className="container-wide flex min-h-[75vh] flex-col items-center justify-center py-16 text-center"
    >
      <h1 className="page-heading">Something didn’t quite connect.</h1>
      <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
        Please try again. If this keeps happening, check the server and database configuration.
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-7">
        <RefreshCw size={15} />
        Try again
      </button>
    </main>
  );
}
