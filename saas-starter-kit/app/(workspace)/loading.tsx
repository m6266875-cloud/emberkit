export default function WorkspaceLoading() {
  return (
    <div role="status" aria-label="Loading workspace" className="animate-pulse">
      <div className="mb-8 h-10 w-2/3 rounded-xl bg-soft" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-40 rounded-2xl border border-line bg-surface" />
        ))}
      </div>
      <div className="mt-6 h-64 rounded-2xl border border-line bg-surface" />
      <span className="sr-only">Loading your workspace…</span>
    </div>
  );
}
