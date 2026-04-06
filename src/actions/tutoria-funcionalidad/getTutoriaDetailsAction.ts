'use server';

import type { TutoriaDetailWithReviewDto } from '@/seed/TutoriaSeedData';
import { getTutoriaSeedData } from '@/seed/TutoriaSeedData';
import { getServerToken } from '@/lib/server-auth';

interface GetTutoriaDetailsResponse {
  success: boolean;
  message: string;
  data?: TutoriaDetailWithReviewDto;
}

export async function getTutoriaDetailsAction(
  tutoriaId: string,
): Promise<GetTutoriaDetailsResponse> {
  try {
    // DEVELOPMENT: Return seed data for testing
    const tutoriasData = getTutoriaSeedData();
    const tutoria = tutoriasData.find((t) => t.id === tutoriaId);

    if (!tutoria) {
      return {
        success: false,
        message: 'Tutoría no encontrada.',
      };
    }

    return {
      success: true,
      message: 'Detalle de tutoría obtenido.',
      data: tutoria,
    };

    // COMMENTED: Production fetch call to backend
    /*
    const token = await getServerToken();
    if (!token) {
      return {
        success: false,
        message: 'No autorizado. Por favor, inicia sesión.',
      };
    }

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
    const response = await fetch(`${apiUrl}tutorias/${tutoriaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Error al obtener los detalles de la tutoría.',
      };
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Detalle de tutoría obtenido.',
      data: result.data || result,
    };
    */
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return {
      success: false,
      message: `Error al obtener los detalles: ${errorMessage}`,
    };
  }
}
