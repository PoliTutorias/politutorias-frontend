'use client';

import clsx from 'clsx';
import { SolicitudStatus } from '@/interfaces/solicitudes/SolicitudesDTO';

interface StatusTagProps {
  status: SolicitudStatus;
}

const STATUS_LABEL: Record<SolicitudStatus, string> = {
  PENDIENTE: 'Pendiente',
  EXPIRADA: 'Expirada',
  RESPONDIDA: 'Respondida',
};

export function StatusTag({ status }: StatusTagProps) {
  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-semibold',
        status === 'PENDIENTE' && 'bg-orange-100 text-orange-700',
        status === 'EXPIRADA' && 'bg-red-100 text-red-500',
        status === 'RESPONDIDA' && 'bg-blue-100 text-blue-700'
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
