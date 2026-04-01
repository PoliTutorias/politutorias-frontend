'use client';

import Image from 'next/image';
import { FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import clsx from 'clsx';
import type { TutoriaHistorialListDTO } from '@/interfaces/historial/HistorialTypes';

interface TarjetaTutoriaProps {
  readonly tutoria: TutoriaHistorialListDTO;
}

function formatFechaHora(fecha: string, hora: string): string {
  const date = new Date(fecha);
  const day = date.getUTCDate();
  const month = date.toLocaleDateString('es-EC', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} de ${month} de ${year} a las ${hora}`;
}

export function TarjetaTutoria({ tutoria }: TarjetaTutoriaProps) {
  const isCompletada = tutoria.estado === 'COMPLETADA';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Barra lateral de color */}
        <div
          className={clsx(
            'mt-1 w-1 self-stretch rounded-full',
            isCompletada ? 'bg-[#43a047]' : 'bg-[#e53935]',
          )}
        />

        <Image
          src={tutoria.tutor.fotoUrl}
          alt={`Foto de ${tutoria.tutor.nombre} ${tutoria.tutor.apellido}`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />

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
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#43a047] px-3 py-1 text-xs font-semibold text-[#43a047]">
                <FiCheckCircle size={14} />
                Completada
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e53935] px-3 py-1 text-xs font-semibold text-[#e53935]">
                <FiAlertCircle size={14} />
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
    </div>
  );
}
