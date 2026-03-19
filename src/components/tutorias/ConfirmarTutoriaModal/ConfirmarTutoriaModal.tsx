'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { FiBookOpen, FiCheck, FiLink2, FiLoader, FiMonitor, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import {
  confirmarTutoriaAction,
  initialConfirmarTutoriaActionState,
} from '@/actions/tutoria/confirmarTutoriaAction';

interface ConfirmarTutoriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutoriaId: string;
  modalidad: 'Virtual' | 'Presencial';
  materia?: string;
  estudiante?: string;
  fechaHora?: string;
  onConfirmed?: (tutoriaId: string) => void;
}

export function ConfirmarTutoriaModal({
  isOpen,
  onClose,
  tutoriaId,
  modalidad,
  materia,
  estudiante,
  fechaHora,
  onConfirmed,
}: ConfirmarTutoriaModalProps) {
  const [state, formAction, isSubmitting] = useActionState(
    confirmarTutoriaAction,
    initialConfirmarTutoriaActionState
  );
  const [enlaceReunion, setEnlaceReunion] = useState('');
  const [lugarEncuentro, setLugarEncuentro] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setEnlaceReunion('');
    setLugarEncuentro('');
  }, [isOpen, tutoriaId, modalidad]);

  useEffect(() => {
    if (!state.success || !isOpen) {
      return;
    }

    toast.success('Solicitud aceptada', {
      description: 'El estudiante podra ver los detalles de la sesion.',
      style: {
        background: '#2f855a',
        color: '#ffffff',
        border: '1px solid #2f855a',
      },
    });

    const closeTimeout = setTimeout(() => {
      onConfirmed?.(tutoriaId);
      onClose();
    }, 250);

    return () => clearTimeout(closeTimeout);
  }, [isOpen, onClose, onConfirmed, state.success, tutoriaId]);

  useEffect(() => {
    if (state.success || !state.message || !isOpen) {
      return;
    }

    toast.error('No se pudo confirmar la tutoria', {
      description: state.message,
      style: {
        background: '#c53030',
        color: '#ffffff',
        border: '1px solid #c53030',
      },
    });
  }, [isOpen, state.message, state.success]);

  const fieldError = useMemo(() => {
    return modalidad === 'Virtual'
      ? state.errors?.enlaceReunion?.[0]
      : state.errors?.lugarEncuentro?.[0];
  }, [modalidad, state.errors]);

  const fieldSuccess = useMemo(() => {
    if (!state.success) {
      return undefined;
    }

    return modalidad === 'Virtual' ? 'Enlace valido.' : 'Lugar de encuentro valido.';
  }, [modalidad, state.success]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4">
      <form action={formAction} className="w-full max-w-190 rounded-3xl bg-[#eff1f4] p-7 shadow-2xl">
        <input type="hidden" name="tutoriaId" value={tutoriaId} />
        <input type="hidden" name="modalidad" value={modalidad} />

        <div className="mb-6 flex items-start justify-between gap-3">
          <h2 className="text-2xl font-bold leading-none text-[#1f2937]">Confirmar Tutoria</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-slate-500 transition-colors hover:text-slate-700"
            aria-label="Cerrar modal"
          >
            <FiX />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-5 text-slate-600">
          <p className="inline-flex items-center gap-2 text-lg font-bold text-primary">
            <FiBookOpen size={18} className="text-yellow" />
            {materia ?? 'Tutoria'}
          </p>
          <p className="mt-1 text-base text-slate-500">
            {estudiante ?? 'Estudiante'}
            {fechaHora ? ` · ${fechaHora}` : ''}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-slate-600">
            {modalidad === 'Virtual' ? <FiMonitor size={16} /> : <FiLink2 size={16} />}
            Modalidad elegida: {modalidad}
          </p>
        </div>

        {modalidad === 'Virtual' && (
          <div className="mt-7">
            <label htmlFor="enlaceReunion" className="mb-1 block text-lg font-semibold text-slate-700">
              Enlace de la reunion <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-sm text-slate-500">Zoom, Teams, Meet u otra plataforma</p>
            <input
              id="enlaceReunion"
              name="enlaceReunion"
              type="text"
              value={enlaceReunion}
              onChange={(event) => setEnlaceReunion(event.target.value)}
              placeholder="https://zoom.us/j/..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
            {fieldError && (
              <p className="mt-2 text-sm font-medium text-red-600" aria-live="polite">
                {fieldError}
              </p>
            )}
            {!fieldError && fieldSuccess && (
              <p className="mt-2 text-sm font-medium text-green-700" aria-live="polite">
                {fieldSuccess}
              </p>
            )}
          </div>
        )}

        {modalidad === 'Presencial' && (
          <div className="mt-7">
            <label htmlFor="lugarEncuentro" className="mb-1 block text-lg font-semibold text-slate-700">
              Lugar de encuentro <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-sm text-slate-500">Describe un punto claro para reunirse</p>
            <textarea
              id="lugarEncuentro"
              name="lugarEncuentro"
              maxLength={100}
              value={lugarEncuentro}
              onChange={(event) => setLugarEncuentro(event.target.value.slice(0, 100))}
              rows={3}
              placeholder="Ej. Edificio H, aula 205, campus principal"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
            <p className={`mt-1 text-right text-sm ${lugarEncuentro.length === 100 ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
              {lugarEncuentro.length}/100
            </p>
            {fieldError && (
              <p className="mt-2 text-sm font-medium text-red-600" aria-live="polite">
                {fieldError}
              </p>
            )}
            {!fieldError && fieldSuccess && (
              <p className="mt-2 text-sm font-medium text-green-700" aria-live="polite">
                {fieldSuccess}
              </p>
            )}
          </div>
        )}

        {!state.success && state.message && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {state.message}
          </div>
        )}

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-6 py-2 text-lg font-semibold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-2 text-lg font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <FiLoader size={18} className="animate-spin" />
                Confirmando...
              </>
            ) : (
              <>
                <FiCheck size={18} />
                Confirmar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
