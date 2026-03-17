'use client';

import { FiCalendar, FiClock, FiMapPin, FiMessageSquare, FiTrash2, FiX, FiXCircle } from 'react-icons/fi';
import { SolicitudDetailDto, SolicitudStatus } from '@/dtos/solicitudes.dto';

interface DetalleSolicitudModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly solicitudDetail: SolicitudDetailDto | null;
}

export function DetalleSolicitudModal({
  isOpen,
  onClose,
  solicitudDetail,
}: DetalleSolicitudModalProps) {
  if (!isOpen || !solicitudDetail) {
    return null;
  }

  const dateLabel = new Intl.DateTimeFormat('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(solicitudDetail.dateTime));

  const timeLabel = new Intl.DateTimeFormat('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(solicitudDetail.dateTime));

  const isPending = solicitudDetail.status === SolicitudStatus.PENDIENTE;
  const isAccepted = solicitudDetail.status === SolicitudStatus.ACEPTADA;
  const isRejected = solicitudDetail.status === SolicitudStatus.RECHAZADA;
  const isPendingOrAccepted = isPending || isAccepted;

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-black/40 px-4"
      aria-label="Detalle de la Solicitud"
    >
      <div className="w-full max-w-2xl rounded-3xl bg-white p-7 shadow-xl">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary md:text-[1.95rem]">Detalle de la Solicitud</h2>
          <button type="button" onClick={onClose} className="text-3xl text-slate-600 transition-colors hover:text-primary">
            <FiX />
          </button>
        </header>

        <section className="mt-6 rounded-xl border border-slate-200 bg-[#edf2f7] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={solicitudDetail.avatarUrl || 'https://i.pravatar.cc/96'}
                alt={`Avatar de ${solicitudDetail.tutorName}`}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="text-[2rem] font-bold leading-none text-primary md:text-[1.65rem]">{solicitudDetail.tutorName}</p>
                <p className="mt-1 text-[1.6rem] leading-none text-slate-500 md:text-base">Tutor</p>
              </div>
            </div>

            {isPending && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-600">
                <FiClock />
                Pendiente
              </span>
            )}

            {isAccepted && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
                <FiClock />
                Aceptada
              </span>
            )}

            {isRejected && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-600">
                <FiXCircle />
                Rechazada
              </span>
            )}
          </div>
        </section>

        {isAccepted && (
          <section className="mt-4 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              {solicitudDetail.modality === 'Presencial' ? 'Lugar' : 'Enlace'}
            </p>
            <p className="mt-2 text-base text-slate-600">
              {solicitudDetail.modality === 'Presencial'
                ? solicitudDetail.acceptedMeetingLocation || 'Lugar pendiente de confirmación'
                : solicitudDetail.acceptedMeetingLink || 'Enlace pendiente de confirmación'}
            </p>
          </section>
        )}

        <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-[1.95rem] font-bold leading-none text-primary md:text-[1.65rem]">{solicitudDetail.subject}</h3>

          {isPendingOrAccepted && (
            <>
              <div className="mt-4 grid grid-cols-2 gap-4 text-[1.35rem] text-slate-500 md:text-base">
                <span className="inline-flex items-center gap-2">
                  <FiCalendar />
                  {dateLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FiClock />
                  {timeLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FiMapPin />
                  {solicitudDetail.modality}
                </span>
                <span className="font-bold text-primary">${solicitudDetail.price}/h</span>
              </div>

              {isPending && (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Horarios Propuestos</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {solicitudDetail.proposedSchedules.map((schedule, index) => (
                      <li key={`${schedule.date}-${schedule.time}-${index}`}>
                        {schedule.date} · {schedule.time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>

        <section className="mt-4 rounded-xl border border-orange-300 bg-white p-4">
          <div className="flex items-center gap-2 text-[1.25rem] font-bold uppercase tracking-wide text-primary md:text-sm">
            <FiMessageSquare />
            <span>Tu mensaje</span>
          </div>
          <p className="mt-3 text-[1.45rem] italic text-slate-600 md:text-base">“{solicitudDetail.studentMessage}”</p>
        </section>

        {isRejected && (
          <section className="mt-4 rounded-xl border border-slate-200 bg-[#f1f5f9] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Motivo de Rechazo</p>
            <p className="mt-2 text-base text-slate-600">{solicitudDetail.rejectionReason || 'Sin motivo registrado.'}</p>
          </section>
        )}

        <footer className="mt-8 flex justify-end gap-6">
          {isPending && (
            <button
              type="button"
              disabled
              className="cursor-not-allowed text-[1.7rem] font-semibold text-slate-400 md:text-xl"
            >
              Cancelar Solicitud
            </button>
          )}

          {isAccepted && (
            <button
              type="button"
              className="inline-flex items-center gap-2 text-[1.7rem] font-semibold text-red-500 transition-colors hover:text-red-600 md:text-xl"
            >
              <FiTrash2 />
              Cancelar Tutoría
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="text-[1.7rem] font-semibold text-slate-600 transition-colors hover:text-primary md:text-xl"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </dialog>
  );
}
