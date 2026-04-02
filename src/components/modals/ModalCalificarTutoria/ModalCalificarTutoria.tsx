'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { StarRatingInput } from '@/components/ui/StarRatingInput/StarRatingInput';
import { ComentarioTextArea } from '@/components/ui/ComentarioTextArea/ComentarioTextArea';
import type { ReviewFormData } from '@/interfaces/review-tipo/ReviewFormData';

interface ModalCalificarTutoriaProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (data: ReviewFormData) => Promise<void>;
  readonly tutoriaId: string;
  readonly tutorNombre: string;
  readonly materiaNombre: string;
}

export function ModalCalificarTutoria({
  isOpen,
  onClose,
  onSubmit,
  tutorNombre,
  materiaNombre,
}: ModalCalificarTutoriaProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitEnabled = rating > 0;

  const handleSubmit = async () => {
    if (!isSubmitEnabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        rating,
        comment: comment.trim() || undefined,
      });
      // Reset state on success
      setRating(0);
      setComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-[rgba(15,23,42,0.34)] px-4"
      aria-label="Califica tu tutoría"
      onClick={handleCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-[0_20px_80px_rgba(15,23,42,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#eef2f7] px-6 py-4">
          <h2 className="text-xl font-bold text-primary">Califica tu tutoría</h2>
          <button
            type="button"
            onClick={handleCancel}
            aria-label="Cerrar modal"
            className="rounded-md p-1 text-[#30445f] transition-colors hover:bg-[#eef3f8]"
          >
            <FiX size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="space-y-6 px-6 py-5">
          {/* Question */}
          <div>
            <h3 className="text-base font-semibold text-primary">
              ¿Cómo calificarías tu clase de {materiaNombre} con {tutorNombre}?
            </h3>
          </div>

          {/* Star Rating Input */}
          <div className="flex justify-center">
            <StarRatingInput
              rating={rating}
              onRatingChange={setRating}
              readOnly={false}
            />
          </div>

          {/* Comentario TextArea */}
          <div>
            <label htmlFor="comentario" className="mb-2 block text-sm font-semibold text-primary">
              ¿Qué tal te pareció la clase? (Opcional)
            </label>
            <ComentarioTextArea
              id="comentario"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={300}
              placeholder="Escribe un comentario sobre la metodología, puntualidad, etc."
            />
          </div>
        </div>

        {/* Footer with buttons */}
        <footer className="flex gap-3 border-t border-[#eef2f7] px-6 py-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 rounded-lg border border-[#d9e3ed] bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-[#eef3f8] disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isSubmitEnabled || isSubmitting}
            className={clsx(
              'flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all',
              isSubmitEnabled && !isSubmitting
                ? 'bg-primary hover:bg-[#1a3a52] cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed opacity-60',
            )}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
          </button>
        </footer>
      </div>
    </dialog>
  );
}
