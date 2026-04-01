'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { fetchDetalleAction } from '@/actions/historial/tutoriaActions';
import type { TutoriaDetalleDTO } from '@/interfaces/historial/HistorialTypes';

interface ModalDetalleTutoriaProps {
  readonly tutoriaId: string | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ModalDetalleTutoria({ tutoriaId, isOpen, onClose }: ModalDetalleTutoriaProps) {
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
        <div className="px-6 py-5">
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
        </div>
      </div>
    </dialog>
  );
}
