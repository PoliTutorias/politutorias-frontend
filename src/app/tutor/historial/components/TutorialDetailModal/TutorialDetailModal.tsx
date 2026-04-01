'use client';

import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, Clock3, Link2, MapPin, MessageSquare, Monitor, Star, UserRound, X, XCircle } from 'lucide-react';
import { getDetalleTutoriaAction } from '@/actions/tutorials/getDetalleTutoriaAction';
import { TutorialDetailDto, TutorialEstado } from '@/interfaces/tutorial/tutorial';

interface TutorialDetailModalProps {
  readonly tutorialId: string | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onComplete: (id: string) => Promise<void>;
  readonly onReportInasistencia?: (id: string) => void;
  readonly overrideEstado?: TutorialEstado;
}

export function TutorialDetailModal({ tutorialId, isOpen, onClose, onComplete, onReportInasistencia, overrideEstado }: TutorialDetailModalProps) {
  const [detail, setDetail] = useState<TutorialDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !tutorialId) {
      setDetail(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const loadDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getDetalleTutoriaAction(tutorialId);

        if (!mounted) {
          return;
        }

        if (!result) {
          setError('No se encontro el detalle de la tutoria seleccionada.');
          return;
        }

        setDetail(result);
      } catch {
        if (mounted) {
          setError('No fue posible cargar el detalle de la tutoria.');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();

    return () => {
      mounted = false;
    };
  }, [isOpen, tutorialId]);

  if (!isOpen) {
    return null;
  }

  const currentEstado = overrideEstado ?? detail?.estado;
  const isCompletada = currentEstado === 'Completada';
  const isInasistencia = currentEstado === 'Inasistencia';
  const showActionButtons = currentEstado === 'SIN_CONFIRMAR';
  const ratingValue = detail?.studentRating ?? 0;
  const fullStars = Math.round(ratingValue);

  return (
    <dialog
      open
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-[rgba(15,23,42,0.36)] px-4"
    >
      <div className="w-full max-w-84 rounded-2xl bg-white shadow-[0_18px_60px_rgba(15,23,42,0.24)] md:max-w-140">
        <header className="flex items-center justify-between border-b border-[#e8edf4] px-5 py-4">
          <h2 className="text-[18px] font-bold text-[#1f2b3d]">Detalle de la Tutoria</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="rounded p-1 text-[#5f6f83] transition-colors hover:bg-[#eef3f8]"
          >
            <X size={18} />
          </button>
        </header>

        <div className="space-y-3 px-5 py-4">
          {isLoading && (
            <p className="rounded-lg bg-[#f4f8fc] px-3 py-2 text-[12px] text-[#667c98]">Cargando detalle...</p>
          )}

          {error && (
            <p className="rounded-lg border border-[#f2c6c6] bg-[#fff2f2] px-3 py-2 text-[12px] text-[#9f3a3a]">{error}</p>
          )}

          {detail && (
            <>
              <section className="rounded-lg bg-[#f1f5f9] px-3 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#152c53] text-[16px] font-semibold text-white">
                    {detail.studentInitials}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1f2b3d]">{detail.studentName}</p>
                    <p className="text-[12px] text-[#6f8199]">Estudiante</p>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-[#e4e9f0] px-3 py-3">
                <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#1f2b3d]">
                  <BookOpen size={14} className="text-[#e4a63f]" />
                  <span>{detail.offerTitle}</span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 text-[13px] text-[#5f738f] md:grid-cols-2">
                  <p className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} />
                    {detail.date}
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} />
                    {detail.time}
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    {detail.modality === 'Virtual' ? <Monitor size={13} /> : <UserRound size={13} />}
                    {detail.modality}
                  </p>
                  <p className="font-semibold text-[#1f2b3d]">${detail.price}/{detail.currency === 'USD' ? 'h' : detail.currency}</p>
                </div>
              </section>

              <section className="rounded-lg border border-[#e4e9f0] px-3 py-3">
                <p className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1f2b3d]">
                  {detail.modality === 'Virtual' ? <Link2 size={12} /> : <MapPin size={12} />}
                  {detail.modality === 'Virtual' ? 'ENLACE' : 'LUGAR'}
                </p>
                <p className="mt-1 text-[13px] text-[#4f637f]">{detail.locationOrLink}</p>
              </section>

              <section className="rounded-lg border border-[#e4e9f0] border-l-[3px] border-l-[#efb047] bg-[#f9fbff] px-3 py-3">
                <p className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1f2b3d]">
                  <MessageSquare size={12} />
                  MENSAJE DEL ESTUDIANTE
                </p>
                <p className="mt-1 text-[13px] text-[#4f637f]">{detail.message}</p>
              </section>

              {isCompletada && detail.studentRating != null && detail.studentComment != null && (
                <section className="rounded-lg border border-[#e4e9f0] bg-[#f9fbff] px-3 py-3">
                  <p className="text-[12px] font-bold text-[#1f2b3d]">CALIFICACION DEL ESTUDIANTE</p>
                  <div className="mt-1 flex items-center gap-1 text-[#ce9a2f]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`star-${index + 1}`} size={16} fill={index < fullStars ? 'currentColor' : 'none'} />
                    ))}
                    <span className="ml-1 text-[12px] font-semibold text-[#4f637f]">{detail.studentRating.toFixed(1)}/5</span>
                  </div>
                  <p className="mt-2 text-[13px] text-[#4f637f]">{detail.studentComment}</p>
                </section>
              )}

              {isCompletada && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[14px] font-medium text-[#5f738f]">Estado:</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#86d9a4] bg-[#e8f8ee] px-3 py-1 text-[13px] font-medium text-[#2f8f56]">
                    <CheckCircle2 size={14} />
                    Completada
                  </span>
                </div>
              )}

              {isInasistencia && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[14px] font-medium text-[#5f738f]">Estado:</span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#86d9a4] bg-[#e8f8ee] px-3 py-1 text-[13px] font-medium text-[#2f8f56]">
                    <CheckCircle2 size={14} />
                    Completada
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-[#e8edf4] px-5 py-3">
          {detail && showActionButtons && (
            <>
              <button
                type="button"
                disabled={isCompleting}
                onClick={async () => {
                  setIsCompleting(true);
                  try {
                    await onComplete(detail.id);
                    onClose();
                  } finally {
                    setIsCompleting(false);
                  }
                }}
                className="inline-flex items-center rounded-[7px] border border-[#4cbf78] px-3 py-1 text-[13px] font-semibold text-[#1d9954] transition-colors hover:bg-[#2fa964] hover:text-white"
                >
                  <span className="flex items-center justify-center gap-1">
                  <CheckCircle2 size={14} />
                  Completada
                  </span>
              </button>
              <button
                type="button"
                onClick={() => onReportInasistencia?.(detail.id)}
                className="inline-flex items-center rounded-[7px] border border-[#e53935] px-3 py-1 text-[13px] font-semibold text-[#e53935] transition-colors hover:bg-[#fef2f2]"
              >
                <span className="flex items-center justify-center gap-1">
                  <XCircle size={14} />
                  Inasistencia
                </span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-[15px] font-semibold text-[#4f637f] transition-colors hover:text-[#1f2b3d]"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </dialog>
  );
}
