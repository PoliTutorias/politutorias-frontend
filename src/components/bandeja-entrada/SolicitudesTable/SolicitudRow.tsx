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
        <td className="px-3 py-4 align-top">
          <div className="flex items-center gap-3">
            <span className={`h-11 w-1 rounded-full ${leftAccent}`} aria-hidden="true" />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-600">
              {initials}
            </span>
            <span className="text-2xl font-bold text-slate-700">{solicitud.estudiante}</span>
          </div>
        </td>
        <td className="px-3 py-4 text-2xl font-semibold text-slate-600">{solicitud.materia}</td>
        <td className="px-3 py-4">
          <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1 text-lg font-semibold text-slate-500">
            <FiCalendar size={15} />
            {solicitud.fechaHora}
          </span>
        </td>
        <td className="px-3 py-4 text-xl italic text-slate-400">{solicitud.mensajeResumen}</td>
        <td className="px-4 py-4">
          <div className="flex items-center justify-end gap-4">
            <StatusTag status={solicitud.estado} />
            {isExpanded ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="border-b border-slate-100 bg-white">
          <td colSpan={5} className="px-8 pb-4 pt-2">
            <div className="pl-16">
              <div className="mb-4 flex items-center gap-6 text-3xl text-slate-700">
                <span className="inline-flex items-center gap-2">
                  {modalityIcon}
                  {solicitud.modalidad}
                </span>
                <span className="font-bold text-slate-900">${solicitud.precioHora}/h</span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-2xl font-bold text-primary">
                  <FiMessageSquare />
                  MENSAJE DEL ESTUDIANTE
                </p>
                <p className="text-[28px] italic text-primary">{solicitud.mensajeCompleto}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
