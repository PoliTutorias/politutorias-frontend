'use client';

import { FiClock } from 'react-icons/fi';
import { CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';
import type { TutoriaHistorialListDTO } from '@/interfaces/historial/HistorialTypes';

interface TarjetaTutoriaProps {
  readonly tutoria: TutoriaHistorialListDTO;
  readonly onSelectTutoria: (tutoriaId: string) => void;
}

function getInitials(nombre: string, apellido: string): string {
  return `${(nombre[0] ?? '').toUpperCase()}${(apellido[0] ?? '').toUpperCase()}`;
}

function formatFechaHora(fecha: string, hora: string): string {
  const date = new Date(fecha);
  const day = date.getUTCDate();
  const month = date.toLocaleDateString('es-EC', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} de ${month} de ${year} a las ${hora}`;
}

export function TarjetaTutoria({ tutoria, onSelectTutoria }: TarjetaTutoriaProps) {
  const isCompletada = tutoria.estado === 'COMPLETADA';

  return (
    <button
      type="button"
      onClick={() => onSelectTutoria(tutoria.id)}
      className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        {/* Barra lateral de color */}
        <div
          className={clsx(
            'mt-1 w-[3px] self-stretch rounded-full',
            isCompletada ? 'bg-[#43a047]' : 'bg-[#e53935]',
          )}
        />

        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#152c53] text-base font-semibold text-white">
          {getInitials(tutoria.tutor.nombre, tutoria.tutor.apellido)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-lg font-bold text-primary">{tutoria.materia}</p>
              <p className="text-sm text-[#64748b]">
                {tutoria.tutor.nombre} {tutoria.tutor.apellido}
              </p>
            </div>

            {/* Etiqueta de estado */}
            {isCompletada ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#43a047] bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#43a047]">
                <CheckCircle2 size={14} />
                Completada
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e53935] bg-[#fef2f2] px-3 py-1 text-xs font-semibold text-[#e53935] transition-colors hover:bg-[#fee2e2]">
                <XCircle size={14} />
                Inasistencia
              </span>
            )}
          </div>

          <div className="mt-3 rounded-lg border border-[#e4e9f1] bg-[#f6f9fc] px-4 py-2 text-sm text-[#64748b]">
            <span className="inline-flex items-center gap-1.5">
              <FiClock size={14} />
              {formatFechaHora(tutoria.fecha, tutoria.hora)}
            </span>
          </div>

          {!isCompletada && (
            <div className="mt-3 rounded-lg border border-[#e53935] bg-[#fef2f2] px-4 py-3 text-sm text-[#e53935]">
              El tutor reportó inasistencia para esta sesión.
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
