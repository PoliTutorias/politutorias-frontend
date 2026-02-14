'use server';

import { ApiResponse } from '@/interfaces/api/ApiResponse';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';

// ID del tutor - Constante configurada inicialmente
const TUTOR_ID = '550e8400-e29b-41d4-a716-446655440000';

/**
 * Obtiene el listado de ofertas de tutoría de un tutor específico
 * @returns ApiResponse con un array de OfertaDto
 */
export async function getTutorOffersAction(): Promise<ApiResponse<OfertaDto[]>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';

    const response = await fetch(`${baseUrl}tutor/${TUTOR_ID}/ofertas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`, // Si requiere autenticación
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
    return {
      statusCode: 500,
      message: 'Error interno del servidor al obtener ofertas.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
