'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Clock3, MapPin, MessageSquare, Monitor, UserRound, X } from 'lucide-react';
import { getTutorialDetailAction } from '@/actions/tutorials/getTutorialDetailAction';
import { TutorialDetailDto } from '@/interfaces/tutorial/tutorial';

interface TutorialDetailModalProps {
  readonly tutorialId: string | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function TutorialDetailModal({ tutorialId, isOpen, onClose }: TutorialDetailModalProps) {
  const [detail, setDetail] = useState<TutorialDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
        const result = await getTutorialDetailAction(tutorialId);

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
      <div className="w-full max-w-[380px] rounded-2xl bg-white shadow-[0_18px_60px_rgba(15,23,42,0.24)] md:max-w-[760px]">
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
                  <MapPin size={12} />
                  LUGAR
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
            </>
          )}
        </div>

        <footer className="flex items-center justify-end border-t border-[#e8edf4] px-5 py-3">
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
