'use server';

import { getOffersSeedData } from '@/seed/OfferSeedData';
import { PaginatedOffersResponse } from '@/interfaces/offers/OfferResponseDto';

interface GetOffersParams {
  page?: number;
  limit?: number;
}

/**
 * Server Action para obtener las ofertas de tutorías con paginación
 * Actualmente retorna datos del seed, con lógica de fetch comentada para integración futura con el backend
 * @param params - Parámetros de paginación (page y limit)
 * @returns PaginatedOffersResponse con las ofertas paginadas
 */
export async function getOffersAction(
  params: GetOffersParams = {}
): Promise<PaginatedOffersResponse> {
  // Simular retardo de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Extraer parámetros con valores por defecto
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  // Obtener datos del seed
  const seedData = getOffersSeedData();

  // Calcular índices para paginación
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Obtener sub-array de ofertas
  const paginatedOffers = seedData.data.slice(startIndex, endIndex);

  // Calcular total de páginas
  const totalPages = Math.ceil(seedData.meta.totalResults / limit);

  // Retornar respuesta paginada
  return {
    data: paginatedOffers,
    meta: {
      totalResults: seedData.meta.totalResults,
      currentPage: page,
      itemsPerPage: limit,
      totalPages: totalPages,
    },
  };

  /*
  // TODO: Descomentar cuando el backend esté listo
  try {
    // Construir query parameters
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (limit) queryParams.append('limit', limit.toString());

    // Realizar petición al backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/offers?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Validar respuesta
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    // Parsear y retornar respuesta
    const data: PaginatedOffersResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
  */
}
