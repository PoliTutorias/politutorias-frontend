import clsx from 'clsx';

interface SelectedDayHeaderProps {
  date: string;
  totalSessions: number;
  isPastDay: boolean;
}

function formatDateToHeader(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
  }).format(date);
}

export function SelectedDayHeader({ date, totalSessions, isPastDay }: SelectedDayHeaderProps) {
  const sessionsText = totalSessions === 1 ? 'sesion confirmada' : 'sesiones confirmadas';

  return (
    <div
      className={clsx(
        'rounded-2xl border p-5',
        isPastDay ? 'border-[#d7deeb] bg-[#f2f5fa]' : 'border-[#f5c46f] bg-[#fff8ec]'
      )}
    >
      <h3 className="text-[20px] font-bold capitalize text-[#0f2342]">{formatDateToHeader(date)}</h3>
      {isPastDay && <p className="mt-1 text-[16px] italic text-[#9aabc2]">Dia pasado</p>}
      <p className="mt-2 text-[18px] text-[#5f7090]">
        {totalSessions} {sessionsText}
      </p>
      <p className="mt-2 text-[16px] text-[#9aa8bd]">Toca para ver detalles -&gt;</p>
    </div>
  );
}
