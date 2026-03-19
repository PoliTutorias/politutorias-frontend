'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getServerToken } from '@/lib/server-auth';

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

function normalizeModalidad(rawModalidad: string): 'Virtual' | 'Presencial' | null {
  const normalized = rawModalidad.trim().toLowerCase();

  if (normalized === 'virtual') {
    return 'Virtual';
  }

  if (normalized === 'presencial') {
    return 'Presencial';
  }

  return null;
}

export async function confirmarTutoriaAction(
  _previousState: ConfirmarTutoriaActionState,
  formData: FormData
): Promise<ConfirmarTutoriaActionState> {
  const tutoriaId = String(formData.get('tutoriaId') ?? '').trim();
  const rawModalidad = String(formData.get('modalidad') ?? '').trim();
  const modalidad = normalizeModalidad(rawModalidad);
  const enlaceReunion = String(formData.get('enlaceReunion') ?? '');
  const lugarEncuentro = String(formData.get('lugarEncuentro') ?? '');

  try {
    if (!tutoriaId) {
      return {
        success: false,
        message: 'No se pudo identificar la tutoría a confirmar.',
      };
    }

    if (!modalidad) {
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

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const token = await getServerToken();

    if (!apiUrl || !token) {
      return {
        success: false,
        message: 'Error de configuración: no se puede conectar al backend.',
      };
    }

    const response = await fetch(`${apiUrl}solicitudes/${tutoriaId}/confirm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        modalidad,
        acceptedMeetingLink: modalidad === 'Virtual' ? validatedVirtualData?.enlaceReunion : undefined,
        acceptedMeetingLocation: modalidad === 'Presencial' ? validatedPresencialData?.lugarEncuentro : undefined,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Error al confirmar la tutoría.';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || `Error ${response.status}: ${response.statusText}`;
      } catch {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      
      console.error('[confirmarTutoriaAction] Error response:', { status: response.status, message: errorMessage });
      return { success: false, message: errorMessage };
    }

    revalidatePath('/bandeja');
    revalidatePath('/tutor/inbox');

    return {
      success: true,
      message: 'Tutoría confirmada exitosamente.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }

    console.error('[confirmarTutoriaAction] Exception:', error);

    return {
      success: false,
      message: 'Error al confirmar la tutoría.',
    };
  }
}
