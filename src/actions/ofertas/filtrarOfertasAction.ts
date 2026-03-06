'use server';

import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { OfertasResult } from '@/interfaces/ofertas/OfertasResult';

/**
 * Parámetros de filtro combinados para HU26+HU27+HU16
 */
export interface FiltrarOfertasParams {
  minPrice?: number;
  maxPrice?: number;
  /** Modalidad en formato backend: 'PRESENCIAL' | 'VIRTUAL' | 'AMBOS' */
  modalidad?: string;
  /** Día de la semana en formato backend, e.g. 'LUNES', 'MARTES', etc. */
  disponibilidad?: string;
}

// Tipos que representan la respuesta cruda del backend GET /api/ofertas
interface BackendTutor {
  id: string;
  nombre: string;
  fotoUrl: string | null;
}

interface BackendOfertaItem {
  id: string;
  titulo: string;
  descripcion: string | null;
  modalidad: string; // 'PRESENCIAL' | 'VIRTUAL' | 'AMBOS'
  precioHora: number;
  areaConocimiento: string | null;
  nivel: string | null;
  tutor: BackendTutor;
  calificacionPromedio?: number;
  numResenas?: number;
  fechaCreacion: string;
}

interface BackendOfertasResponse {
  data: BackendOfertaItem[];
  total: number;
}

/**
 * Mapea la modalidad del backend (PRESENCIAL/VIRTUAL/AMBOS) al formato del frontend
 */
function mapModalidad(backendModalidad: string): OfertaEntity['modalidad'] {
  switch (backendModalidad) {
    case 'PRESENCIAL':
      return 'Presencial';
    case 'VIRTUAL':
      return 'Virtual';
    case 'AMBOS':
      return 'Virtual/Presencial';
    default:
      return 'Virtual/Presencial';
  }
}

/**
 * Server Action para filtrar ofertas con todos los criterios combinados (HU26+HU27+HU16)
 *
 * Envía los filtros activos al endpoint GET /api/ofertas del backend y
 * mapea la respuesta al formato OfertaEntity del frontend.
 *
 * @param params - Criterios de filtrado opcionales (precio, modalidad, disponibilidad)
 * @returns OfertasResult con ofertas filtradas o un objeto de error
 */
export async function filtrarOfertasAction(
  params: FiltrarOfertasParams = {}
): Promise<OfertasResult | { error: string }> {
  const { minPrice, maxPrice, modalidad, disponibilidad } = params;

  // === Validaciones de precio ===
  if (minPrice !== undefined && maxPrice !== undefined) {
    if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) {
      return { error: 'Los precios deben ser números válidos.' };
    }
    if (minPrice < 0 || maxPrice < 0) {
      return { error: 'Los precios no pueden ser negativos.' };
    }
    if (minPrice > maxPrice) {
      return { error: 'El precio mínimo no puede ser mayor que el precio máximo.' };
    }
  }

  // === Integración con Backend Real ===
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!apiBaseUrl) {
      return { error: 'NEXT_PUBLIC_BACKEND_API_URL no está configurada.' };
    }

    // Construir query parameters dinámicamente
    const queryParams = new URLSearchParams();

    if (minPrice !== undefined) {
      queryParams.append('minPrice', minPrice.toString());
    }
    if (maxPrice !== undefined) {
      queryParams.append('maxPrice', maxPrice.toString());
    }
    if (modalidad) {
      queryParams.append('modalidad', modalidad);
    }
    if (disponibilidad) {
      queryParams.append('disponibilidad', disponibilidad);
    }

    const queryString = queryParams.toString();
    const url = `${apiBaseUrl}ofertas${queryString ? `?${queryString}` : ''}`;

    // Realizar petición al backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

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
    const data: BackendOfertasResponse | BackendOfertaItem[] = await response.json();

    // Manejar ambas estructuras: array directo o objeto con propiedad data
    const ofertasArray = Array.isArray(data) ? data : (data.data || []);
    const total = Array.isArray(data) ? ofertasArray.length : (data.total || 0);

    const ofertas: OfertaEntity[] = ofertasArray.map((backendOferta) => ({
      id: backendOferta.id,
      titulo: backendOferta.titulo,
      carrera: backendOferta.areaConocimiento ?? undefined,
      modalidad: mapModalidad(backendOferta.modalidad),
      descripcion: backendOferta.descripcion || '',
      lugarReunion: undefined,
      precio: backendOferta.precioHora,
      tutor: {
        id: backendOferta.tutor?.id ?? '',
        nombre: backendOferta.tutor?.nombre ?? 'Tutor',
        fotoUrl: backendOferta.tutor?.fotoUrl ?? null,
        contacto: '',
      },
      calificacionPromedio: backendOferta.calificacionPromedio,
      totalReseñas: backendOferta.numResenas,
      tags: backendOferta.areaConocimiento ? [backendOferta.areaConocimiento] : [],
      imagenRepresentativaUrl: undefined,
    }));

    return {
      ofertas,
      total,
    };
  } catch (error) {
    console.error('Error en filtrarOfertasAction:', error);
    return { error: 'Fallo en la comunicación con el servidor.' };
  }
}
