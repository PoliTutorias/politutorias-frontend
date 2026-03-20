'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface RechazarSolicitudModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitudId: string;
}

const rejectionReasons = [
  'Imprevisto personal',
  'Conflicto de horarios con otra tutoría',
  'Enfermedad',
  'Otro',
] as const;

type RejectionReason = (typeof rejectionReasons)[number];

export function RechazarSolicitudModal({ isOpen, onClose, solicitudId }: RechazarSolicitudModalProps) {
  const [selectedReason, setSelectedReason] = useState<RejectionReason | null>(null);
  const [comment, setComment] = useState('');

  if (!isOpen) {
    return null;
  }

  const isOtherSelected = selectedReason === 'Otro';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-[2px]">
      <div className="w-full max-w-[560px] rounded-2xl border border-slate-200 bg-[#f7f7f8] px-6 pb-6 pt-5 shadow-[0_18px_44px_rgba(15,23,42,0.23)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[40px] font-bold leading-tight text-[#1f2937] sm:text-[34px]">Rechazar Solicitud</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1f2937] transition-colors hover:bg-slate-200"
            aria-label="Cerrar modal"
          >
            <FiX size={28} />
          </button>
        </div>

        <div className="rounded-xl border border-slate-300 bg-[#f3f4f6] p-4">
          <p className="text-[17px] font-semibold text-[#243349]">Notificación al estudiante</p>
          <p className="mt-2 text-[15px] leading-snug text-slate-600">
            El estudiante será notificado del rechazo. Selecciona un motivo para ayudarle a entender la situación.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-[16px] font-semibold text-[#334155]">Motivo del rechazo</h3>
          <div className="mt-3 space-y-3">
            {rejectionReasons.map((reason) => (
              <label key={reason} className="flex cursor-pointer items-center gap-3 text-[16px] text-slate-700">
                <input
                  type="radio"
                  name={`reason-${solicitudId}`}
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="h-[19px] w-[19px] accent-[#3b82c4]"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
        </div>

        {isOtherSelected && (
          <div className="mt-5">
            <label htmlFor={`rechazo-comment-${solicitudId}`} className="text-[16px] font-semibold text-[#334155]">
              Comentario adicional (opcional)
            </label>
            <textarea
              id={`rechazo-comment-${solicitudId}`}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              placeholder="Explica brevemente el motivo..."
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-[#f2f5f8] px-4 py-3 text-[15px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400"
            />
          </div>
        )}

        <div className="mt-3 mb-4">
          <p className="text-xs text-slate-400">Solicitud: {solicitudId}</p>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="h-[48px] rounded-xl px-6 text-[35px] font-semibold text-slate-600 transition-colors hover:bg-slate-200 sm:text-[30px]"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={!selectedReason}
            className="h-[50px] rounded-xl border border-primary px-7 text-[35px] font-semibold text-primary transition-opacity disabled:text-primary/60 sm:text-[30px]"
          >
            Confirmar Rechazo
          </button>
        </div>
      </div>
    </div>
  );
}
