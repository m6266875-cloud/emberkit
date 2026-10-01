import Link from 'next/link';
import { ArrowLeft, FolderSearch } from 'lucide-react';
export default function WorkspaceNotFound() {
  return (
    <section className="panel px-6 py-16 text-center">
      <FolderSearch size={35} strokeWidth={1.3} className="mx-auto text-muted" />
      <p className="eyebrow mt-5">404 / Not in this workspace</p>
      <h1 className="page-heading mt-4">That idea isn’t here.</h1>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted">
        This project may have been deleted, or it belongs to a different account.
      </p>
      <Link href="/projects" className="btn-primary mt-7">
        <ArrowLeft size={15} />
        Back to your projects
      </Link>
    </section>
  );
}
