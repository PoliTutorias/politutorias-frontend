'use client';

import { SolicitudStatus } from '@/interfaces/solicitudes/SolicitudesDTO';

interface NoRequestsMessageProps {
  status: SolicitudStatus;
}

const STATUS_TEXT: Record<SolicitudStatus, string> = {
  PENDIENTE: 'pendientes',
  EXPIRADA: 'expiradas',
  RESPONDIDA: 'respondidas',
};

export function NoRequestsMessage({ status }: NoRequestsMessageProps) {
  return (
    <div className="py-10 text-center text-sm font-medium text-slate-500">
      No hay solicitudes {STATUS_TEXT[status]}.
    </div>
  );
}
