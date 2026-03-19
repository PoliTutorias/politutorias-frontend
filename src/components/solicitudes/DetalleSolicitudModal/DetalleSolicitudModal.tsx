'use client';

import { useEffect, useState } from 'react';
import { FiBookOpen, FiCalendar, FiClock, FiMapPin, FiMessageSquare, FiX } from 'react-icons/fi';
import { SolicitudDetailDto, SolicitudStatus } from '@/dtos/solicitudes.dto';
import { getSolicitudDetailAction } from '@/actions/solicitudes/getSolicitudDetailAction';

interface DetalleSolicitudModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly solicitudId: string | null;
}

export function DetalleSolicitudModal({
  isOpen,
  onClose,
  solicitudId,
}: DetalleSolicitudModalProps) {
  const [solicitudDetail, setSolicitudDetail] = useState<SolicitudDetailDto | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !solicitudId) {
      setSolicitudDetail(null);
      setDetailError(null);
      return;
    }

    let isMounted = true;

    const loadDetail = async () => {
      setIsLoadingDetail(true);
      setDetailError(null);

      try {
        const detail = await getSolicitudDetailAction(solicitudId);

        if (!isMounted) {
          return;
        }

        if (!detail) {
          setSolicitudDetail(null);
          setDetailError('No se encontró el detalle de la solicitud.');
          return;
        }

        setSolicitudDetail(detail);
      } catch {
        if (isMounted) {
          setSolicitudDetail(null);
          setDetailError('No se pudo cargar el detalle de la solicitud.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingDetail(false);
        }
      }
    };

    void loadDetail();

    return () => {
      isMounted = false;
    };
  }, [isOpen, solicitudId]);

  if (!isOpen) {
    return null;
  }

  let bodyContent: React.ReactNode;

  if (isLoadingDetail) {
    bodyContent = (
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-center text-slate-500">
        Cargando detalle de solicitud...
      </div>
    );
  } else if (detailError) {
    bodyContent = (
      <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-5 text-center text-red-600">
        {detailError}
      </div>
    );
  } else if (solicitudDetail) {
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
    const isExpired = solicitudDetail.status === SolicitudStatus.EXPIRADA;
    const showBaseInfo = isPending || isExpired;

    bodyContent = (
      <>
        <section className="mt-4 rounded-xl border border-slate-200 bg-[#edf2f7] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={solicitudDetail.avatarUrl || 'https://i.pravatar.cc/96'}
                alt={`Avatar de ${solicitudDetail.tutorName}`}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-bold leading-none text-primary">{solicitudDetail.tutorName}</p>
                <p className="mt-1 text-xs leading-none text-slate-500">Tutor</p>
              </div>
            </div>

            {isPending && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                <FiClock />
                Pendiente
              </span>
            )}

            {isExpired && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
                <FiClock />
                Expirada
              </span>
            )}
          </div>
        </section>

        <section className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <FiBookOpen className="text-yellow" />
            <h3 className="text-base font-bold leading-none text-primary">{solicitudDetail.subject}</h3>
          </div>

          {showBaseInfo && (
            <>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-500">
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
                <span className="text-sm font-bold text-primary">${solicitudDetail.price}/h</span>
              </div>

              {isPending && (
                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Horarios Propuestos</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {solicitudDetail.proposedSchedules.map((schedule, index) => (
                      <li key={`${schedule.date}-${schedule.time}-${index}`} className="flex items-center gap-2">
                        <FiCalendar className="text-slate-400" />
                        <span>{schedule.date} · {schedule.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>

        <section className="mt-3 rounded-xl border border-orange-200 bg-[#f9fbff] p-4 border-l-4 border-l-yellow">
          <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wide text-primary">
            <FiMessageSquare />
            <span>Tu mensaje</span>
          </div>
          <p className="mt-2 text-sm italic text-slate-600">“{solicitudDetail.studentMessage}”</p>
        </section>

        <footer className="-mx-4 mt-5 flex justify-end gap-6 border-t border-slate-200 px-4 pt-4 pr-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-base font-semibold text-slate-700 transition-colors hover:text-primary"
          >
            Cerrar
          </button>
        </footer>
      </>
    );
  } else {
    bodyContent = (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-slate-500">
        No hay datos para mostrar.
      </div>
    );
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-black/40 px-3"
      aria-label="Detalle de la Solicitud"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary">Detalle de la Solicitud</h2>
          <button type="button" onClick={onClose} className="text-xl text-slate-600 transition-colors hover:text-primary">
            <FiX />
          </button>
        </header>
        {bodyContent}
      </div>
    </dialog>
  );
}