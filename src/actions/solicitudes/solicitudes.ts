'use server';

import {
  ApiSolicitudesResponse,
  InitialFetchResponse,
  PaginatedSolicitudesDto,
  SolicitudDetailsDto,
  SolicitudStatus,
} from '@/interfaces/solicitudes/SolicitudesDTO';
import { globalCountsSeed } from '@/seed/GlobalCountsSeedData';
import { paginatedSolicitudesExpiredSeed } from '@/seed/SolicitudesExpiredSeedData';
import { paginatedSolicitudesPendingSeed } from '@/seed/SolicitudesPendingSeedData';

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalizeApiStatus(rawStatus: string): SolicitudStatus {
  if (rawStatus === 'PENDIENTE') {
    return 'PENDIENTE';
  }

  if (rawStatus === 'EXPIRADA') {
    return 'EXPIRADA';
  }

  return 'RESPONDIDA';
}

function mapApiItem(item: ApiSolicitudesResponse['data'][number]): SolicitudDetailsDto {
  return {
    id: item.id,
    estudiante: item.nombreEstudiante || item.estudiante || 'Estudiante sin nombre',
    materia: item.materia,
    fechaHora: item.fechaHora,
    mensajeResumen: item.mensajeResumen,
    estado: normalizeApiStatus(item.estado),
    modalidad: item.modalidad ?? 'Virtual',
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
  await wait(700);

  return {
    solicitudes: {
      ...paginatedSolicitudesPendingSeed,
      page,
      limit,
    },
    counts: globalCountsSeed,
  };

  // try {
  //   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //   const token = process.env.TEMPORARY_TOKEN;
  //
  //   if (!backendUrl || !token) {
  //     throw new Error('NEXT_PUBLIC_BACKEND_API_URL o TEMPORARY_TOKEN no configurado');
  //   }
  //
  //   const baseUrl = backendUrl.replace(/\/+$/, '');
  //
  //   const [countsResponse, solicitudesResponse] = await Promise.all([
  //     fetch(`${baseUrl}/solicitudes/counts`, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       next: { tags: ['solicitudes', 'global-counts'] },
  //     }),
  //     fetch(`${baseUrl}/solicitudes?status=PENDIENTE&page=${page}&limit=${limit}`, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       next: { tags: ['solicitudes', 'solicitudes-pendiente'] },
  //     }),
  //   ]);
  //
  //   if (!countsResponse.ok || !solicitudesResponse.ok) {
  //     throw new Error('Error al obtener datos iniciales de solicitudes');
  //   }
  //
  //   const counts = await countsResponse.json();
  //   const solicitudesApi: ApiSolicitudesResponse = await solicitudesResponse.json();
  //
  //   return {
  //     counts,
  //     solicitudes: {
  //       data: solicitudesApi.data.map(mapApiItem),
  //       total: solicitudesApi.total,
  //       page: solicitudesApi.currentPage ?? solicitudesApi.page ?? page,
  //       limit: solicitudesApi.itemsPerPage ?? solicitudesApi.limit ?? limit,
  //     },
  //   };
  // } catch (error) {
  //   console.error('Error en fetchInitialDataAction:', error);
  //   return {
  //     solicitudes: {
  //       data: [],
  //       total: 0,
  //       page,
  //       limit,
  //     },
  //     counts: {
  //       pending: 0,
  //       expired: 0,
  //       responded: 0,
  //     },
  //   };
  // }
}

/**
 * Obtiene solicitudes filtradas por estado para la Bandeja de Entrada.
 */
export async function getSolicitudesAction(
  status: SolicitudStatus,
  page: number,
  limit: number
): Promise<PaginatedSolicitudesDto> {
  await wait(600);

  if (status === 'PENDIENTE') {
    return {
      ...paginatedSolicitudesPendingSeed,
      page,
      limit,
    };
  }

  if (status === 'EXPIRADA') {
    return {
      ...paginatedSolicitudesExpiredSeed,
      page,
      limit,
    };
  }

  return {
    data: [],
    total: 0,
    page,
    limit,
  };

  // try {
  //   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //   const token = process.env.TEMPORARY_TOKEN;
  //
  //   if (!backendUrl || !token) {
  //     throw new Error('NEXT_PUBLIC_BACKEND_API_URL o TEMPORARY_TOKEN no configurado');
  //   }
  //
  //   const baseUrl = backendUrl.replace(/\/+$/, '');
  //
  //   const response = await fetch(
  //     `${baseUrl}/solicitudes?status=${status}&page=${page}&limit=${limit}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       next: { tags: ['solicitudes', `solicitudes-${status.toLowerCase()}`] },
  //     }
  //   );
  //
  //   if (!response.ok) {
  //     throw new Error('Error al obtener solicitudes filtradas');
  //   }
  //
  //   const solicitudesApi: ApiSolicitudesResponse = await response.json();
  //
  //   return {
  //     data: solicitudesApi.data.map(mapApiItem),
  //     total: solicitudesApi.total,
  //     page: solicitudesApi.currentPage ?? solicitudesApi.page ?? page,
  //     limit: solicitudesApi.itemsPerPage ?? solicitudesApi.limit ?? limit,
  //   };
  // } catch (error) {
  //   console.error('Error en getSolicitudesAction:', error);
  //   return {
  //     data: [],
  //     total: 0,
  //     page,
  //     limit,
  //   };
  // }
}
