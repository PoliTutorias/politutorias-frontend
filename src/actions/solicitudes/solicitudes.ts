'use server';

import {
  ApiSolicitudesResponse,
  InitialFetchResponse,
  PaginatedSolicitudesDto,
  SolicitudDetailsDto,
  SolicitudStatus,
} from '@/interfaces/solicitudes/SolicitudesDTO';
import { getRequestConfig } from '@/lib/server-auth';

function normalizeApiStatus(rawStatus: string): SolicitudStatus {
  if (rawStatus === 'PENDIENTE') {
    return 'PENDIENTE';
  }

  if (rawStatus === 'EXPIRADA') {
    return 'EXPIRADA';
  }

  return 'RESPONDIDA';
}

function normalizeApiModalidad(rawModalidad?: string): 'Virtual' | 'Presencial' {
  const normalized = (rawModalidad ?? '').trim().toLowerCase();

  if (normalized === 'presencial') {
    return 'Presencial';
  }

  return 'Virtual';
}

function mapApiItem(item: ApiSolicitudesResponse['data'][number]): SolicitudDetailsDto {
  return {
    id: item.id,
    estudiante: item.nombreEstudiante || item.estudiante || 'Estudiante sin nombre',
    materia: item.materia,
    fechaHora: item.fechaHora,
    mensajeResumen: item.mensajeResumen,
    estado: normalizeApiStatus(item.estado),
    modalidad: normalizeApiModalidad(item.modalidad),
    precioHora: item.precioHora ?? 0,
    mensajeCompleto: item.mensajeCompleto ?? item.mensajeResumen,
  };
}



/**
 * Carga inicial de Bandeja:
 * - Conteos globales de solicitudes
 * - Lista inicial de solicitudes pendientes
 */
export async function fetchInitialDataAction(
  page: number,
  limit: number
): Promise<InitialFetchResponse> {
  try {
    const { baseUrl, token } = await getRequestConfig();

    // Si no hay token aún (SSR pre-auth), devolver datos vacíos sin crashear
    if (!token) {
      return {
        solicitudes: { data: [], total: 0, page, limit, totalPages: 1 },
        counts: { pending: 0, expired: 0, responded: 0 },
      };
    }

    const [countsResponse, solicitudesResponse] = await Promise.all([
      fetch(`${baseUrl}/solicitudes/counts`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['solicitudes', 'global-counts'] },
      }),
      fetch(`${baseUrl}/solicitudes?status=PENDIENTE&page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['solicitudes', 'solicitudes-pendiente'] },
      }),
    ]);

    if (!countsResponse.ok || !solicitudesResponse.ok) {
      console.error(
        `[fetchInitialDataAction] HTTP error — counts: ${countsResponse.status}, solicitudes: ${solicitudesResponse.status}`,
      );
      return {
        solicitudes: { data: [], total: 0, page, limit, totalPages: 1 },
        counts: { pending: 0, expired: 0, responded: 0 },
      };
    }

    const counts = await countsResponse.json();
    const solicitudesApi: ApiSolicitudesResponse = await solicitudesResponse.json();

    return {
      counts,
      solicitudes: {
        data: solicitudesApi.data.map(mapApiItem),
        total: solicitudesApi.total,
        page: solicitudesApi.currentPage ?? solicitudesApi.page ?? page,
        limit: solicitudesApi.itemsPerPage ?? solicitudesApi.limit ?? limit,
        totalPages:
          solicitudesApi.totalPages ??
          Math.max(1, Math.ceil(solicitudesApi.total / (solicitudesApi.itemsPerPage ?? solicitudesApi.limit ?? limit))),
      },
    };
  } catch (error) {
    console.error('Error en fetchInitialDataAction:', error);
    return {
      solicitudes: {
        data: [],
        total: 0,
        page,
        limit,
        totalPages: 1,
      },
      counts: {
        pending: 0,
        expired: 0,
        responded: 0,
      },
    };
  }
}

/**
 * Obtiene solicitudes filtradas por estado para la Bandeja de Entrada.
 */
export async function getSolicitudesAction(
  status: SolicitudStatus,
  page: number,
  limit: number
): Promise<PaginatedSolicitudesDto> {
  try {
    const { baseUrl, token } = await getRequestConfig();

    const response = await fetch(
      `${baseUrl}/solicitudes?status=${status}&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['solicitudes', `solicitudes-${status.toLowerCase()}`] },
      }
    );

    if (!response.ok) {
      throw new Error('Error al obtener solicitudes filtradas');
    }

    const solicitudesApi: ApiSolicitudesResponse = await response.json();

    return {
      data: solicitudesApi.data.map(mapApiItem),
      total: solicitudesApi.total,
      page: solicitudesApi.currentPage ?? solicitudesApi.page ?? page,
      limit: solicitudesApi.itemsPerPage ?? solicitudesApi.limit ?? limit,
      totalPages:
        solicitudesApi.totalPages ??
        Math.max(1, Math.ceil(solicitudesApi.total / (solicitudesApi.itemsPerPage ?? solicitudesApi.limit ?? limit))),
    };
  } catch (error) {
    console.error('Error en getSolicitudesAction:', error);
    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 1,
    };
  }
}
