'use client';

import { ThisMonthSummary } from '@/components/agenda/ThisMonthSummary/ThisMonthSummary';
import type { MonthlySessionSummary } from '@/interfaces/agenda/AgendaInterfaces';

interface RightPanelProps {
  monthlySummary: MonthlySessionSummary;
  onSessionClick?: (sessionId: string) => void;
}

export function RightPanel({ monthlySummary, onSessionClick }: RightPanelProps) {
  return (
    <aside className="rounded-2xl border border-[#dde5ef] bg-white px-5 py-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="flex min-h-[228px] items-center justify-center rounded-xl border border-dashed border-[#d9e1ed] bg-[#fbfdff]">
        <p className="text-center text-[24px] text-[#a0aec2]">Sin sesiones este dia</p>
      </div>

      <ThisMonthSummary
        totalConfirmed={monthlySummary.totalConfirmed}
        sessions={monthlySummary.sessions}
        onSessionClick={onSessionClick}
      />
    </aside>
  );
}
