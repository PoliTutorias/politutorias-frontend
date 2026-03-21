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
    <div>
      <h3 className="text-[18px] font-bold capitalize whitespace-nowrap text-[#0f2342]">{formatDateToHeader(date)}</h3>
      {isPastDay && <p className="mt-1 text-[14px] italic text-[#9aabc2]">Dia pasado</p>}
      <p className="mt-2 text-[14px] text-[#5f7090]">
        {totalSessions} {sessionsText}
      </p>
      {totalSessions > 0 && <p className="mt-2 text-[12px] text-[#9aa8bd]">Toca para ver detalles -&gt;</p>}
    </div>
  );
}
