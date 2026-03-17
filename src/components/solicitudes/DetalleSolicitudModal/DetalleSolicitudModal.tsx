'use client';

import { FiMessageSquare, FiX } from 'react-icons/fi';
import { SolicitudDetailDto } from '@/dtos/solicitudes.dto';

interface DetalleSolicitudModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly solicitudDetail: SolicitudDetailDto | null;
}

export function DetalleSolicitudModal({
  isOpen,
  onClose,
  solicitudDetail,
}: DetalleSolicitudModalProps) {
  if (!isOpen || !solicitudDetail) {
    return null;
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-black/40 px-4"
      aria-label="Detalle de la Solicitud"
    >
      <div className="w-full max-w-2xl rounded-3xl bg-white p-7 shadow-xl">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary md:text-[1.95rem]">Detalle de la Solicitud</h2>
          <button type="button" onClick={onClose} className="text-3xl text-slate-600 transition-colors hover:text-primary">
            <FiX />
          </button>
        </header>

        <section className="mt-6 rounded-xl border border-slate-200 bg-[#edf2f7] p-4">
          <div className="flex items-center gap-4">
            <img
              src={solicitudDetail.avatarUrl || 'https://i.pravatar.cc/96'}
              alt={`Avatar de ${solicitudDetail.tutorName}`}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="text-[2rem] font-bold leading-none text-primary md:text-[1.65rem]">{solicitudDetail.tutorName}</p>
              <p className="mt-1 text-[1.6rem] leading-none text-slate-500 md:text-base">Tutor</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-[1.95rem] font-bold leading-none text-primary md:text-[1.65rem]">{solicitudDetail.subject}</h3>
        </section>

        <section className="mt-4 rounded-xl border border-orange-300 bg-white p-4">
          <div className="flex items-center gap-2 text-[1.25rem] font-bold uppercase tracking-wide text-primary md:text-sm">
            <FiMessageSquare />
            <span>Tu mensaje</span>
          </div>
          <p className="mt-3 text-[1.45rem] italic text-slate-600 md:text-base">“{solicitudDetail.studentMessage}”</p>
        </section>

        <footer className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-[1.7rem] font-semibold text-slate-600 transition-colors hover:text-primary md:text-xl"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </dialog>
  );
}
