import { z } from 'zod';

export const createOfertaSchema = z.object({
  title: z
    .string()
    .refine(
      (val) => val.trim().length > 0,
      'Escribe el título de la materia'
    )
    .refine(
      (val) => val.trim().length >= 3,
      'Mínimo 3 caracteres'
    )
    .max(80, 'Máximo 80 caracteres'),
  price: z
    .coerce.number({
      message: 'Ingresa un precio',
    })
    .refine((val) => !isNaN(val), 'Ingresa un precio')
    .default(0)
    .refine((val) => val > 0, 'Ingresa un precio')
    .refine((val) => val >= 5, 'El precio mínimo por hora es de $5')
    .refine((val) => val <= 999, 'El precio no puede exceder $999'),
  modality: z
    .enum(['Presencial', 'Virtual', 'Ambos']),
  categories: z
    .array(z.string())
    .min(1, 'Selecciona al menos una categoría')
    .max(5, 'Máximo 5 categorías'),
  description: z
    .string()
    .refine(
      (val) => val.trim().length > 0,
      'Agrega una descripción'
    )
    .refine(
      (val) => val.trim().length >= 20,
      'Mínimo 20 caracteres'
    )
    .max(250, 'Máximo 250 caracteres'),
});

export type CreateOfertaFormValues = z.input<typeof createOfertaSchema>;
export type CreateOfertaInput = z.infer<typeof createOfertaSchema>;