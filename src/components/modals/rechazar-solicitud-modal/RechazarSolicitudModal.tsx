'use client';

import { useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { rechazarSolicitudAction } from '@/actions/solicitudes/rechazarSolicitudAction';
import {
  RechazarSolicitudFormValues,
  rechazarSolicitudSchema,
  rejectionReasonEnum,
} from '@/lib/validations/rechazar-solicitud.schema';

interface RechazarSolicitudModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitudId: string;
  onRejected?: (solicitudId: string) => void;
}

const rejectionReasons = rejectionReasonEnum.options;

export function RechazarSolicitudModal({
  isOpen,
  onClose,
  solicitudId,
  onRejected,
}: RechazarSolicitudModalProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<RechazarSolicitudFormValues>({
    resolver: zodResolver(rechazarSolicitudSchema),
    mode: 'onChange',
    defaultValues: {
      comment: '',
    },
  });

  const selectedReason = watch('reason');
  const commentValue = watch('comment') ?? '';
  watch('comment');

  const isOtherSelected = selectedReason === 'Otro';

  const onFormSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const response = await rechazarSolicitudAction({
        solicitudId,
        reason: values.reason,
        comment: values.comment,
      });

      if (response.success) {
        onRejected?.(solicitudId);
        reset({ comment: '' });
        onClose();
        return;
      }

      console.error('Error al rechazar solicitud:', response.message);
    });
  });

  useEffect(() => {
    if (isOtherSelected) {
      return;
    }

    setValue('comment', '', { shouldValidate: true });
  }, [isOtherSelected, setValue]);

  const handleClose = () => {
    reset({ comment: '' });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-[2px]">
      <form
        onSubmit={onFormSubmit}
        className="w-full max-w-[560px] rounded-2xl border border-slate-200 bg-[#f7f7f8] px-6 pb-6 pt-5 shadow-[0_18px_44px_rgba(15,23,42,0.23)]"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[39px] font-bold leading-tight text-[#1f2937] sm:text-[31px]">Rechazar Solicitud</h2>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1f2937] transition-colors hover:bg-slate-200"
            aria-label="Cerrar modal"
          >
            <FiX size={28} />
          </button>
        </div>

        <div className="rounded-xl border border-slate-300 bg-[#f3f4f6] p-4">
          <p className="text-[17px] font-semibold text-[#243349]">Notificación al estudiante</p>
          <p className="mt-2 text-[15px] leading-snug text-slate-600">
            El estudiante será notificado del rechazo. Selecciona un motivo para ayudarle a entender la situación.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-[19px] font-semibold text-[#334155]">Motivo del rechazo</h3>
          <div className="mt-3 space-y-3">
            {rejectionReasons.map((reason) => (
              <label key={reason} className="flex cursor-pointer items-center gap-3 text-[16px] text-slate-700">
                <input
                  type="radio"
                  value={reason}
                  {...register('reason')}
                  className="h-[19px] w-[19px] accent-[#3b82c4]"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
          {errors.reason && <p className="mt-2 text-sm text-red-600">Selecciona un motivo de rechazo.</p>}
        </div>

        {isOtherSelected && (
          <div className="mt-5">
            <label htmlFor={`rechazo-comment-${solicitudId}`} className="text-[16px] font-semibold text-[#334155]">
              Comentario adicional (opcional)
            </label>
            <textarea
              id={`rechazo-comment-${solicitudId}`}
              {...register('comment')}
              maxLength={300}
              rows={4}
              placeholder="Explica brevemente el motivo..."
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-[#f2f5f8] px-4 py-3 text-[15px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400"
            />
            {errors.comment && <p className="mt-2 text-sm text-red-600">{errors.comment.message}</p>}
            <p className="mt-2 text-right text-sm text-slate-400">{commentValue.length}/300</p>
          </div>
        )}

        <div className="mt-3 mb-4">
          <p className="text-xs text-slate-400">Solicitud: {solicitudId}</p>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="h-[48px] rounded-xl px-6 text-[18px] font-semibold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!selectedReason || !isValid || isPending}
            className="h-[50px] rounded-xl border border-primary px-7 text-[18px] font-semibold text-primary transition-opacity disabled:text-primary/60"
          >
            {isPending ? 'Procesando...' : 'Confirmar Rechazo'}
          </button>
        </div>
      </form>
    </div>
  );
}
