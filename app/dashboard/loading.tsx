export default function DashboardLoading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
      <div className="h-40 animate-pulse rounded-xl border bg-muted/40" />
      <div className="h-40 animate-pulse rounded-xl border bg-muted/40" />
    </div>
  );
}
