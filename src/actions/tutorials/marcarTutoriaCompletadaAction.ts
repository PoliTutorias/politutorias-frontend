'use server';

import { revalidatePath } from 'next/cache';
import { getServerToken } from '@/lib/server-auth';
import { TutoriaEntity } from '@/interfaces/tutoria-tipo/TutoriaEntity';

type BackendPatchResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
    updatedAt: string;
  };
};

type MarcarTutoriaCompletadaResponse = {
  success: boolean;
  data?: TutoriaEntity;
  error?: string;
};

export async function marcarTutoriaCompletadaAction(tutoriaId: string): Promise<MarcarTutoriaCompletadaResponse> {
  if (!tutoriaId.trim()) {
    return { success: false, error: 'Id de tutoria invalido.' };
  }

  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = await getServerToken();

  if (!backendBaseUrl || !token) {
    return { success: false, error: 'No se pudo completar la tutoria.' };
  }

  try {
    const normalizedBase = backendBaseUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBase}/tutorias/${tutoriaId}/completar`;

    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
      return { success: false, error: errorPayload?.message || `Error HTTP ${response.status}` };
    }

    const payload = (await response.json()) as BackendPatchResponse;
    const normalizedStatus = (payload.data?.status || '').toLowerCase();

    const data: TutoriaEntity = {
      id: payload.data?.id || tutoriaId,
      estado: normalizedStatus === 'completed' || normalizedStatus === 'completada' ? 'COMPLETADA' : 'SIN_CONFIRMAR',
    };

    revalidatePath('/tutor/historial');

    return { success: true, data };
  } catch {
    return { success: false, error: 'No se pudo completar la tutoria.' };
  }
}
