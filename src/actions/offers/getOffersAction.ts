'use server';

import { PaginatedOffersResponse, OfferResponseDto } from '@/interfaces/offers/OfferResponseDto';

interface GetOffersParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  modality?: 'Virtual' | 'Presencial' | 'Virtual/Presencial';
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'newest';
}

interface BackendOffersResponse {
  offers: OfferResponseDto[];
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

/**
 * Server Action para obtener las ofertas de tutorías con paginación
 * Se conecta directamente con el endpoint GET /api/offers del backend
 * @param params - Parámetros de filtrado y paginación (page, limit, modality, minPrice, maxPrice, sortBy)
 * @returns PaginatedOffersResponse con las ofertas paginadas
 * @throws Error si la petición al backend falla
 */
export async function getOffersAction(
  params: GetOffersParams = {}
): Promise<PaginatedOffersResponse> {
  try {
    // Extraer parámetros con valores por defecto
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    // Construir query parameters dinámicamente
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    if (params.searchTerm) {
      queryParams.append('searchTerm', params.searchTerm);
    }
    if (params.modality) {
      queryParams.append('modality', params.modality);
    }
    if (params.minPrice !== undefined) {
      queryParams.append('minPrice', params.minPrice.toString());
    }
    if (params.maxPrice !== undefined) {
      queryParams.append('maxPrice', params.maxPrice.toString());
    }
    if (params.sortBy) {
      queryParams.append('sortBy', params.sortBy);
    }

    // Realizar petición al backend
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiBaseUrl) {
      throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurada');
    }

    const response = await fetch(
      `${apiBaseUrl}offers?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Validar respuesta
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error al obtener ofertas: ${response.status} - ${errorData.message || response.statusText}`
      );
    }

    // Parsear respuesta del backend
    const backendData: BackendOffersResponse = await response.json();

    // Transformar respuesta del backend al formato esperado por la app
    const paginatedResponse: PaginatedOffersResponse = {
      data: backendData.offers,
      meta: {
        totalResults: backendData.totalResults,
        currentPage: backendData.currentPage,
        itemsPerPage: backendData.itemsPerPage,
        totalPages: backendData.totalPages,
      },
    };

    return paginatedResponse;
  } catch (error) {
    console.error('Error al obtener ofertas del backend:', error);
    throw error;
  }
}
