import { z } from 'zod';

export const createOfertaSchema = z.object({
  title: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(80, 'Máximo 80 caracteres')
    .refine(
      (val) => val.trim().length > 0,
      'Escribe el título de la materia'
    ),
  price: z
    .number()
    .min(5, 'El precio mínimo por hora es de $5')
    .refine((val) => val > 0, 'Ingresa un precio'),
  modality: z
    .enum(['Presencial', 'Virtual', 'Ambos']),
  categories: z
    .array(z.string())
    .min(1, 'Selecciona al menos una categoría')
    .max(5, 'Máximo 5 categorías'),
  description: z
    .string()
    .min(20, 'Mínimo 20 caracteres')
    .max(250, 'Máximo 250 caracteres')
    .refine(
      (val) => val.trim().length > 0,
      'Agrega una descripción'
    ),
});

export type CreateOfertaInput = z.infer<typeof createOfertaSchema>;
