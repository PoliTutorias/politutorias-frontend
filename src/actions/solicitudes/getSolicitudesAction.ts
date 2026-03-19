'use server';

import {
  PaginatedSolicitudListDto,
  SolicitudListItemDto,
  SolicitudListParams,
  SolicitudStatus,
} from '@/dtos/solicitudes.dto';
import { getRequestConfig } from '@/lib/server-auth';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;
const BACKEND_MAX_LIMIT = 100;

type ApiSolicitudItem = {
  id: string;
  tutorAvatarUrl?: string;
  avatarUrl?: string;
  tutorName?: string;
  subject?: string;
  materia?: string;
  date?: string;
  fechaHora?: string;
  modality?: 'Virtual' | 'Presencial';
  modalidad?: 'Virtual' | 'Presencial';
  pricePerHour?: number;
  precioHora?: number;
  status?: string;
  estado?: string;
};

type ApiListResponse = {
  items?: ApiSolicitudItem[];
  data?: ApiSolicitudItem[];
  total?: number;
  page?: number;
  currentPage?: number;
  limit?: number;
  itemsPerPage?: number;
};



function normalizeStatus(rawStatus?: string): SolicitudStatus {
  if (rawStatus === 'PENDIENTE') {
    return SolicitudStatus.PENDIENTE;
  }

  if (rawStatus === 'EXPIRADA') {
    return SolicitudStatus.EXPIRADA;
  }

  if (rawStatus === 'ACEPTADA') {
    return SolicitudStatus.ACEPTADA;
  }

  return SolicitudStatus.RECHAZADA;
}

function getStatusPriority(status: SolicitudStatus): number {
  if (status === SolicitudStatus.PENDIENTE) {
    return 0;
  }

  if (status === SolicitudStatus.ACEPTADA) {
    return 1;
  }

  if (status === SolicitudStatus.EXPIRADA) {
    return 2;
  }

  return 3;
}

function mapApiItem(item: ApiSolicitudItem): SolicitudListItemDto {
  return {
    id: item.id,
    avatarUrl: item.tutorAvatarUrl || item.avatarUrl,
    tutorName: item.tutorName || 'Tutor sin nombre',
    subject: item.subject || item.materia || 'Materia no especificada',
    dateTime: item.date || item.fechaHora || new Date().toISOString(),
    modality: item.modality || item.modalidad || 'Virtual',
    price: item.pricePerHour ?? item.precioHora ?? 0,
    status: normalizeStatus(item.status ?? item.estado),
  };
}

async function fetchSolicitudesByStatus(
  baseUrl: string,
  token: string,
  status: 'TODAS' | SolicitudStatus,
  page: number,
  limit: number
): Promise<ApiListResponse> {
  const safeLimit = Math.min(Math.max(1, limit), BACKEND_MAX_LIMIT);

  const queryParams = new URLSearchParams({
    status,
    page: String(Math.max(1, page)),
    limit: String(safeLimit),
  });

  const response = await fetch(`${baseUrl}/solicitudes?${queryParams}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = 'No se pudieron obtener las solicitudes';

    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message ?? errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as ApiListResponse;
}

async function fetchAllSolicitudesByStatus(
  baseUrl: string,
  token: string,
  status: SolicitudStatus
): Promise<ApiSolicitudItem[]> {
  const firstPage = await fetchSolicitudesByStatus(baseUrl, token, status, 1, BACKEND_MAX_LIMIT);
  const firstItems = firstPage.items ?? firstPage.data ?? [];
  const total = typeof firstPage.total === 'number' ? firstPage.total : firstItems.length;
  const itemsPerPage = firstPage.itemsPerPage ?? firstPage.limit ?? BACKEND_MAX_LIMIT;

  if (total <= itemsPerPage) {
    return firstItems;
  }

  const totalPages = Math.ceil(total / itemsPerPage);
  const pages = Array.from({ length: totalPages - 1 }, (_, index) => index + 2);
  const extraPages = await Promise.all(
    pages.map((page) => fetchSolicitudesByStatus(baseUrl, token, status, page, itemsPerPage))
  );
  const extraItems = extraPages.flatMap((page) => page.items ?? page.data ?? []);

  return [...firstItems, ...extraItems];
}

export async function getSolicitudesAction(
  params: SolicitudListParams = {}
): Promise<PaginatedSolicitudListDto> {
  const status = params.status ?? 'TODAS';
  const page = Math.max(DEFAULT_PAGE, params.page ?? DEFAULT_PAGE);
  const limit = Math.max(1, params.limit ?? DEFAULT_LIMIT);

  const { baseUrl, token } = await getRequestConfig();

  if (status === 'TODAS' || status === SolicitudStatus.ACEPTADA || status === SolicitudStatus.RECHAZADA) {
    const [pendingRawItems, expiredRawItems] = await Promise.all([
      fetchAllSolicitudesByStatus(baseUrl, token, SolicitudStatus.PENDIENTE),
      fetchAllSolicitudesByStatus(baseUrl, token, SolicitudStatus.EXPIRADA),
    ]);

    const pendingItems = pendingRawItems.map(mapApiItem);
    const expiredItems = expiredRawItems.map(mapApiItem);
    const merged = [...pendingItems, ...expiredItems].sort((a, b) => {
      const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);

      if (statusDiff !== 0) {
        return statusDiff;
      }

      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });

    const start = (page - 1) * limit;

    return {
      items: merged.slice(start, start + limit),
      total: merged.length,
      page,
      limit,
    };
  }

  const rawItems = await fetchAllSolicitudesByStatus(baseUrl, token, status);
  const sortedItems = rawItems
    .map(mapApiItem)
    .sort((a, b) => {
      if (status === SolicitudStatus.EXPIRADA) {
        return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
      }

      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });
  const start = (page - 1) * limit;

  return {
    items: sortedItems.slice(start, start + limit),
    total: sortedItems.length,
    page,
    limit,
  };
}