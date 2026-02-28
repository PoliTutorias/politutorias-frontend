import { z } from 'zod';

export const tutorBasicosSchema = z.object({
  nombreCompleto: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(3, 'Mínimo 3 caracteres')
    .max(60, 'Máximo 60 caracteres')
    .regex(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]*$/, 'Solo letras y espacios'),

  numeroWhatsapp: z
    .string()
    .min(1, 'El número de WhatsApp es obligatorio')
    .min(10, 'Ingresa un número válido (10-13 dígitos)')
    .max(13, 'Ingresa un número válido (10-13 dígitos)')
    .regex(/^\d+$/, 'Solo números'),

  facultad: z
    .string()
    .min(1, 'Selecciona tu facultad')
    .refine((value) => value !== '', 'Selecciona tu facultad'),

  semestreActual: z
    .string()
    .min(1, 'Selecciona tu semestre')
    .refine((value) => value !== '', 'Selecciona tu semestre'),

  biografiaCorta: z
    .string()
    .min(1, 'La biografía es obligatoria')
    .min(20, 'Mínimo 20 caracteres')
    .max(300, 'Máximo 300 caracteres'),
});

export type TutorBasicosInput = z.infer<typeof tutorBasicosSchema>;
