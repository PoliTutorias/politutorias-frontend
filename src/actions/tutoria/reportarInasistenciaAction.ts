'use server';

import { revalidatePath } from 'next/cache';
import { getServerToken } from '@/lib/server-auth';

export interface ReportarInasistenciaResult {
  success: boolean;
  message: string;
}

export async function reportarInasistenciaAction(
  tutoriaId: string
): Promise<ReportarInasistenciaResult> {
  if (!tutoriaId) {
    return {
      success: false,
      message: 'No se pudo identificar la tutoría a reportar.',
    };
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const token = await getServerToken();

    if (!apiUrl || !token) {
      return {
        success: false,
        message: 'No se pudo autenticar con el servidor.',
      };
    }

    const normalizedBase = apiUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBase}/tutorias/${encodeURIComponent(tutoriaId)}/inasistencia`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const errorMessage =
        errorBody?.message ?? `Error HTTP ${response.status}`;
      return {
        success: false,
        message: errorMessage,
      };
    }

    revalidatePath('/tutor/historial');

    return {
      success: true,
      message: 'Inasistencia del estudiante registrada con éxito.',
    };
  } catch {
    return {
      success: false,
      message: 'Error interno del servidor. Intenta nuevamente.',
    };
  }
}
