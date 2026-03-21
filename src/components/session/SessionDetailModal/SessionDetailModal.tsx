'use client';

import { FiBookOpen, FiCalendar, FiClock, FiLink2, FiMapPin, FiMonitor, FiTrash2, FiX } from 'react-icons/fi';
import { CompletedSessionBanner } from '@/components/session/CompletedSessionBanner/CompletedSessionBanner';
import type { SessionDetailDTO } from '@/interfaces/session/SessionInterfaces';

interface SessionDetailModalProps {
  isOpen: boolean;
  sessionDetails: SessionDetailDTO | null;
  onClose: () => void;
  onCancelTutoria: (sessionId: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function SessionDetailModal({
  isOpen,
  sessionDetails,
  onClose,
  onCancelTutoria,
}: SessionDetailModalProps) {
  if (!isOpen || !sessionDetails) {
    return null;
  }

  const isCompleted = sessionDetails.status === 'COMPLETED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1c33]/45 px-4 py-6 backdrop-blur-[2px]">
      <div className="w-full max-w-3xl rounded-2xl border border-[#d9e1ec] bg-[#f8fafd] p-6 shadow-[0_22px_55px_rgba(15,23,42,0.28)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[40px] font-bold text-[#212a38]">Detalles de la Sesion</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#303b4d] transition-colors hover:bg-[#e8edf4]"
            aria-label="Cerrar"
          >
            <FiX size={32} />
          </button>
        </div>

        {isCompleted && (
          <div className="mb-4">
            <CompletedSessionBanner />
          </div>
        )}

        <div className="rounded-xl border border-[#dbe3ef] bg-[#eef3f9] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#14284b] text-[20px] font-bold text-white">
              {sessionDetails.student.initials}
            </div>
            <div>
              <p className="text-[20px] font-bold text-[#1f2d46]">{sessionDetails.student.name}</p>
              <p className="text-[16px] text-[#6e809d]">Estudiante</p>
            </div>
          </div>
        </div>

        {sessionDetails.modality === 'VIRTUAL' ? (
          <div className="mt-4 rounded-xl border border-[#dbe3ef] bg-white px-4 py-4">
            <p className="inline-flex items-center gap-2 text-[16px] font-extrabold text-[#253654]">
              <FiLink2 size={16} /> ENLACE
            </p>
            <a href={sessionDetails.link} target="_blank" rel="noreferrer" className="mt-2 block text-[18px] text-[#2d6ebd] underline-offset-2 hover:underline">
              {sessionDetails.link}
            </a>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-[#dbe3ef] bg-white px-4 py-4">
            <p className="inline-flex items-center gap-2 text-[16px] font-extrabold text-[#253654]">
              <FiMapPin size={16} /> LUGAR
            </p>
            <p className="mt-2 text-[18px] text-[#4b5f7f]">{sessionDetails.location}</p>
          </div>
        )}

        <div className="mt-4 rounded-xl border border-[#dbe3ef] bg-white px-4 py-4">
          <p className="inline-flex items-center gap-2 text-[32px] font-bold text-[#1f2d46]">
            <FiBookOpen size={22} className="text-[#f4a21f]" />
            {sessionDetails.courseName}
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 text-[16px] text-[#52647f] sm:grid-cols-2">
            <p className="inline-flex items-center gap-2">
              <FiCalendar size={16} /> {formatDate(sessionDetails.date)}
            </p>
            <p className="inline-flex items-center gap-2">
              <FiClock size={16} /> {sessionDetails.time}
            </p>
            <p className="inline-flex items-center gap-2">
              <FiMonitor size={16} /> {sessionDetails.modality === 'VIRTUAL' ? 'Virtual' : 'Presencial'}
            </p>
            <p className="text-[20px] font-bold text-[#1f2d46]">${sessionDetails.pricePerHour}/h</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[#dbe3ef] border-l-3 border-l-[#f4ad2f] bg-white px-4 py-4">
          <p className="text-[15px] font-extrabold text-[#2d3d58]">MENSAJE DEL ESTUDIANTE</p>
          <p className="mt-2 text-[18px] italic text-[#465979]">"{sessionDetails.studentMessage}"</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          {isCompleted ? (
            <span />
          ) : (
            <button
              type="button"
              onClick={() => onCancelTutoria(sessionDetails.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#ef8a8a] px-4 py-2 text-[18px] font-semibold text-[#f05959]"
            >
              <FiTrash2 size={16} /> Cancelar Tutoria
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-[34px] font-semibold text-[#49566d]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
