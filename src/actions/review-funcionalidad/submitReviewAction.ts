'use server';

import { revalidatePath } from 'next/cache';
import type { SubmitReviewData } from '@/interfaces/review-tipo/SubmitReviewData';
import type { ReviewEntity } from '@/interfaces/review-tipo/ReviewEntity';
import { ReviewSeedData } from '@/seed/ReviewSeedData';
import { getServerToken } from '@/lib/server-auth';

interface SubmitReviewResponse {
  success: boolean;
  message: string;
  data?: ReviewEntity;
}

export async function submitReviewAction(
  data: SubmitReviewData,
): Promise<SubmitReviewResponse> {
  try {
    // DEVELOPMENT: Return seed data for testing
    const seedResponse: ReviewEntity = {
      ...ReviewSeedData,
      tutoriaId: data.tutoriaId,
      rating: data.rating,
      comment: data.comment || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simulate small delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: 'Reseña enviada. Gracias por calificar tu tutoría.',
      data: seedResponse,
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
    const response = await fetch(`${apiUrl}reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Error al enviar la reseña.',
      };
    }

    const result = await response.json();

    // Revalidate the historial path to refresh data
    revalidatePath('/historial');

    return {
      success: true,
      message: 'Reseña enviada. Gracias por calificar tu tutoría.',
      data: result.data || result,
    };
    */
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return {
      success: false,
      message: `Error al procesar la reseña: ${errorMessage}`,
    };
  }
}
