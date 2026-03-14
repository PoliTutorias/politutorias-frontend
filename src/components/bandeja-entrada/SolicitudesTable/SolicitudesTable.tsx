'use client';

import React from 'react';
import { NoRequestsMessage } from '@/components/bandeja-entrada/NoRequestsMessage/NoRequestsMessage';
import { SolicitudRow } from '@/components/bandeja-entrada/SolicitudesTable/SolicitudRow';
import { PaginationComponent } from '@/components/common/PaginationComponent/PaginationComponent';
import { SolicitudDetailsDto } from '@/interfaces/solicitudes/SolicitudesDTO';

interface SolicitudesTableProps {
  solicitudes: SolicitudDetailsDto[];
  activeTabStatus: 'PENDIENTE' | 'EXPIRADA';
}

export function SolicitudesTable({ solicitudes, activeTabStatus }: SolicitudesTableProps) {
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);

  const toggleRowExpansion = (id: string) => {
    setExpandedRowId((previous) => (previous === id ? null : id));
  };

  React.useEffect(() => {
    setExpandedRowId(null);
  }, [activeTabStatus]);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full table-auto border-collapse">
          {solicitudes.length > 0 && (
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-left">
                <th className="px-6 py-4 text-lg font-bold text-slate-500">ESTUDIANTE</th>
                <th className="px-3 py-4 text-lg font-bold text-slate-500">MATERIA</th>
                <th className="px-3 py-4 text-lg font-bold text-slate-500">FECHA/HORA</th>
                <th className="px-3 py-4 text-lg font-bold text-slate-500">MENSAJE</th>
                <th className="px-6 py-4 text-right text-lg font-bold text-slate-500">ESTADO</th>
              </tr>
            </thead>
          )}
          <tbody>
            {solicitudes.map((solicitud) => (
              <SolicitudRow
                key={solicitud.id}
                solicitud={solicitud}
                isExpanded={expandedRowId === solicitud.id}
                onToggleExpand={toggleRowExpansion}
              />
            ))}
          </tbody>
        </table>

        {solicitudes.length === 0 && <NoRequestsMessage status={activeTabStatus} />}
      </div>

      {solicitudes.length > 0 && <PaginationComponent />}
    </div>
  );
}
