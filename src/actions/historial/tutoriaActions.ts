'use server';

import { getHistorialTutoriasSeedData } from '@/seed/HistorialTutoriasSeedData';
import { getTutoriaDetalleSeedData } from '@/seed/TutoriaDetalleSeedData';
import type {
  HistorialQueryParams,
  HistorialApiResponse,
  TutoriaHistorialListDTO,
  TutoriaDetalleDTO,
} from '@/interfaces/historial/HistorialTypes';

export async function fetchHistorialAction(
  queryParams: HistorialQueryParams,
): Promise<HistorialApiResponse<TutoriaHistorialListDTO[]>> {
  const {
    page = 1,
    limit = 5,
    status = ['COMPLETADA', 'INASISTENCIA'],
    orderDirection = 'DESC',
  } = queryParams;

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const allData = getHistorialTutoriasSeedData();

    const filtered = allData.filter((t) => status.includes(t.estado));

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.fecha).getTime();
      const dateB = new Date(b.fecha).getTime();
      return orderDirection === 'ASC' ? dateA - dateB : dateB - dateA;
    });

    const total = sorted.length;
    const startIndex = (page - 1) * limit;
    const paginated = sorted.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data: paginated,
      total,
      page,
      limit,
    };
  } catch {
    return {
      success: false,
      data: [],
      total: 0,
      page,
      limit,
      message: 'Error inesperado al procesar la solicitud.',
    };
  }

  // ─── Integración con backend real (descomentar cuando el backend esté listo) ──
  // try {
  //   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //   if (!backendUrl) {
  //     throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurada.');
  //   }
  //
  //   const { getServerToken } = await import('@/lib/server-auth');
  //   const token = await getServerToken();
  //
  //   const params = new URLSearchParams();
  //   params.set('page', String(page));
  //   params.set('limit', String(limit));
  //   if (queryParams.orderBy) params.set('orderBy', queryParams.orderBy);
  //   if (orderDirection) params.set('orderDirection', orderDirection);
  //   status.forEach((s) => params.append('status', s));
  //
  //   const normalizedBase = backendUrl.replace(/\/+$/, '');
  //   const response = await fetch(`${normalizedBase}/api/tutorias/historial?${params}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     },
  //     next: { tags: ['tutorias-historial'] },
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
  //   }
  //
  //   const result: HistorialApiResponse<TutoriaHistorialListDTO[]> = await response.json();
  //   return result;
  // } catch (error) {
  //   return {
  //     success: false,
  //     data: [],
  //     total: 0,
  //     page,
  //     limit,
  //     message: error instanceof Error ? error.message : 'Error inesperado al procesar la solicitud.',
  //   };
  // }
}

export async function fetchDetalleAction(
  tutoriaId: string,
): Promise<HistorialApiResponse<TutoriaDetalleDTO | null>> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const detalle = getTutoriaDetalleSeedData(tutoriaId);

    if (!detalle) {
      return {
        success: false,
        data: null,
        total: 0,
        page: 1,
        limit: 1,
        message: 'Tutoría no encontrada o no pertenece al estudiante.',
      };
    }

    return {
      success: true,
      data: detalle,
      total: 1,
      page: 1,
      limit: 1,
    };
  } catch {
    return {
      success: false,
      data: null,
      total: 0,
      page: 1,
      limit: 1,
      message: 'Error inesperado al procesar la solicitud.',
    };
  }

  // ─── Integración con backend real (descomentar cuando el backend esté listo) ──
  // try {
  //   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //   if (!backendUrl) {
  //     throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurada.');
  //   }
  //
  //   const { getServerToken } = await import('@/lib/server-auth');
  //   const token = await getServerToken();
  //
  //   const normalizedBase = backendUrl.replace(/\/+$/, '');
  //   const response = await fetch(`${normalizedBase}/api/tutorias/${encodeURIComponent(tutoriaId)}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     },
  //     next: { tags: [`tutoria-${tutoriaId}`] },
  //   });
  //
  //   if (!response.ok) {
  //     throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
  //   }
  //
  //   const result: HistorialApiResponse<TutoriaDetalleDTO> = await response.json();
  //   return result;
  // } catch (error) {
  //   return {
  //     success: false,
  //     data: null,
  //     total: 0,
  //     page: 1,
  //     limit: 1,
  //     message: error instanceof Error ? error.message : 'Error inesperado al procesar la solicitud.',
  //   };
  // }
}
