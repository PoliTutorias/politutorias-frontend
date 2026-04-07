'use server';

import { cookies } from 'next/headers';
import { AvailabilityBlock } from '@/interfaces/tutor/AvailabilityBlock';
import { getServerToken } from '@/lib/server-auth';

interface AvailabilityResponse {
  message: string;
  tutorId: string;
}

/**
 * Server Action para guardar la disponibilidad de un tutor
 * @param dto Objeto con tutorId y bloques de disponibilidad
 * @returns Respuesta exitosa o error
 */
export async function guardarDisponibilidadAction(
  blocks: AvailabilityBlock[]
): Promise<AvailabilityResponse | { error: string }> {
  try {
    // Obtener tutorId de las cookies (guardado en HU34)
    const cookieStore = await cookies();
    const tutorId = cookieStore.get('tutor-id')?.value;
    
    const token = await getServerToken();

    // Validación: Al menos un bloque debe estar seleccionado
    if (!blocks || blocks.length === 0) {
      return {
        error: 'Se debe seleccionar al menos un horario disponible.',
      };
    }

    // Validación: tutorId debe estar presente en cookies
    if (!tutorId) {
      return {
        error: 'ID del tutor no encontrado. Completa primero el paso 1.',
      };
    }

    if (!token) {
      return {
        error: 'Token de autenticación no encontrado. Inicia sesión.',
      };
    }

    // Hacer petición real al backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
    const endpoint = `${backendUrl}disponibilidad`;

    const requestBody = {
      tutorId,
      blocks,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      // Parsear respuesta del backend
      const result = await response.json();

      if (!response.ok) {
        return {
          error: result.message || 'Error al guardar la disponibilidad',
        };
      }

      return result;
    } catch (error) {
      console.error('Error en guardarDisponibilidadAction:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error en guardarDisponibilidadAction:', error);
    return {
      error: 'Error al guardar la disponibilidad. Intenta nuevamente.',
    };
  }
}
