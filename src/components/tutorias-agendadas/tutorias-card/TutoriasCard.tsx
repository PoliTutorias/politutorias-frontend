'use client';

import Image from 'next/image';
import { FiCalendar, FiClock, FiMapPin, FiMonitor } from 'react-icons/fi';
import clsx from 'clsx';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';

interface TutoriasCardProps {
  readonly tutoria: TutoriasAgendadasDTO;
  readonly onCardClick: (tutoria: TutoriasAgendadasDTO) => void;
}

function toSessionDateTime(tutoria: TutoriasAgendadasDTO): Date {
  return new Date(`${tutoria.fecha}T${tutoria.hora}:00`);
}

function getRelativeTimeMeta(sessionDate: Date): { text: string; tone: 'green' | 'yellow' | 'slate' } {
  const diffMs = sessionDate.getTime() - Date.now();
  const diffHours = Math.max(0, Math.round(diffMs / (1000 * 60 * 60)));

  if (diffHours <= 24) {
    return { text: `En ${Math.max(1, diffHours)}h`, tone: 'green' };
  }

  const diffDays = Math.ceil(diffHours / 24);

  if (diffDays <= 6) {
    return { text: `En ${diffDays} dias`, tone: 'yellow' };
  }

  return { text: 'En 1 semana', tone: 'slate' };
}

function formatSessionDate(date: Date): string {
  return new Intl.DateTimeFormat('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getLeftStripeColor(relativeTone: 'green' | 'yellow' | 'slate'): string {
  if (relativeTone === 'green') {
    return 'bg-[#4dbb8b]';
  }

  if (relativeTone === 'yellow') {
    return 'bg-[#e7b349]';
  }

  return 'bg-[#b9c2cf]';
}

export function TutoriasCard({ tutoria, onCardClick }: TutoriasCardProps) {
  const sessionDate = toSessionDateTime(tutoria);
  const relative = getRelativeTimeMeta(sessionDate);

  return (
    <button
      type="button"
      onClick={() => onCardClick(tutoria)}
      className="group w-full rounded-2xl border border-[#e5e9f0] bg-white p-5 text-left shadow-[0_4px_14px_rgba(15,35,66,0.06)] transition-all duration-200 hover:bg-[#f7f9fc] hover:shadow-[0_18px_40px_rgba(15,35,66,0.12)]"
    >
      <div className="flex items-start gap-4">
        <div className={clsx('mt-1 h-[115px] w-[3px] rounded-full', getLeftStripeColor(relative.tone))} />

        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <Image
                src={tutoria.tutor.fotoUrl}
                alt={`Foto de ${tutoria.tutor.nombre} ${tutoria.tutor.apellido}`}
                width={52}
                height={52}
                className="h-[52px] w-[52px] rounded-full object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-xl font-bold text-primary">{tutoria.materia}</h3>
                <p className="truncate text-lg text-[#324a67]">{tutoria.tutor.nombre} {tutoria.tutor.apellido}</p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-[#e4e9f1] bg-[#f6f9fc] px-4 py-2 text-sm text-[#74839a]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar size={14} />
                  <span className="capitalize">{formatSessionDate(sessionDate)}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiClock size={14} />
                  <span>{tutoria.hora}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  {tutoria.modalidad === 'Virtual' ? <FiMonitor size={14} /> : <FiMapPin size={14} />}
                  <span>{tutoria.modalidad}</span>
                </span>
              </div>
            </div>
          </div>

          <span
            className={clsx(
              'inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold',
              relative.tone === 'green' && 'border-[#9fdfbf] bg-[#e7f8ef] text-[#2a9a66]',
              relative.tone === 'yellow' && 'border-[#ecd79a] bg-[#faf4de] text-[#c2942e]',
              relative.tone === 'slate' && 'border-[#dde3ea] bg-[#f4f7fa] text-[#7890a8]'
            )}
          >
            {relative.text}
          </span>
        </div>
      </div>
    </button>
  );
}
