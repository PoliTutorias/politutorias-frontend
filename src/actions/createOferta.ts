'use server';

import { CreateOfertaInput } from '@/schemas/createOfertaSchema';
import { getCategoriesSeed } from '@/seed/CategoriesSeedData';
import { getServerToken } from '@/lib/server-auth';

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
 * Usa JWT auth para que el backend resuelva el tutorId correcto.
 */

export async function createOfertaAction(
  data: CreateOfertaInput
): Promise<CreateOfertaResponse> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!backendUrl) {
      throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurada');
    }

    // Obtener JWT token
    const token = await getServerToken();
    if (!token) {
      return {
        success: false,
        message: 'No se encontró sesión activa. Por favor, inicia sesión.',
      };
    }

    // Mapear IDs de categorías a nombres
    const categories = getCategoriesSeed();
    const categoryNames = data.categories.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category?.name || categoryId;
    });

    // Mapear modalidad al formato que espera el backend
    const mapModalidadToBackend = (modality: string): string => {
      switch (modality) {
        case 'Virtual/Presencial':
          return 'AMBOS';
        case 'Presencial':
          return 'PRESENCIAL';
        case 'Virtual':
          return 'VIRTUAL';
        default:
          return modality;
      }
    };

    const payload = {
      title: data.title,
      price: data.price,
      modality: mapModalidadToBackend(data.modality),
      categories: categoryNames,
      description: data.description,
    };

    console.log('[createOfertaAction] Request URL:', `${backendUrl}ofertas`);
    console.log('[createOfertaAction] Request Body:', payload);

    const response = await fetch(`${backendUrl}ofertas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const rawResponseBody = await response.text();
    console.log('[createOfertaAction] Response Status:', response.status, response.statusText);
    console.log('[createOfertaAction] Response Headers:', Object.fromEntries(response.headers.entries()));
    console.log('[createOfertaAction] Response Body:', rawResponseBody);

    let responseData: Record<string, unknown> = {};
    try {
      responseData = rawResponseBody ? JSON.parse(rawResponseBody) : {};
    } catch {
      responseData = { message: rawResponseBody || 'Respuesta no JSON del servidor' };
    }

    // Respuesta exitosa 201
    if (response.status === 201) {
      return {
        success: true,
        message:
          typeof responseData.message === 'string'
            ? responseData.message
            : 'Oferta creada exitosamente',
        data: responseData.data as CreateOfertaResponse['data'],
      };
    }

    // Error 400 - Bad Request (validación)
    if (response.status === 400) {
      return {
        success: false,
        message: Array.isArray(responseData.message)
          ? String(responseData.message[0])
          : String(responseData.message || 'Error de validación'),
        errors: Array.isArray(responseData.message)
          ? responseData.message.map((item) => String(item))
          : [String(responseData.message)],
      };
    }

    // Error 409 - Conflict (oferta duplicada)
    if (response.status === 409) {
      return {
        success: false,
        message: String(responseData.message || 'Ya existe una oferta con este título'),
      };
    }

    // Error 500 - Internal Server Error
    if (response.status === 500) {
      return {
        success: false,
        message: String(responseData.message || 'Error interno del servidor'),
      };
    }

    // Otros errores
    throw new Error(
      `Error ${response.status}: ${String(responseData.message || 'Error desconocido')}`
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
