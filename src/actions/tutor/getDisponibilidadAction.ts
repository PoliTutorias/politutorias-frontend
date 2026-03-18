'use server';

import { cookies } from 'next/headers';
import { AvailabilityBlock } from '@/interfaces/tutor/AvailabilityBlock';
import { getServerToken } from '@/lib/server-auth';

interface GetDisponibilidadResponse {
  blocks: AvailabilityBlock[];
}

/**
 * Server Action para consultar la disponibilidad del tutor (HU07)
 * @returns Bloques de disponibilidad o error
 */
export async function getDisponibilidadAction(): Promise<
  GetDisponibilidadResponse | { error: string }
> {
  try {
    const token = await getServerToken();

    if (!token) {
      return { error: 'Token de autenticación no encontrado. Inicia sesión.' };
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
    const endpoint = `${backendUrl}disponibilidad`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const result = await response.json();
      return {
        error: result.message || 'Error al consultar la disponibilidad',
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error en getDisponibilidadAction:', error);
    return {
      error: 'Error al consultar la disponibilidad. Intenta nuevamente.',
    };
  }
}
