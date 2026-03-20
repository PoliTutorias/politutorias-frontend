import { z } from 'zod';

export const rejectionReasonEnum = z.enum([
  'Imprevisto personal',
  'Conflicto de horarios con otra tutoría',
  'Enfermedad',
  'Otro',
]);

export const rechazarSolicitudSchema = z
  .object({
    reason: rejectionReasonEnum,
    comment: z
      .string()
      .max(300, 'El comentario no puede exceder los 300 caracteres.')
      .optional()
      .or(z.literal('')),
  })
  .superRefine((value, ctx) => {
    if (value.reason !== 'Otro' && value.comment && value.comment.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['comment'],
        message: 'El comentario solo aplica cuando seleccionas "Otro".',
      });
    }
  });

export type RechazarSolicitudFormValues = z.infer<typeof rechazarSolicitudSchema>;
