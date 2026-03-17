'use server';

import {
  PaginatedSolicitudListDto,
  SolicitudListParams,
  SolicitudStatus,
  SolicitudListItemDto,
} from '@/dtos/solicitudes.dto';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;

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

function getRequestConfig() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = process.env.TEMPORARY_TOKEN;

  if (!backendUrl || !token) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_URL o TEMPORARY_TOKEN no configurado');
  }

  return {
    baseUrl: backendUrl.replace(/\/+$/, ''),
    token,
  };
}

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

function mapApiItem(item: ApiSolicitudItem): SolicitudListItemDto {
  return {
    id: item.id,
    avatarUrl: item.tutorAvatarUrl || item.avatarUrl,
    tutorName: item.tutorName || 'Tutor sin nombre',
    subject: item.subject || item.materia || 'Materia no especificada',
    dateTime: item.date || item.fechaHora || new Date().toISOString(),
    modality: item.modality || item.modalidad || 'Virtual',
    price: item.pricePerHour ?? item.precioHora ?? 0,
    status: normalizeStatus(item.status),
  };
}

export async function getSolicitudesAction(
  params: SolicitudListParams = {}
): Promise<PaginatedSolicitudListDto> {
  const status = params.status ?? 'TODAS';
  const page = Math.max(DEFAULT_PAGE, params.page ?? DEFAULT_PAGE);
  const limit = Math.max(1, params.limit ?? DEFAULT_LIMIT);

  const { baseUrl, token } = getRequestConfig();
  const queryStatus = status === SolicitudStatus.ACEPTADA || status === SolicitudStatus.RECHAZADA ? 'TODAS' : status;

  const queryParams = new URLSearchParams({
    status: queryStatus,
    page: String(page),
    limit: String(limit),
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

  const data = (await response.json()) as ApiListResponse;
  const items = (data.items ?? data.data ?? []).map(mapApiItem);
  const hu33Items = items.filter(
    (item) => item.status === SolicitudStatus.PENDIENTE || item.status === SolicitudStatus.EXPIRADA
  );

  const finalItems =
    status === SolicitudStatus.PENDIENTE || status === SolicitudStatus.EXPIRADA
      ? hu33Items.filter((item) => item.status === status)
      : hu33Items;

  return {
    items: finalItems,
    total: finalItems.length,
    page: data.currentPage ?? data.page ?? page,
    limit: data.itemsPerPage ?? data.limit ?? limit,
  };
}
