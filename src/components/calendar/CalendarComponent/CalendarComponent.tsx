'use client';

import { useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DayCell } from '@/components/calendar/DayCell/DayCell';
import type { CalendarDayData } from '@/interfaces/agenda/AgendaInterfaces';

interface CalendarComponentProps {
  currentMonthName: string;
  currentYear: number;
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

export function CalendarComponent({
  currentMonthName,
  currentYear,
  calendarDays,
  selectedDate,
  onDaySelect,
}: CalendarComponentProps) {
  const fallbackMonthDate = useMemo(() => {
    const monthValueFromSeed = calendarDays[0]?.date?.slice(5, 7);

    if (monthValueFromSeed) {
      const month = Number(monthValueFromSeed) - 1;
      return new Date(currentYear, month, 1);
    }

    return new Date(currentYear, 0, 1);
  }, [calendarDays, currentYear]);

  const [viewDate, setViewDate] = useState<Date>(fallbackMonthDate);

  const monthMap = useMemo(() => {
    return new Map(calendarDays.map((day) => [day.date, day]));
  }, [calendarDays]);

  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const startWeekDay = firstDay.getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const totalGridCells = 42;
  const today = new Date('2026-03-20T00:00:00');

  const canGoNext =
    viewDate.getFullYear() < fallbackMonthDate.getFullYear() ||
    (viewDate.getFullYear() === fallbackMonthDate.getFullYear() &&
      viewDate.getMonth() < fallbackMonthDate.getMonth() + 1);

  const monthLabel = `${currentMonthName || formatMonthLabel(viewDate)} ${
    viewDate.getFullYear() === currentYear ? currentYear : viewDate.getFullYear()
  }`;

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
      isToday: dateString === '2026-03-20',
      isSelected: selectedDate === dateString,
    };
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-[#dde5ef] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => setViewDate((previous) => addMonths(previous, -1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#54657c] transition-colors hover:bg-[#eef3fa]"
          aria-label="Mes anterior"
        >
          <FiChevronLeft size={22} />
        </button>

        <h2 className="text-[36px] font-bold capitalize text-[#1f2f49]">{monthLabel}</h2>

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
          <div key={day} className="border-r border-[#edf1f7] px-2 py-2 text-center text-[18px] font-bold text-[#7d8ca1] last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((cell) => (
          <DayCell
            key={cell.key}
            dayNumber={'dayNumber' in cell ? cell.dayNumber : undefined}
            date={'date' in cell ? cell.date : undefined}
            isCurrentMonth={cell.isCurrentMonth}
            isToday={'isToday' in cell ? cell.isToday : false}
            isPastDay={'isPastDay' in cell ? cell.isPastDay : false}
            isSelected={'isSelected' in cell ? cell.isSelected : false}
            sessionCount={'sessionCount' in cell ? cell.sessionCount : 0}
            sessionLabels={'sessionLabels' in cell ? cell.sessionLabels : []}
            onDaySelect={onDaySelect}
          />
        ))}
      </div>
    </section>
  );
}
