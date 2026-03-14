'use client';

import { FiCalendar, FiChevronDown, FiChevronUp, FiMapPin, FiMessageSquare, FiMonitor } from 'react-icons/fi';
import { StatusTag } from '@/components/common/StatusTag/StatusTag';
import { SolicitudDetailsDto } from '@/interfaces/solicitudes/SolicitudesDTO';

interface SolicitudRowProps {
  solicitud: SolicitudDetailsDto;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

function getInitials(estudiante: string): string {
  const words = estudiante.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '').join('');
}

export function SolicitudRow({ solicitud, isExpanded, onToggleExpand }: SolicitudRowProps) {
  const initials = getInitials(solicitud.estudiante);
  const leftAccent = solicitud.estado === 'PENDIENTE' ? 'bg-orange-400' : 'bg-red-400';
  const modalityIcon = solicitud.modalidad === 'Virtual' ? <FiMonitor size={18} /> : <FiMapPin size={18} />;

  return (
    <>
      <tr
        className="cursor-pointer border-b border-slate-100 bg-white hover:bg-slate-50"
        onClick={() => onToggleExpand(solicitud.id)}
      >
        <td className="px-3 py-3 align-top">
          <div className="flex items-center gap-3">
            <span className={`h-9 w-1 rounded-full ${leftAccent}`} aria-hidden="true" />
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
              {initials}
            </span>
            <span className="text-sm font-semibold text-slate-700">{solicitud.estudiante}</span>
          </div>
        </td>
        <td className="px-3 py-3 text-sm font-semibold text-slate-600">{solicitud.materia}</td>
        <td className="px-3 py-3">
          <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            <FiCalendar size={13} />
            {solicitud.fechaHora}
          </span>
        </td>
        <td className="px-3 py-3 text-xs italic text-slate-400">
          &quot;{solicitud.mensajeResumen}&quot;
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-3">
            <StatusTag status={solicitud.estado} />
            {isExpanded ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="border-b border-slate-100 bg-white">
          <td colSpan={5} className="px-8 pb-4 pt-1">
            <div className="pl-16">
              <div className="mb-2 flex items-center gap-4 text-sm text-slate-700">
                <span className="inline-flex items-center gap-2">
                  {modalityIcon}
                  {solicitud.modalidad}
                </span>
                <span className="text-sm font-bold text-slate-900">${solicitud.precioHora}/h</span>
              </div>

              <div className="rounded-xl border border-slate-200 border-l-3 border-l-yellow bg-white p-4">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold tracking-wide text-primary">
                  <FiMessageSquare />
                  MENSAJE DEL ESTUDIANTE
                </p>
                <p className="text-sm italic text-primary">&quot;{solicitud.mensajeCompleto}&quot;</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
