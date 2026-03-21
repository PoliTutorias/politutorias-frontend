'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { FiBookOpen, FiCheck, FiLink2, FiMapPin, FiMonitor, FiUsers, FiX } from 'react-icons/fi';
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
  if (normalized === 'presencial') return 'Presencial';
  return 'Virtual';
}

/**
 * Formatea '2026-03-23T15:00:00' (local-naive) → '23 mar 2026 · 15:00'
 * sin conversión UTC para evitar desfase de dia en Ecuador (UTC-5).
 */
function formatFechaHoraDisplay(fechaHora?: string): string {
  if (!fechaHora) return '';
  const date = new Date(fechaHora);
  if (isNaN(date.getTime())) return fechaHora;
  const day   = new Intl.DateTimeFormat('es-EC', { day: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('es-EC', { month: 'short' }).format(date);
  const year  = new Intl.DateTimeFormat('es-EC', { year: 'numeric' }).format(date);
  const time  = new Intl.DateTimeFormat('es-EC', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
  return `${day} ${month} ${year} · ${time}`;
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
    // Si la validación local es exitosa, ignorar errores del servidor
    if (localValidation.success) {
      return undefined;
    }

    const serverError = normalizedModalidad === 'Virtual'
      ? state.errors?.enlaceReunion?.[0]
      : state.errors?.lugarEncuentro?.[0];

    return localValidation.error ?? serverError;
  }, [localValidation.error, localValidation.success, normalizedModalidad, state.errors]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-[2px]">
      <form action={formAction} className="w-full max-w-[540px] rounded-2xl border border-slate-200 bg-white px-6 pb-5 pt-4 shadow-[0_18px_44px_rgba(15,23,42,0.23)]">
        <input type="hidden" name="tutoriaId" value={tutoriaId} />
        <input type="hidden" name="modalidad" value={normalizedModalidad} />

        <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <h2 className="text-[20px] font-bold leading-none text-[#1f2937]">Confirmar Tutoría</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[22px] leading-none text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
            aria-label="Cerrar modal"
          >
            <FiX />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-[#edf2f7] p-4 text-slate-600">
          <p className="inline-flex items-center gap-2 text-[17px] font-semibold leading-tight text-[#1f2937]">
            <FiBookOpen size={16} className="text-yellow" />
            {materia ?? 'Tutoría'}
          </p>
          <p className="mt-1 text-[16px] text-slate-500">
            {estudiante ?? 'Estudiante'}
            {fechaHora ? ` · ${formatFechaHoraDisplay(fechaHora)}` : ''}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-[17px] font-semibold text-slate-600">
            {normalizedModalidad === 'Virtual' ? <FiMonitor size={15} /> : <FiUsers size={15} />}
            Modalidad elegida: {normalizedModalidad}
          </p>
        </div>

        {normalizedModalidad === 'Virtual' && (
          <div className="mt-6">
            <label htmlFor="enlaceReunion" className="mb-1 inline-flex items-center gap-2 text-[19px] font-semibold text-slate-700">
              <FiLink2 size={16} className="text-slate-500" />
              Enlace de la reunión <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-[15px] text-slate-500">Zoom, Teams, Meet u otra plataforma</p>
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
              className="h-[54px] w-full rounded-xl border border-[#b9c6d8] bg-white px-4 text-[16px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
            <div className="mt-2 flex min-h-5 items-center gap-2">
              <div className="min-w-0 flex-1">
                {fieldError && (
                  <p className="truncate text-[14px] font-medium text-red-600" aria-live="polite">
                    {fieldError}
                  </p>
                )}
                {!fieldError && fieldSuccess && (
                  <div className="inline-flex items-center gap-1 truncate text-[14px] font-medium text-green-700" aria-live="polite">
                    <FiCheck size={14} className="flex-shrink-0" />
                    <span className="truncate">{fieldSuccess}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {normalizedModalidad === 'Presencial' && (
          <div className="mt-6">
            <label htmlFor="lugarEncuentro" className="mb-1 inline-flex items-center gap-2 text-[19px] font-semibold text-slate-700">
              <FiMapPin size={16} className="text-slate-500" />
              Lugar de encuentro <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-[15px] text-slate-500">Describe un punto claro para reunirse</p>
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
              className="w-full resize-none rounded-xl border border-[#b9c6d8] bg-white px-4 py-3 text-[16px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary"
            />
            <div className="mt-2 flex min-h-5 items-center gap-2">
              <div className="min-w-0 flex-1">
                {fieldError && (
                  <p className="truncate text-[14px] font-medium text-red-600" aria-live="polite">
                    {fieldError}
                  </p>
                )}
                {!fieldError && fieldSuccess && (
                  <div className="inline-flex items-center gap-1 truncate text-[14px] font-medium text-green-700" aria-live="polite">
                    <FiCheck size={14} className="flex-shrink-0" />
                    <span className="truncate">{fieldSuccess}</span>
                  </div>
                )}
                {!fieldError && !fieldSuccess && (
                  <p className="truncate text-[14px] font-medium text-slate-400" aria-live="polite">
                    Minimo 10 caracteres
                  </p>
                )}
              </div>
              <p className={`ml-auto text-right text-[14px] ${lugarEncuentro.length === 100 ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
                {lugarEncuentro.length}/100
              </p>
            </div>
          </div>
        )}

        {!state.success && state.message && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[14px] text-red-700">
            {state.message}
          </div>
        )}

        <div className="mt-7 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="h-[48px] rounded-xl px-6 text-[16px] font-semibold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="inline-flex h-[48px] items-center gap-2 rounded-xl bg-primary px-7 text-[16px] font-semibold text-white transition-colors hover:bg-primary/90"
            data-submitting={isSubmitting ? 'true' : 'false'}
          >
            <>
              <FiCheck size={16} />
              Confirmar
            </>
          </button>
        </div>
      </form>
    </div>
  );
}
