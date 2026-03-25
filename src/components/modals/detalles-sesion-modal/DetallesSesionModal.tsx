'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { FiBookOpen, FiCalendar, FiClock, FiLink2, FiMapPin, FiMessageSquare, FiX } from 'react-icons/fi';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';
import { getScheduledTutoriaDetailAction } from '@/actions/tutorias-agendadas/getScheduledTutoriaDetailAction';

interface DetallesSesionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly tutoria: TutoriasAgendadasDTO | null;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('es-EC', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

export function DetallesSesionModal({ isOpen, onClose, tutoria }: DetallesSesionModalProps) {
  const [detail, setDetail] = useState<TutoriasAgendadasDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !tutoria?.id) {
      setDetail(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadDetail = async () => {
      setIsLoading(true);

      try {
        const result = await getScheduledTutoriaDetailAction(tutoria.id);

        if (!isMounted) {
          return;
        }

        if (result.data) {
          setDetail(result.data);
          return;
        }

        setDetail(tutoria);
      } catch {
        if (isMounted) {
          setDetail(tutoria);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();

    return () => {
      isMounted = false;
    };
  }, [isOpen, tutoria]);

  const sessionData = useMemo(() => detail ?? tutoria, [detail, tutoria]);

  if (!isOpen || !tutoria) {
    return null;
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-[rgba(15,23,42,0.34)] px-4"
      aria-label="Detalles de la sesion"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_20px_80px_rgba(15,23,42,0.35)]">
        <header className="flex items-center justify-between border-b border-[#eef2f7] px-5 py-4">
          <h2 className="text-2xl font-bold text-primary">Detalles de la Sesión</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="rounded-md p-1 text-[#30445f] transition-colors hover:bg-[#eef3f8]"
          >
            <FiX size={20} />
          </button>
        </header>

        <div className="space-y-3 px-5 py-4">
          {isLoading && (
            <div className="rounded-xl border border-[#e6ecf3] bg-[#f8fbff] px-4 py-3 text-sm text-[#5f6f83]">
              Cargando detalles de la sesion...
            </div>
          )}

          <section className="rounded-xl bg-[#edf2f7] px-4 py-3">
            <div className="flex items-center gap-3">
              <Image
                src={sessionData?.tutor.fotoUrl ?? 'https://randomuser.me/api/portraits/lego/2.jpg'}
                alt={`Foto de ${sessionData?.tutor.nombre ?? 'Tutor'} ${sessionData?.tutor.apellido ?? ''}`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-bold text-primary">{sessionData?.tutor.nombre} {sessionData?.tutor.apellido}</p>
                <p className="text-sm text-[#7890a8]">Tutor</p>
              </div>
            </div>
          </section>

          {sessionData?.modalidad === 'Virtual' ? (
            <section className="rounded-xl border border-[#e6ecf3] bg-white p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                <FiLink2 size={13} />
                <span>ENLACE</span>
              </div>
              {sessionData.enlaceReunion ? (
                <a
                  href={sessionData.enlaceReunion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block break-all text-sm text-[#2f6cc9] underline decoration-transparent transition-colors hover:decoration-[#2f6cc9]"
                >
                  {sessionData.enlaceReunion}
                </a>
              ) : (
                <p className="mt-2 text-sm text-[#6f8199]">No hay enlace disponible para esta sesion.</p>
              )}
            </section>
          ) : (
            <section className="rounded-xl border border-[#e6ecf3] bg-white p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                <FiMapPin size={13} />
                <span>LUGAR</span>
              </div>
              <p className="mt-2 text-sm text-[#314a67]">
                {sessionData?.direccion ?? 'Direccion no disponible para esta sesion.'}
              </p>
            </section>
          )}

          <section className="rounded-xl border border-[#e6ecf3] bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
              <FiBookOpen size={14} className="text-[#f0aa31]" />
              <span>{sessionData?.materia}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#536b86]">
              <span className="inline-flex items-center gap-1.5 capitalize">
                <FiCalendar size={14} className="text-[#7c8ea5]" />
                {sessionData?.fecha ? formatDate(sessionData.fecha) : '-'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiClock size={14} className="text-[#7c8ea5]" />
                {sessionData?.hora}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-[#536b86]">{sessionData?.modalidad}</span>
              <span className="font-bold text-primary">${sessionData?.tarifa ?? 0}/h</span>
            </div>
          </section>

          {sessionData?.mensajeEstudiante && (
            <section className="rounded-xl border border-[#e6ecf3] border-l-2 border-l-[#f0aa31] bg-[#f9fbff] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                <FiMessageSquare size={13} />
                <span>TU MENSAJE</span>
              </div>
              <p className="mt-2 text-sm italic text-[#4f5f73]">&ldquo;{sessionData.mensajeEstudiante}&rdquo;</p>
            </section>
          )}
        </div>

        <footer className="flex items-center justify-end border-t border-[#eef2f7] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-base font-semibold text-primary transition-colors hover:text-[#0f3b73]"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </dialog>
  );
}
