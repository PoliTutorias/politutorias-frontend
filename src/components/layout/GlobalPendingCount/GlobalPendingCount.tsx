'use client';

interface GlobalPendingCountProps {
  pendingCount: number;
}

export function GlobalPendingCount({ pendingCount }: GlobalPendingCountProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-800/70 px-3 py-1 text-xs text-slate-200">
      <span className="h-2 w-2 rounded-full bg-yellow" />
      <span className="font-semibold">{pendingCount} pendientes</span>
    </div>
  );
}
