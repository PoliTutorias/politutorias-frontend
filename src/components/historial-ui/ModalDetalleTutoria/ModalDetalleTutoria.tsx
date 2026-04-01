'use client';

import { FiX } from 'react-icons/fi';

interface ModalDetalleTutoriaProps {
  readonly tutoriaId: string | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ModalDetalleTutoria({ tutoriaId, isOpen, onClose }: ModalDetalleTutoriaProps) {
  if (!isOpen || !tutoriaId) {
    return null;
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-[rgba(15,23,42,0.34)] px-4"
      aria-label="Detalle de la Tutoría"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-[0_20px_80px_rgba(15,23,42,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#eef2f7] px-6 py-4">
          <h2 className="text-xl font-bold text-primary">Detalle de la Tutoría</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="rounded-md p-1 text-[#30445f] transition-colors hover:bg-[#eef3f8]"
          >
            <FiX size={20} />
          </button>
        </header>

        {/* Content placeholder */}
        <div className="px-6 py-5">
          <p className="text-sm text-[#64748b]">Cargando...</p>
        </div>
      </div>
    </dialog>
  );
}
