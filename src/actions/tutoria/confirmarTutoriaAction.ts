'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { tutoriasSeedData } from '@/lib/seeds/tutorias';

const confirmarVirtualSchema = z.object({
  enlaceReunion: z
    .string()
    .trim()
    .min(1, { message: 'El enlace de reunión es obligatorio.' })
    .regex(/^https?:\/\/.+$/, 'Ingresa una URL válida (debe comenzar con https:// o http://).'),
});

const confirmarPresencialSchema = z.object({
  lugarEncuentro: z
    .string()
    .trim()
    .min(1, { message: 'El lugar de encuentro es obligatorio.' })
    .min(10, { message: 'Mínimo 10 caracteres para el lugar.' })
    .max(100, { message: 'Máximo 100 caracteres para el lugar.' }),
});

export interface ConfirmarTutoriaActionState {
  success: boolean;
  message?: string;
  errors?: {
    enlaceReunion?: string[];
    lugarEncuentro?: string[];
  };
}

export const initialConfirmarTutoriaActionState: ConfirmarTutoriaActionState = {
  success: false,
};

export async function confirmarTutoriaAction(
  _previousState: ConfirmarTutoriaActionState,
  formData: FormData
): Promise<ConfirmarTutoriaActionState> {
  const tutoriaId = String(formData.get('tutoriaId') ?? '').trim();
  const modalidad = String(formData.get('modalidad') ?? '').trim();
  const enlaceReunion = String(formData.get('enlaceReunion') ?? '');
  const lugarEncuentro = String(formData.get('lugarEncuentro') ?? '');

  try {
    if (!tutoriaId) {
      return {
        success: false,
        message: 'No se pudo identificar la tutoría a confirmar.',
      };
    }

    if (modalidad !== 'Virtual' && modalidad !== 'Presencial') {
      return {
        success: false,
        message: 'Modalidad inválida para confirmar la tutoría.',
      };
    }

    const validatedVirtualData = modalidad === 'Virtual'
      ? confirmarVirtualSchema.parse({ enlaceReunion })
      : undefined;
    const validatedPresencialData = modalidad === 'Presencial'
      ? confirmarPresencialSchema.parse({ lugarEncuentro })
      : undefined;

    await new Promise((resolve) => setTimeout(resolve, 700));

    const target = tutoriasSeedData.find((item) => item.id === tutoriaId);

    if (target) {
      target.estado = 'aceptada';
      target.updatedAt = new Date().toISOString();

      if (modalidad === 'Virtual') {
        target.enlaceReunion = validatedVirtualData?.enlaceReunion;
        target.lugarEncuentro = undefined;
      } else {
        target.lugarEncuentro = validatedPresencialData?.lugarEncuentro;
        target.enlaceReunion = undefined;
      }
    }

    // Integracion backend real (T9): dejar comentado en esta etapa
    // const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    // const token = process.env.TEMPORARY_TOKEN;
    // const response = await fetch(`${apiUrl}/tutorias/${tutoriaId}/confirmar`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     tutoriaId,
    //     modalidad,
    //     ...(validatedVirtualData ?? validatedPresencialData),
    //   }),
    // });
    //
    // if (!response.ok) {
    //   return { success: false, message: 'Error al confirmar la tutoría.' };
    // }

    revalidatePath('/bandeja');
    revalidatePath('/tutor/inbox');

    return {
      success: true,
      message: 'Tutoría confirmada exitosamente (SEED).',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      message: 'Error al confirmar la tutoría.',
    };
  }
}
