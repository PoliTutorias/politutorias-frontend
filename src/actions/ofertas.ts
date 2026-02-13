'use server';

import { getOfertaSeeds } from '@/seed/OfertaSeedData';
import { ApiResponse } from '@/interfaces/api/ApiResponse';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';

/**
 * Obtiene el listado de ofertas de tutoría de un tutor específico
 * @returns ApiResponse con un array de OfertaDto
 */
export async function getTutorOffersAction(): Promise<ApiResponse<OfertaDto[]>> {
  try {
    // Se retorna el seed de ofertas
    const ofertas = getOfertaSeeds();

    return {
      statusCode: 200,
      data: ofertas,
    };

    /*
     * CÓDIGO COMENTADO PARA INTEGRACIÓN CON BACKEND REAL
     * Descomenta esto cuando el backend esté listo
     *
    const tutorId = 'tutor-001'; // Este tutorId debería venir del contexto de sesión o token
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

    try {
      const response = await fetch(`${baseUrl}/tutor/${tutorId}/ofertas`, {
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
      return data as ApiResponse<OfertaDto[]>;
    } catch (error) {
      console.error('Error fetching ofertas:', error);
      return {
        statusCode: 500,
        message: 'Error interno del servidor al obtener ofertas.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
    */
  } catch (error) {
    console.error('Error en getTutorOffersAction:', error);
    return {
      statusCode: 500,
      message: 'Error interno del servidor al obtener ofertas.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
