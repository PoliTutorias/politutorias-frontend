'use server';

import { CreateOfertaInput } from '@/schemas/createOfertaSchema';
import { getCategoriesSeed } from '@/seed/CategoriesSeedData';

export interface CreateOfertaResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    title: string;
    price: number;
    modality: string;
    categories: string[];
    description: string;
    tutorId: string;
    createdAt: string;
    updatedAt: string;
  };
  errors?: string[];
}

/**
 * Server Action para crear una nueva oferta de tutoría
 * 
 * @param data - Datos de la oferta validados con Zod
 * @returns Respuesta con el resultado de la operación
 */
export async function createOfertaAction(
  data: CreateOfertaInput
): Promise<CreateOfertaResponse> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!backendUrl) {
      throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurada');
    }

    // Mapear IDs de categorías a nombres
    const categories = getCategoriesSeed();
    const categoryNames = data.categories.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category?.name || categoryId;
    });

    const response = await fetch(`${backendUrl}ofertas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        modality: data.modality,
        categories: categoryNames,
        description: data.description,
      }),
    });

    const responseData = await response.json();

    // Respuesta exitosa 201
    if (response.status === 201) {
      return {
        success: true,
        message: responseData.message || 'Oferta creada exitosamente',
        data: responseData.data,
      };
    }

    // Error 400 - Bad Request (validación)
    if (response.status === 400) {
      return {
        success: false,
        message: Array.isArray(responseData.message)
          ? responseData.message[0]
          : responseData.message || 'Error de validación',
        errors: Array.isArray(responseData.message)
          ? responseData.message
          : [responseData.message],
      };
    }

    // Error 409 - Conflict (oferta duplicada)
    if (response.status === 409) {
      return {
        success: false,
        message: responseData.message || 'Ya existe una oferta con este título',
      };
    }

    // Error 500 - Internal Server Error
    if (response.status === 500) {
      return {
        success: false,
        message: responseData.message || 'Error interno del servidor',
      };
    }

    // Otros errores
    throw new Error(
      `Error ${response.status}: ${responseData.message || 'Error desconocido'}`
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error desconocido';

    console.error('Error en createOfertaAction:', error);

    return {
      success: false,
      message: message || 'Ocurrió un error inesperado',
    };
  }
}
