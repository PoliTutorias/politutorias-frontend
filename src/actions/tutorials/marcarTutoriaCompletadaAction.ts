'use server';

import { revalidatePath } from 'next/cache';
import { getUpdatedTutoriaSeed } from '@/seed/TutoriasSeedData';
import { TutoriaEntity } from '@/interfaces/tutoria-tipo/TutoriaEntity';

type MarcarTutoriaCompletadaResponse = {
  success: boolean;
  data?: TutoriaEntity;
  error?: string;
};

export async function marcarTutoriaCompletadaAction(tutoriaId: string): Promise<MarcarTutoriaCompletadaResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data = getUpdatedTutoriaSeed(tutoriaId);

  if (!data) {
    return { success: false, error: 'No se encontro la tutoria seleccionada.' };
  }

  revalidatePath('/tutor/historial');

  return { success: true, data };

  // const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  // const token = await getServerToken();
  //
  // if (!backendBaseUrl || !token) {
  //   return { success: false, error: 'No se pudo completar la tutoria.' };
  // }
  //
  // try {
  //   const normalizedBase = backendBaseUrl.replace(/\/+$/, '');
  //   const endpoint = `${normalizedBase}/tutorias/${tutoriaId}/completar`;
  //
  //   const response = await fetch(endpoint, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error(`Error HTTP ${response.status}`);
  //   }
  //
  //   const payload = (await response.json()) as TutoriaEntity;
  //   revalidatePath('/tutor/historial');
  //
  //   return { success: true, data: payload };
  // } catch {
  //   return { success: false, error: 'No se pudo completar la tutoria.' };
  // }
}
