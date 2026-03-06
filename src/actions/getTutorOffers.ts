'use server';

import { ApiResponse } from '@/interfaces/api/ApiResponse';
import { OfertaDto } from '@/interfaces/oferta/OfertaDto';
import { cookies } from 'next/headers';

/**
 * Obtiene el listado de ofertas de tutoría de un tutor específico
 * Usa el tutorId guardado en cookies durante el registro (HU34)
 * @returns ApiResponse con un array de OfertaDto
 */
export async function getTutorOffersAction(): Promise<ApiResponse<OfertaDto[]>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
    const cookieStore = await cookies();
    
    // Obtener tutorId de las cookies (guardado en HU34)
    const tutorIdFromCookie = cookieStore.get('tutor-id')?.value;
    
    // Usar tutorId de cookies, fallback a NEXT_PUBLIC_TUTOR_ID
    const TUTOR_ID = tutorIdFromCookie || process.env.NEXT_PUBLIC_TUTOR_ID || '550e8400-e29b-41d4-a716-446655440000';

    console.log('Obteniendo ofertas para tutorId:', TUTOR_ID);
    console.log('Fuente de tutorId:', tutorIdFromCookie ? 'Cookies (HU34)' : 'NEXT_PUBLIC_TUTOR_ID');

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
    throw error;
  }
}
