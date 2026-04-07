'use server';

import { ApiResponse } from '@/interfaces/api/ApiResponse';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { getServerToken } from '@/lib/server-auth';

/**
 * Obtiene el listado de ofertas del tutor autenticado.
 * Usa JWT auth — el backend resuelve el tutorId automáticamente.
 * @returns ApiResponse con un array de OfertaDto
 */
export async function getTutorOffersAction(): Promise<ApiResponse<OfertaDto[]>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';

    // Obtener JWT token
    const token = await getServerToken();
    if (!token) {
      return {
        statusCode: 401,
        message: 'No se encontró sesión activa.',
        error: 'Unauthorized',
      };
    }

    const response = await fetch(`${baseUrl}ofertas/mis-ofertas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        message: errorData.message || 'Error al obtener las ofertas',
        error: errorData.error || 'Unknown error',
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      data: data,
    };
  } catch (error) {
    console.error('Error en getTutorOffersAction:', error);
    throw error;
  }
}
