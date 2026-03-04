'use server';

import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { OfertasResult } from '@/interfaces/ofertas/OfertasResult';

// Tipos que representa la respuesta cruda del backend para el mapeo
interface BackendTutor {
  id: string;
  userId: string;
  nombreCompleto: string;
  numeroWhatsapp: string;
  facultad: string;
  semestreActual: string;
  biografiaCorta: string;
  createdAt: string;
  updatedAt: string;
}

interface BackendOferta {
  id: string;
  titulo: string;
  carrera: string | null;
  modalidad: string;
  descripcion: string;
  lugarReunion: string | null;
  precio: number;
  tutor: BackendTutor;
  imagenRepresentativaUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BackendOfertasResponse {
  ofertas: BackendOferta[];
  total: number;
}

/**
 * Server Action para filtrar ofertas por rango de precio (HU27)
 *
 * Acepta un rango de precios (minPrice, maxPrice), llama al endpoint
 * GET /api/ofertas del backend real, mapea la respuesta a OfertaEntity
 * y la retorna como OfertasResult.
 *
 * @param minPrice - Precio mínimo del rango
 * @param maxPrice - Precio máximo del rango
 * @returns OfertasResult con ofertas filtradas o un objeto de error
 */
export async function filtrarOfertasAction(
  minPrice: number,
  maxPrice: number
): Promise<OfertasResult | { error: string }> {
  // === Validaciones ===
  if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) {
    return { error: 'Los precios deben ser números válidos.' };
  }

  if (minPrice < 0 || maxPrice < 0) {
    return { error: 'Los precios no pueden ser negativos.' };
  }

  if (minPrice > maxPrice) {
    return { error: 'El precio mínimo no puede ser mayor que el precio máximo.' };
  }

  // === Integración con Backend Real ===
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiBaseUrl) {
      return { error: 'NEXT_PUBLIC_BACKEND_API_URL no está configurada.' };
    }

    // Construir query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('minPrice', minPrice.toString());
    queryParams.append('maxPrice', maxPrice.toString());

    // Realizar petición al backend
    // apiBaseUrl ya incluye /api/ con trailing slash (ej: "http://localhost:3000/api/")
    const response = await fetch(
      `${apiBaseUrl}ofertas?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    // Manejar respuesta no exitosa
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error:
          errorData.message ||
          `Error del servidor: ${response.status} ${response.statusText}`,
      };
    }

    // Parsear y mapear respuesta del backend → OfertaEntity
    const data: BackendOfertasResponse = await response.json();

    const ofertas: OfertaEntity[] = data.ofertas.map((backendOferta) => ({
      id: backendOferta.id,
      titulo: backendOferta.titulo,
      carrera: backendOferta.carrera ?? undefined,
      modalidad: backendOferta.modalidad as OfertaEntity['modalidad'],
      descripcion: backendOferta.descripcion,
      lugarReunion: backendOferta.lugarReunion ?? undefined,
      precio: backendOferta.precio,
      tutor: {
        id: backendOferta.tutor?.id ?? '',
        nombre: backendOferta.tutor?.nombreCompleto ?? 'Tutor',
        fotoUrl: null,
        contacto: backendOferta.tutor?.userId ?? '',
      },
      imagenRepresentativaUrl: backendOferta.imagenRepresentativaUrl ?? undefined,
    }));

    return {
      ofertas,
      total: data.total,
    };
  } catch (error) {
    console.error('Error en filtrarOfertasAction:', error);
    return { error: 'Fallo en la comunicación con el servidor.' };
  }
}
