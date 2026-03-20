'use client';

import { FiX } from 'react-icons/fi';

interface RechazarSolicitudModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitudId: string;
}

export function RechazarSolicitudModal({ isOpen, onClose, solicitudId }: RechazarSolicitudModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-[2px]">
      <div className="w-full max-w-[560px] rounded-2xl border border-slate-200 bg-[#f7f7f8] px-6 pb-6 pt-5 shadow-[0_18px_44px_rgba(15,23,42,0.23)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[40px] font-bold leading-tight text-[#1f2937] sm:text-[38px]">Rechazar Solicitud</h2>
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
          <p className="text-[28px] font-semibold text-[#243349] sm:text-[26px]">Notificación al estudiante</p>
          <p className="mt-2 text-[24px] leading-snug text-slate-600 sm:text-[22px]">
            El estudiante será notificado del rechazo. Selecciona un motivo para ayudarle a entender la situación.
          </p>
        </div>

        <div className="mt-6 mb-8">
          <p className="text-sm text-slate-400">Solicitud: {solicitudId}</p>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="h-[48px] rounded-xl px-6 text-[32px] font-semibold text-slate-600 transition-colors hover:bg-slate-200 sm:text-[30px]"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled
            className="h-[50px] rounded-xl border border-primary px-7 text-[32px] font-semibold text-primary/60 sm:text-[30px]"
          >
            Confirmar Rechazo
          </button>
        </div>
      </div>
    </div>
  );
}
