'use client';

import Image from 'next/image';
import { FiBookOpen, FiCalendar, FiClock, FiMessageSquare, FiX } from 'react-icons/fi';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';

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
          <h2 className="text-3xl font-bold text-primary">Detalles de la Sesion</h2>
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
          <section className="rounded-xl bg-[#edf2f7] px-4 py-3">
            <div className="flex items-center gap-3">
              <Image
                src={tutoria.tutor.fotoUrl}
                alt={`Foto de ${tutoria.tutor.nombre} ${tutoria.tutor.apellido}`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-bold text-primary">{tutoria.tutor.nombre} {tutoria.tutor.apellido}</p>
                <p className="text-sm text-[#7890a8]">Tutor</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#e6ecf3] bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
              <FiBookOpen size={14} className="text-[#f0aa31]" />
              <span>{tutoria.materia}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#536b86]">
              <span className="inline-flex items-center gap-1.5 capitalize">
                <FiCalendar size={14} className="text-[#7c8ea5]" />
                {formatDate(tutoria.fecha)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiClock size={14} className="text-[#7c8ea5]" />
                {tutoria.hora}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-[#536b86]">{tutoria.modalidad}</span>
              <span className="font-bold text-primary">${tutoria.tarifa}/h</span>
            </div>
          </section>

          {tutoria.mensajeEstudiante && (
            <section className="rounded-xl border border-[#e6ecf3] border-l-2 border-l-[#f0aa31] bg-[#f9fbff] p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                <FiMessageSquare size={13} />
                <span>TU MENSAJE</span>
              </div>
              <p className="mt-2 text-sm italic text-[#4f5f73]">&ldquo;{tutoria.mensajeEstudiante}&rdquo;</p>
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
