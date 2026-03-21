'use client';

import { useMemo, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SessionCard } from '@/components/session/SessionCard/SessionCard';
import type { SessionSummary } from '@/interfaces/agenda/AgendaInterfaces';

interface ThisMonthSummaryProps {
  totalConfirmed: number;
  sessions: SessionSummary[];
  onSessionClick?: (sessionId: string) => void;
}

function formatDateLabel(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);
  const weekday = new Intl.DateTimeFormat('es-CO', { weekday: 'short' }).format(date);

  return `${weekday} ${date.getDate()}`;
}

function isPastDate(dateString: string): boolean {
  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return new Date(`${dateString}T00:00:00`) < normalizedToday;
}

export function ThisMonthSummary({ totalConfirmed, sessions, onSessionClick }: ThisMonthSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sessionsByDay = useMemo(() => {
    const grouped = new Map<string, SessionSummary[]>();

    [...sessions]
      .sort((a, b) => {
        const left = `${a.date}T${a.time}:00`;
        const right = `${b.date}T${b.time}:00`;
        return left.localeCompare(right);
      })
      .forEach((session) => {
        const bucket = grouped.get(session.date) ?? [];
        bucket.push(session);
        grouped.set(session.date, bucket);
      });

    return grouped;
  }, [sessions]);

  return (
    <section className="mt-6 border-t border-[#e6ebf2] pt-6">
      <h3 className="text-[14px] font-extrabold tracking-wide text-[#5f7191]">ESTE MES</h3>

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="mt-4 flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-medium text-[#223251]">Sesiones confirmadas</p>
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#11264a] px-2 text-[11px] font-bold text-white">
            {totalConfirmed}
          </span>
        </div>
        {isExpanded ? <FiChevronUp size={16} className="text-[#71839f]" /> : <FiChevronDown size={16} className="text-[#71839f]" />}
      </button>

      {!isExpanded && <p className="mt-3 text-[10px] text-[#9cabbf]">Toca para ver todas -&gt;</p>}

      {isExpanded && (
        <div className="mt-5 max-h-90 space-y-4 overflow-y-auto pr-2">
          {Array.from(sessionsByDay.entries()).map(([date, daySessions]) => (
            <div key={date}>
              <div className="mb-2 flex items-center gap-3">
                <h4 className="whitespace-nowrap text-[11px] font-bold capitalize text-[#273a5b]">{formatDateLabel(date)}</h4>
                <div className="h-px w-full bg-[#dfe6f0]" />
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    isPastDate(date) ? 'bg-[#e5eaf1] text-[#8ea0b8]' : 'bg-[#f9d99a] text-[#a36500]'
                  }`}
                >
                  {daySessions.length}
                </span>
              </div>

              <div className="space-y-3">
                {daySessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    id={session.id}
                    time={session.time}
                    courseName={session.courseName}
                    studentName={session.studentName}
                    isPast={isPastDate(date)}
                    isHighlighted={!isPastDate(date)}
                    compact
                    onSessionClick={onSessionClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
