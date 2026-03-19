'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { FiBookOpen, FiCheck, FiLink2, FiLoader, FiMonitor, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import {
  confirmarTutoriaAction,
  type ConfirmarTutoriaActionState,
} from '@/actions/tutoria/confirmarTutoriaAction';

interface ConfirmarTutoriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutoriaId: string;
  modalidad: string;
  materia?: string;
  estudiante?: string;
  fechaHora?: string;
  onConfirmed?: (tutoriaId: string) => void;
}

function normalizeModalidad(rawModalidad: string): 'Virtual' | 'Presencial' {
  const normalized = rawModalidad.trim().toLowerCase();

  if (normalized === 'presencial') {
    return 'Presencial';
  }

  return 'Virtual';
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
  const initialConfirmarTutoriaActionState: ConfirmarTutoriaActionState = { success: false };
  const normalizedModalidad = useMemo(() => normalizeModalidad(modalidad), [modalidad]);

  const [state, formAction, isSubmitting] = useActionState(
    confirmarTutoriaAction,
    initialConfirmarTutoriaActionState
  );
  const [enlaceReunion, setEnlaceReunion] = useState('');
  const [lugarEncuentro, setLugarEncuentro] = useState('');
  const [isEnlaceTouched, setIsEnlaceTouched] = useState(false);
  const [isLugarTouched, setIsLugarTouched] = useState(false);

  useEffect(() => {
    if (!state.success || !isOpen) {
      return;
    }

    toast.success('Solicitud aceptada', {
      description: 'El estudiante podrá ver los detalles de la sesión.',
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

    toast.error('No se pudo confirmar la tutoría', {
      description: state.message,
      style: {
        background: '#c53030',
        color: '#ffffff',
        border: '1px solid #c53030',
      },
    });
  }, [isOpen, state.message, state.success]);

  const localValidation = useMemo(() => {
    if (normalizedModalidad === 'Virtual') {
      const trimmedLink = enlaceReunion.trim();

      if (!isEnlaceTouched) {
        return { error: undefined, success: undefined };
      }

      if (!trimmedLink) {
        return { error: 'El enlace de reunión es obligatorio.', success: undefined };
      }

      if (!/^https?:\/\/.+/.test(trimmedLink)) {
        return {
          error: 'Ingresa una URL válida (debe comenzar con https:// o http://).',
          success: undefined,
        };
      }

      return { error: undefined, success: 'URL válida.' };
    }

    const trimmedPlace = lugarEncuentro.trim();

    if (!isLugarTouched) {
      return { error: undefined, success: undefined };
    }

    if (!trimmedPlace) {
      return { error: 'El lugar de encuentro es obligatorio.', success: undefined };
    }

    if (trimmedPlace.length < 10) {
      return { error: 'Mínimo 10 caracteres para el lugar.', success: undefined };
    }

    return { error: undefined, success: 'Lugar válido.' };
  }, [enlaceReunion, isEnlaceTouched, isLugarTouched, lugarEncuentro, normalizedModalidad]);

  const fieldError = useMemo(() => {
    const serverError = normalizedModalidad === 'Virtual'
      ? state.errors?.enlaceReunion?.[0]
      : state.errors?.lugarEncuentro?.[0];

    return localValidation.error ?? serverError;
  }, [localValidation.error, normalizedModalidad, state.errors]);

  const fieldSuccess = useMemo(() => {
    if (fieldError) {
      return undefined;
    }

    return localValidation.success;
  }, [fieldError, localValidation.success]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4">
      <form action={formAction} className="w-full max-w-190 rounded-3xl bg-[#eff1f4] p-6 shadow-2xl">
        <input type="hidden" name="tutoriaId" value={tutoriaId} />
        <input type="hidden" name="modalidad" value={normalizedModalidad} />

        <div className="mb-5 flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold leading-none text-[#1f2937]">Confirmar Tutoría</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xl leading-none text-slate-500 transition-colors hover:text-slate-700"
            aria-label="Cerrar modal"
          >
            <FiX />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-4 text-slate-600">
          <p className="inline-flex items-center gap-2 text-base font-bold text-primary">
            <FiBookOpen size={16} className="text-yellow" />
            {materia ?? 'Tutoría'}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {estudiante ?? 'Estudiante'}
            {fechaHora ? ` · ${fechaHora}` : ''}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
            {normalizedModalidad === 'Virtual' ? <FiMonitor size={15} /> : <FiLink2 size={15} />}
            Modalidad elegida: {normalizedModalidad}
          </p>
        </div>

        {normalizedModalidad === 'Virtual' && (
          <div className="mt-6">
            <label htmlFor="enlaceReunion" className="mb-1 block text-base font-semibold text-slate-700">
              Enlace de la reunión <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-sm text-slate-500">Zoom, Teams, Meet u otra plataforma</p>
            <input
              id="enlaceReunion"
              name="enlaceReunion"
              type="text"
              value={enlaceReunion}
              onChange={(event) => {
                setIsEnlaceTouched(true);
                setEnlaceReunion(event.target.value);
              }}
              placeholder="https://zoom.us/j/..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
            <div className="mt-1 flex min-h-5 items-center gap-2">
              <div className="min-w-0 flex-1">
                {fieldError && (
                  <p className="truncate text-sm font-medium text-red-600" aria-live="polite">
                    {fieldError}
                  </p>
                )}
                {!fieldError && fieldSuccess && (
                  <p className="truncate text-sm font-medium text-green-700" aria-live="polite">
                    {fieldSuccess}
                  </p>
                )}
              </div>
              <span className="ml-auto text-sm text-transparent">0/100</span>
            </div>
          </div>
        )}

        {normalizedModalidad === 'Presencial' && (
          <div className="mt-6">
            <label htmlFor="lugarEncuentro" className="mb-1 block text-base font-semibold text-slate-700">
              Lugar de encuentro <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-sm text-slate-500">Describe un punto claro para reunirse</p>
            <textarea
              id="lugarEncuentro"
              name="lugarEncuentro"
              maxLength={100}
              value={lugarEncuentro}
              onChange={(event) => {
                setIsLugarTouched(true);
                setLugarEncuentro(event.target.value.slice(0, 100));
              }}
              rows={3}
              placeholder="Ej. Edificio H, aula 205, campus principal"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
            <div className="mt-1 flex min-h-5 items-center gap-2">
              <div className="min-w-0 flex-1">
                {fieldError && (
                  <p className="truncate text-sm font-medium text-red-600" aria-live="polite">
                    {fieldError}
                  </p>
                )}
                {!fieldError && fieldSuccess && (
                  <p className="truncate text-sm font-medium text-green-700" aria-live="polite">
                    {fieldSuccess}
                  </p>
                )}
              </div>
              <p className={`ml-auto text-right text-sm ${lugarEncuentro.length === 100 ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
                {lugarEncuentro.length}/100
              </p>
            </div>
          </div>
        )}

        {!state.success && state.message && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {state.message}
          </div>
        )}

        <div className="mt-7 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-6 py-2 text-base font-semibold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-2 text-base font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <FiLoader size={16} className="animate-spin" />
                Confirmando...
              </>
            ) : (
              <>
                <FiCheck size={16} />
                Confirmar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
