'use client';

import { useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DayCell } from '@/components/calendar/DayCell/DayCell';
import type { CalendarDayData } from '@/interfaces/agenda/AgendaInterfaces';

interface CalendarComponentProps {
  calendarDays: CalendarDayData[];
  selectedDate?: string;
  onDaySelect?: (date: string) => void;
}

const WEEK_DAYS = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', { month: 'long' }).format(date);
}

function toIsoDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function CalendarComponent({
  calendarDays,
  selectedDate,
  onDaySelect,
}: CalendarComponentProps) {
  const fallbackMonthDate = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, []);

  const [viewDate, setViewDate] = useState<Date>(fallbackMonthDate);
  const maxNextMonth = addMonths(fallbackMonthDate, 1);

  const monthMap = useMemo(() => {
    return new Map(calendarDays.map((day) => [day.date, day]));
  }, [calendarDays]);

  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startWeekDay = firstDay.getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const totalGridCells = 42;
  const today = new Date();
  const todayDateString = toIsoDateString(today);

  const canGoNext =
    viewDate.getFullYear() < maxNextMonth.getFullYear() ||
    (viewDate.getFullYear() === maxNextMonth.getFullYear() && viewDate.getMonth() < maxNextMonth.getMonth());

  const monthLabel = `${formatMonthLabel(viewDate)} ${viewDate.getFullYear()}`;

  const cells = Array.from({ length: totalGridCells }, (_, index) => {
    const dayNumber = index - startWeekDay + 1;

    if (dayNumber < 1 || dayNumber > daysInMonth) {
      return {
        key: `empty-${index}`,
        isCurrentMonth: false,
      };
    }

    const dateString = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    const dayData = monthMap.get(dateString);

    const dayDate = new Date(dateString + 'T00:00:00');
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isPastDay = dayDate < normalizedToday;

    return {
      key: dateString,
      isCurrentMonth: true,
      dayNumber,
      date: dateString,
      sessionCount: dayData?.sessionCount ?? 0,
      sessionLabels: dayData?.sessionLabels ?? [],
      isPastDay,
      isToday: dateString === todayDateString,
      isSelected: selectedDate === dateString,
    };
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-[#dde5ef] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => setViewDate((previous) => addMonths(previous, -1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#54657c] transition-colors hover:bg-[#eef3fa]"
          aria-label="Mes anterior"
        >
          <FiChevronLeft size={22} />
        </button>

        <h2 className="text-[22px] font-bold capitalize text-[#1f2f49]">{monthLabel}</h2>

        <button
          type="button"
          onClick={() => setViewDate((previous) => addMonths(previous, 1))}
          disabled={!canGoNext}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#54657c] transition-colors hover:bg-[#eef3fa] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Mes siguiente"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      <div className="grid grid-cols-7 border-t border-[#edf1f7] bg-[#f5f8fc]">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="border-r border-[#edf1f7] px-2 py-2 text-center text-[13px] font-bold text-[#7d8ca1] last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((cell) => {
          if (!cell.isCurrentMonth) {
            return (
              <DayCell
                key={cell.key}
                isCurrentMonth={false}
                isToday={false}
                isPastDay={false}
                sessionCount={0}
              />
            );
          }

          return (
            <DayCell
              key={cell.key}
              dayNumber={cell.dayNumber}
              date={cell.date}
              isCurrentMonth
              isToday={cell.isToday ?? false}
              isPastDay={cell.isPastDay ?? false}
              isSelected={cell.isSelected}
              sessionCount={cell.sessionCount ?? 0}
              sessionLabels={cell.sessionLabels ?? []}
              onDaySelect={onDaySelect}
            />
          );
        })}
      </div>
    </section>
  );
}
