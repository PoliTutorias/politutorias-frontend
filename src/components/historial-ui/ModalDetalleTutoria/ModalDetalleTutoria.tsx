'use client';

import { useEffect, useState } from 'react';
import { FiX, FiBookOpen, FiCalendar, FiClock, FiMonitor, FiMessageSquare } from 'react-icons/fi';
import { CheckCircle2, XCircle } from 'lucide-react';
import { fetchDetalleAction } from '@/actions/historial/tutoriaActions';
import { SeccionTuResena } from '@/components/tutorias/SeccionTuResena/SeccionTuResena';
import type { TutoriaDetalleDTO } from '@/interfaces/historial/HistorialTypes';

interface ModalDetalleTutoriaProps {
  readonly tutoriaId: string | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onCalificar?: (tutoriaId: string) => void;
}

function formatDate(fecha: string): string {
  // Si el backend ya envía la fecha formateada (ej. "15 de abril, 2026"), usarla directamente
  if (/^\d{1,2}\s+de\s+/i.test(fecha)) {
    return fecha;
  }
  // Fallback para fechas ISO (ej. "2026-04-15")
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return fecha;
  const day = date.getUTCDate();
  const month = date.toLocaleDateString('es-EC', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} de ${month} de ${year}`;
}

export function ModalDetalleTutoria({
  tutoriaId,
  isOpen,
  onClose,
  onCalificar,
}: ModalDetalleTutoriaProps) {
  const [tutoriaDetalle, setTutoriaDetalle] = useState<TutoriaDetalleDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !tutoriaId) {
      setTutoriaDetalle(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadDetail = async () => {
      setIsLoading(true);
      try {
        const result = await fetchDetalleAction(tutoriaId);
        if (!isMounted) return;
        if (result.success && result.data) {
          setTutoriaDetalle(result.data);
        }
      } catch {
        if (isMounted) {
          setTutoriaDetalle(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();

    return () => {
      isMounted = false;
    };
  }, [isOpen, tutoriaId]);

  const hasReview = !!tutoriaDetalle?.resena;
  const isCompletada = tutoriaDetalle?.estado === 'COMPLETADA';
  const canCalificar = isCompletada && !hasReview;

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

        {/* Content */}
        <div className="space-y-3 px-6 py-5">
          {isLoading && (
            <div className="rounded-xl border border-[#e6ecf3] bg-[#f8fbff] px-4 py-3 text-sm text-[#5f6f83]">
              Cargando detalles de la tutoría...
            </div>
          )}

          {!isLoading && !tutoriaDetalle && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              No se encontraron detalles para esta tutoría.
            </div>
          )}

          {!isLoading && tutoriaDetalle && (
            <>
              {/* Tutor info */}
              <section className="rounded-xl bg-[#edf2f7] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#152c53] text-base font-semibold text-white">
                    {(tutoriaDetalle.tutor.nombre[0] ?? '').toUpperCase()}
                    {(tutoriaDetalle.tutor.apellido[0] ?? '').toUpperCase()}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-primary">
                      {tutoriaDetalle.tutor.nombre} {tutoriaDetalle.tutor.apellido}
                    </p>
                    <p className="text-sm text-[#7890a8]">Tutor</p>
                  </div>
                </div>
              </section>

              {/* Materia, fecha, hora, modalidad, precio */}
              <section className="rounded-xl border border-[#e6ecf3] bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                  <FiBookOpen size={14} className="text-[#f0aa31]" />
                  <span>{tutoriaDetalle.materia}</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#536b86]">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar size={14} className="text-[#7c8ea5]" />
                    {formatDate(tutoriaDetalle.fecha)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock size={14} className="text-[#7c8ea5]" />
                    {tutoriaDetalle.hora}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 text-[#536b86]">
                    <FiMonitor size={14} className="text-[#7c8ea5]" />
                    {tutoriaDetalle.modalidad}
                  </span>
                  <span className="font-bold text-primary">${tutoriaDetalle.precioPorHora}/h</span>
                </div>
              </section>

              {/* Información de reunión */}
              <section className="rounded-xl border border-[#e6ecf3] border-l-2 border-l-[#f0aa31] bg-[#f9fbff] p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                  <span>INFORMACIÓN DE REUNIÓN</span>
                </div>
                {tutoriaDetalle.modalidad === 'Virtual' && tutoriaDetalle.enlaceReunion ? (
                  <a
                    href={tutoriaDetalle.enlaceReunion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block break-all text-sm text-[#2f6cc9] underline decoration-transparent transition-colors hover:decoration-[#2f6cc9]"
                  >
                    {tutoriaDetalle.enlaceReunion}
                  </a>
                ) : tutoriaDetalle.modalidad === 'Presencial' && tutoriaDetalle.ubicacion ? (
                  <p className="mt-2 text-sm text-[#4f5f73]">{tutoriaDetalle.ubicacion}</p>
                ) : (
                  <p className="mt-2 text-sm italic text-[#9fadbf]">
                    No se registró enlace ni lugar para esta sesión.
                  </p>
                )}
              </section>

              {/* Mensaje del estudiante */}
              {tutoriaDetalle.mensajeEstudiante && (
                <section className="rounded-xl border border-[#e6ecf3] border-l-2 border-l-[#f0aa31] bg-[#f9fbff] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                    <FiMessageSquare size={13} />
                    <span>TU MENSAJE</span>
                  </div>
                  <p className="mt-2 text-sm italic text-[#4f5f73]">
                    &ldquo;{tutoriaDetalle.mensajeEstudiante}&rdquo;
                  </p>
                </section>
              )}

              {/* Etiqueta de estado */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm font-semibold text-primary">Estado:</span>
                {tutoriaDetalle.estado === 'COMPLETADA' ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#43a047] bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#43a047]">
                    <CheckCircle2 size={14} />
                    Completada
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#e53935] bg-[#fef2f2] px-3 py-1 text-xs font-semibold text-[#e53935] transition-colors hover:bg-[#fee2e2]">
                    <XCircle size={14} />
                    Inasistencia
                  </span>
                )}
              </div>

              {/* Tu Reseña section if review exists */}
              {hasReview && tutoriaDetalle.resena && (
                <SeccionTuResena
                  rating={tutoriaDetalle.resena.calificacion}
                  comment={tutoriaDetalle.resena.comentario}
                />
              )}
            </>
          )}
        </div>

        {/* Footer con botones */}
        {!isLoading && tutoriaDetalle && (
          <footer className="flex justify-between gap-3 border-t border-[#eef2f7] px-6 py-4">
            {canCalificar && onCalificar && (
              <button
                type="button"
                onClick={() => onCalificar(tutoriaId)}
                className="rounded-lg bg-[#152c53] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1f36]"
              >
                Calificar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className={`rounded-lg px-6 py-2 text-sm font-semibold transition-colors ${
                canCalificar
                  ? 'text-[#64748b] hover:bg-slate-100'
                  : 'float-right text-[#64748b] hover:bg-slate-100'
              }`}
            >
              Cerrar
            </button>
          </footer>
        )}
      </div>
    </dialog>
  );
}
                </div>
              </section>

              {/* Información de reunión */}
              <section className="rounded-xl border border-[#e6ecf3] border-l-2 border-l-[#f0aa31] bg-[#f9fbff] p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                  <span>INFORMACIÓN DE REUNIÓN</span>
                </div>
                {tutoriaDetalle.modalidad === 'Virtual' && tutoriaDetalle.enlaceReunion ? (
                  <a
                    href={tutoriaDetalle.enlaceReunion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block break-all text-sm text-[#2f6cc9] underline decoration-transparent transition-colors hover:decoration-[#2f6cc9]"
                  >
                    {tutoriaDetalle.enlaceReunion}
                  </a>
                ) : tutoriaDetalle.modalidad === 'Presencial' && tutoriaDetalle.ubicacion ? (
                  <p className="mt-2 text-sm text-[#4f5f73]">{tutoriaDetalle.ubicacion}</p>
                ) : (
                  <p className="mt-2 text-sm italic text-[#9fadbf]">
                    No se registró enlace ni lugar para esta sesión.
                  </p>
                )}
              </section>

              {/* Mensaje del estudiante */}
              {tutoriaDetalle.mensajeEstudiante && (
                <section className="rounded-xl border border-[#e6ecf3] border-l-2 border-l-[#f0aa31] bg-[#f9fbff] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                    <FiMessageSquare size={13} />
                    <span>TU MENSAJE</span>
                  </div>
                  <p className="mt-2 text-sm italic text-[#4f5f73]">
                    &ldquo;{tutoriaDetalle.mensajeEstudiante}&rdquo;
                  </p>
                </section>
              )}

              {/* Etiqueta de estado */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm font-semibold text-primary">Estado:</span>
                {tutoriaDetalle.estado === 'COMPLETADA' ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#43a047] bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#43a047]">
                    <CheckCircle2 size={14} />
                    Completada
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#e53935] bg-[#fef2f2] px-3 py-1 text-xs font-semibold text-[#e53935] transition-colors hover:bg-[#fee2e2]">
                    <XCircle size={14} />
                    Inasistencia
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer con botón Cerrar */}
        {!isLoading && tutoriaDetalle && (
          <footer className="flex justify-end border-t border-[#eef2f7] px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-6 py-2 text-sm font-semibold text-[#64748b] transition-colors hover:bg-slate-100"
            >
              Cerrar
            </button>
          </footer>
        )}
      </div>
    </dialog>
  );
}
