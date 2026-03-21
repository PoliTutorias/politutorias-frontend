'use client';

import type { CalendarSessionLabel } from '@/interfaces/agenda/AgendaInterfaces';
import clsx from 'clsx';

interface DayCellProps {
  dayNumber?: number;
  date?: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPastDay: boolean;
  isSelected?: boolean;
  sessionCount: number;
  sessionLabels?: CalendarSessionLabel[];
  onDaySelect?: (date: string) => void;
}

export function DayCell({
  dayNumber,
  date,
  isCurrentMonth,
  isToday,
  isPastDay,
  isSelected = false,
  sessionCount,
  sessionLabels = [],
  onDaySelect,
}: DayCellProps) {
  if (!isCurrentMonth || !dayNumber || !date) {
    return <div className="min-h-[92px] border-r border-b border-[#edf1f7] bg-white" />;
  }

  const handleClick = () => {
    onDaySelect?.(date);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'min-h-[92px] w-full border-r border-b border-[#edf1f7] p-2 text-left transition-colors',
        isPastDay ? 'bg-[#f6f8fb]' : 'bg-white hover:bg-[#f8fbff]'
      )}
    >
      <div className="mb-1 flex items-center justify-between">
        <span
          className={clsx(
            'inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-sm font-semibold',
            isToday
              ? 'bg-[#14284b] text-white'
              : isSelected
                ? 'bg-[#e6ebf3] text-[#21324b]'
                : isPastDay
                  ? 'text-[#aeb8c8]'
                  : 'text-[#5f6f87]'
          )}
        >
          {dayNumber}
        </span>
      </div>

      {sessionCount > 0 && (
        <div className="space-y-1">
          {sessionLabels.slice(0, 2).map((label, index) => (
            <p
              key={`${date}-${label.time}-${index}`}
              className={clsx(
                'truncate rounded-sm px-1 py-0.5 text-[11px] font-semibold',
                isPastDay ? 'bg-[#e9eef5] text-[#99a7bd]' : 'bg-[#eef3fb] text-[#8ea0bb]'
              )}
            >
              {label.time} {label.subject}
            </p>
          ))}
          {sessionCount > 2 && (
            <p className="text-[11px] text-[#9cabbe]">+{sessionCount - 2} mas</p>
          )}
        </div>
      )}
    </button>
  );
}
