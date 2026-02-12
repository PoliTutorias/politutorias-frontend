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
    // Simulación: No hace petición real al backend
    // Solo registra la oferta de forma simulada
    console.log('Oferta registrada (simulado):', data);

    // Simular un pequeño delay como si fuera una petición real
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      message: 'Oferta registrada',
      data: {
        id: `oferta-${Date.now()}`,
        title: data.title,
        price: data.price,
        modality: data.modality,
        categories: data.categories,
        description: data.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
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
