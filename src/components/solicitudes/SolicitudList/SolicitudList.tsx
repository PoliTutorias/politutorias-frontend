'use client';

import { SolicitudListItemDto } from '@/dtos/solicitudes.dto';
import { SolicitudCard } from '@/components/solicitudes/SolicitudCard/SolicitudCard';

interface SolicitudListProps {
  readonly solicitudes: SolicitudListItemDto[];
  readonly onCardClick: (id: string) => void;
}

export function SolicitudList({ solicitudes, onCardClick }: SolicitudListProps) {
  if (solicitudes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500">
        No hay solicitudes para este filtro.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {solicitudes.map((solicitud) => (
        <SolicitudCard key={solicitud.id} solicitud={solicitud} onClick={onCardClick} />
      ))}
    </div>
  );
}