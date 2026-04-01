'use client';

import Image from 'next/image';
import type { TutoriaHistorialListDTO } from '@/interfaces/historial/HistorialTypes';

interface TarjetaTutoriaProps {
  readonly tutoria: TutoriaHistorialListDTO;
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
          <p className="font-bold text-primary">{tutoria.materia}</p>
          <p className="text-sm text-[#64748b]">
            {tutoria.tutor.nombre} {tutoria.tutor.apellido}
          </p>
        </div>
      </div>
    </div>
  );
}
