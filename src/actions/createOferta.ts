'use server';

import { CreateOfertaInput } from '@/schemas/createOfertaSchema';

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
    createdAt: string;
    updatedAt: string;
  };
  errors?: Record<string, string>;
}

/**
 * Server Action para crear una nueva oferta de tutoría
 * 
 * @param data - Datos de la oferta validados con Zod
 * @returns Respuesta con el resultado de la operación
 * 
 * NOTA: Este Server Action necesita ser integrado con el backend.
 * Actualmente solo simula la creación. Cuando el backend esté listo,
 * reemplazar la llamada fetch por la del API real.
 */
export async function createOfertaAction(
  data: CreateOfertaInput
): Promise<CreateOfertaResponse> {
  try {
    // TODO: Reemplazar esta URL cuando el backend esté disponible
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

    const response = await fetch(`${apiUrl}/ofertas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Si el error tiene estructura de validación, extraer los errores
      if (response.status === 400 && errorData.errors) {
        return {
          success: false,
          message: errorData.message || 'Validación fallida',
          errors: errorData.errors,
        };
      }

      throw new Error(
        errorData.message || 'Error al crear la oferta'
      );
    }

    const result = await response.json();

    return {
      success: true,
      message: result.message || 'Oferta creada exitosamente',
      data: result.data,
    };
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
