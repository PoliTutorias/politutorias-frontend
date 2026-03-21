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
  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return new Date(`${dateString}T00:00:00`) < normalizedToday;
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
  const hasSessions = activeDaySessions.length > 0;

  return (
    <aside className="rounded-2xl border border-[#dde5ef] bg-white px-5 py-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <section className="px-0 py-0">
        <SelectedDayHeader date={selectedDate} totalSessions={activeDaySessions.length} isPastDay={isPastDay} />

        <div className="mt-4 space-y-3">
          {isLoadingDayInfo && <p className="text-[12px] text-[#8ea0b8]">Cargando sesiones del dia...</p>}

          {!isLoadingDayInfo && !hasSessions && (
            <div className="flex min-h-28 items-center justify-center">
              <p className="text-center text-[14px] text-[#9aa8bd]">Sin sesiones este dia</p>
            </div>
          )}

          {!isLoadingDayInfo &&
            hasSessions &&
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
      </section>

      <div className="mt-5 border-t border-[#e6ebf2] pt-1">
        <ThisMonthSummary
          totalConfirmed={monthlySummary.totalConfirmed}
          sessions={monthlySummary.sessions}
          onSessionClick={onSessionClick}
        />
      </div>
    </aside>
  );
}
