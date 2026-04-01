'use client';

import Image from 'next/image';
import { FiClock } from 'react-icons/fi';
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
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Image
          src={tutoria.tutor.fotoUrl}
          alt={`Foto de ${tutoria.tutor.nombre} ${tutoria.tutor.apellido}`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-primary">{tutoria.materia}</p>
          <p className="text-sm text-[#64748b]">
            {tutoria.tutor.nombre} {tutoria.tutor.apellido}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-[#e4e9f1] bg-[#f6f9fc] px-4 py-2 text-sm text-[#64748b]">
        <span className="inline-flex items-center gap-1.5">
          <FiClock size={14} />
          {formatFechaHora(tutoria.fecha, tutoria.hora)}
        </span>
      </div>
    </div>
  );
}
