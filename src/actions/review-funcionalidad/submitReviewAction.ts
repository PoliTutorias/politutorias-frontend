'use server';

import { revalidatePath } from 'next/cache';
import type { SubmitReviewData } from '@/interfaces/review-tipo/SubmitReviewData';
import type { ReviewEntity } from '@/interfaces/review-tipo/ReviewEntity';
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
    const token = await getServerToken();
    if (!token) {
      return {
        success: false,
        message: 'No autorizado. Por favor, inicia sesión.',
      };
    }

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/api/';
    const normalizedBase = apiUrl.replace(/\/+$/, '');

    const response = await fetch(`${normalizedBase}/reviews`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tutoriaId: data.tutoriaId,
        rating: data.rating,
        ...(data.comment?.trim() ? { comment: data.comment.trim() } : {}),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const backendMessage = Array.isArray((errorData as { message?: unknown }).message)
        ? ((errorData as { message: string[] }).message[0] ?? 'Error al enviar la reseña.')
        : ((errorData as { message?: string }).message ?? 'Error al enviar la reseña.');

      return {
        success: false,
        message: backendMessage,
      };
    }

    const result = (await response.json()) as {
      message?: string;
      data?: {
        id: string;
        tutoriaId: string;
        calificacion: number;
        comentario?: string | null;
        fechaCreacion: string;
      };
    };

    // Revalidate the historial path to refresh data
    revalidatePath('/historial');

    const reviewData = result.data;

    const mappedData: ReviewEntity | undefined = reviewData
      ? {
          id: reviewData.id,
          tutoriaId: reviewData.tutoriaId,
          rating: reviewData.calificacion,
          comment: reviewData.comentario ?? null,
          createdAt: reviewData.fechaCreacion,
          updatedAt: reviewData.fechaCreacion,
        }
      : undefined;

    return {
      success: true,
      message: result.message ?? 'Reseña enviada. Gracias por calificar tu tutoría.',
      data: mappedData,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return {
      success: false,
      message: `Error al procesar la reseña: ${errorMessage}`,
    };
  }
}
