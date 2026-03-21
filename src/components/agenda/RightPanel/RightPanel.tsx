'use client';

import { SelectedDayHeader } from '@/components/agenda/SelectedDayHeader/SelectedDayHeader';
import { ThisMonthSummary } from '@/components/agenda/ThisMonthSummary/ThisMonthSummary';
import { SessionCard } from '@/components/session/SessionCard/SessionCard';
import type { MonthlySessionSummary, SelectedDayInfo } from '@/interfaces/agenda/AgendaInterfaces';

interface RightPanelProps {
  monthlySummary: MonthlySessionSummary;
  selectedDayInfo?: SelectedDayInfo | null;
  selectedDate: string;
  isLoadingDayInfo?: boolean;
  onSessionClick?: (sessionId: string) => void;
}

function isPastDate(dateString: string): boolean {
  return new Date(`${dateString}T00:00:00`) < new Date('2026-03-20T00:00:00');
}

export function RightPanel({
  monthlySummary,
  selectedDayInfo,
  selectedDate,
  isLoadingDayInfo = false,
  onSessionClick,
}: RightPanelProps) {
  const activeDaySessions = selectedDayInfo?.sessions ?? [];
  const isPastDay = isPastDate(selectedDate);

  return (
    <aside className="rounded-2xl border border-[#dde5ef] bg-white px-5 py-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <SelectedDayHeader date={selectedDate} totalSessions={activeDaySessions.length} isPastDay={isPastDay} />

      <div className="mt-4 space-y-3">
        {isLoadingDayInfo && <p className="text-[14px] text-[#8ea0b8]">Cargando sesiones del dia...</p>}

        {!isLoadingDayInfo && activeDaySessions.length === 0 && (
          <p className="rounded-xl bg-[#f5f8fc] px-3 py-6 text-center text-[16px] text-[#a0aec2]">Sin sesiones este dia</p>
        )}

        {!isLoadingDayInfo &&
          activeDaySessions.map((session) => (
            <SessionCard
              key={session.id}
              id={session.id}
              time={session.time}
              courseName={session.courseName}
              studentName={session.studentName}
              isPast={isPastDay}
              isHighlighted={!isPastDay}
              compact
              onSessionClick={onSessionClick}
            />
          ))}
      </div>

      <ThisMonthSummary
        totalConfirmed={monthlySummary.totalConfirmed}
        sessions={monthlySummary.sessions}
        onSessionClick={onSessionClick}
      />
    </aside>
  );
}
