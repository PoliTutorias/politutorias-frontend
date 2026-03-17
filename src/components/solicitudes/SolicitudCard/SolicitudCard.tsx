'use client';

import clsx from 'clsx';
import { FiCalendar, FiCheckCircle, FiClock, FiMonitor, FiUser, FiXCircle } from 'react-icons/fi';
import { SolicitudListItemDto, SolicitudStatus } from '@/dtos/solicitudes.dto';

interface SolicitudCardProps {
  readonly solicitud: SolicitudListItemDto;
  readonly onClick: (id: string) => void;
}

function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  const day = new Intl.DateTimeFormat('es-EC', { day: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('es-EC', { month: 'short' }).format(date);
  const year = new Intl.DateTimeFormat('es-EC', { year: 'numeric' }).format(date);
  const time = new Intl.DateTimeFormat('es-EC', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);

  return `${day} ${month} ${year} · ${time}`;
}

function getStatusConfig(status: SolicitudStatus) {
  if (status === SolicitudStatus.PENDIENTE) {
    return {
      label: 'Pendiente',
      Icon: FiClock,
      className: 'border-orange-200 bg-orange-50 text-orange-600',
    };
  }

  if (status === SolicitudStatus.ACEPTADA) {
    return {
      label: 'Aceptada',
      Icon: FiCheckCircle,
      className: 'border-slate-300 bg-slate-100 text-slate-700',
    };
  }

  if (status === SolicitudStatus.RECHAZADA) {
    return {
      label: 'Rechazada',
      Icon: FiXCircle,
      className: 'border-slate-300 bg-slate-100 text-slate-600',
    };
  }

  return {
    label: 'Expirada',
    Icon: FiClock,
    className: 'border-red-200 bg-red-50 text-red-500',
  };
}

export function SolicitudCard({ solicitud, onClick }: SolicitudCardProps) {
  const status = getStatusConfig(solicitud.status);

  return (
    <button
      type="button"
      onClick={() => onClick(solicitud.id)}
      className={clsx(
        'relative w-full cursor-pointer rounded-none border-b border-slate-200 px-6 py-6 text-left transition-colors hover:bg-slate-50',
        solicitud.status === SolicitudStatus.EXPIRADA && 'bg-slate-50/50'
      )}
    >
      <span
        className={clsx(
          'absolute bottom-5 left-6 top-5 w-[3px] rounded-sm bg-primary',
          solicitud.status === SolicitudStatus.EXPIRADA && 'bg-red-400'
        )}
      />

      <div className="ml-4 flex items-start justify-between gap-4">
        <div className="flex flex-1 items-start gap-4">
          <img
            src={solicitud.avatarUrl || 'https://i.pravatar.cc/96'}
            alt={`Avatar de ${solicitud.tutorName}`}
            className="h-14 w-14 rounded-full object-cover"
          />

          <div className="flex-1">
            <h3 className="text-3xl font-bold leading-none text-primary md:text-[1.65rem]">{solicitud.subject}</h3>
            <p className="mt-2 text-2xl leading-none text-slate-600 md:text-base">{solicitud.tutorName}</p>

            <div className="mt-4 rounded-lg bg-[#edf2f7] px-4 py-3 text-xl text-slate-500 md:text-sm">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar className="text-slate-400" />
                  {formatDateTime(solicitud.dateTime)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  {solicitud.modality === 'Virtual' ? <FiMonitor className="text-slate-400" /> : <FiUser className="text-slate-400" />}
                  {solicitud.modality}
                </span>
                <span className="text-2xl font-bold text-primary md:text-[1.1rem]">${solicitud.price}/h</span>
              </div>
            </div>
          </div>
        </div>

        <span className={clsx('inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold', status.className)}>
          <status.Icon className="text-base" />
          {status.label}
        </span>
      </div>
    </button>
  );
}
