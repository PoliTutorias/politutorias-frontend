'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface ConfirmarTutoriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutoriaId: string;
  modalidad: 'Virtual' | 'Presencial';
}

export function ConfirmarTutoriaModal({
  isOpen,
  onClose,
  tutoriaId,
  modalidad,
}: ConfirmarTutoriaModalProps) {
  const [lugarEncuentro, setLugarEncuentro] = useState('');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4">
      <div className="w-full max-w-[760px] rounded-3xl bg-[#eff1f4] p-7 shadow-2xl">
        <div className="mb-7 flex items-start justify-between gap-3">
          <h2 className="text-[40px] font-bold leading-none text-[#1f2937]">Confirmar Tutoría</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-4xl leading-none text-slate-500 transition-colors hover:text-slate-700"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-6 text-slate-600">
          <p className="text-sm font-semibold text-slate-700">Modalidad elegida: {modalidad}</p>
          <p className="mt-1 text-xs text-slate-500">Tutoría: {tutoriaId}</p>
        </div>

        {modalidad === 'Virtual' && (
          <div className="mt-8">
            <label htmlFor="enlaceReunion" className="mb-1 block text-3xl font-semibold text-slate-700">
              Enlace de la reunión <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-xl text-slate-500">Zoom, Teams, Meet u otra plataforma</p>
            <input
              id="enlaceReunion"
              name="enlaceReunion"
              type="text"
              placeholder="https://zoom.us/j/..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
          </div>
        )}

        {modalidad === 'Presencial' && (
          <div className="mt-8">
            <label htmlFor="lugarEncuentro" className="mb-1 block text-3xl font-semibold text-slate-700">
              Lugar de encuentro <span className="text-red-500">*</span>
            </label>
            <textarea
              id="lugarEncuentro"
              name="lugarEncuentro"
              maxLength={100}
              value={lugarEncuentro}
              onChange={(event) => setLugarEncuentro(event.target.value)}
              rows={3}
              placeholder="Ej. Edificio H, aula 205, campus principal"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
            <p className="mt-1 text-right text-xl text-slate-500">{lugarEncuentro.length}/100</p>
          </div>
        )}

        <div className={clsx('mt-10 flex items-center justify-end gap-4')}>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-6 py-2.5 text-4xl font-semibold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Cancelar
          </button>

          <button
            type="button"
            className="rounded-xl bg-primary px-8 py-2.5 text-4xl font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}