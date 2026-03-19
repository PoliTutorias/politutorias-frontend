'use server';

import { SolicitudDetailDto, SolicitudStatus } from '@/dtos/solicitudes.dto';
import { getRequestConfig } from '@/lib/server-auth';

type ApiHorario = {
  date?: string;
  time?: string;
  fecha?: string;
  hora?: string;
};

type ApiDetalleSolicitud = {
  id: string;
  studentId?: string;
  tutorId?: string;
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
  mensaje?: string;
  studentMessage?: string;
  horarios?: ApiHorario[];
  proposedSchedules?: ApiHorario[];
  acceptedMeetingLocation?: string;
  acceptedMeetingLink?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
};

type ApiSolicitudListItem = {
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
  mensaje?: string;
  studentMessage?: string;
  horarios?: ApiHorario[];
  proposedSchedules?: ApiHorario[];
};

type ApiListResponse = {
  items?: ApiSolicitudListItem[];
  data?: ApiSolicitudListItem[];
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

function mapApiDetail(detail: ApiDetalleSolicitud): SolicitudDetailDto {
  const proposedSchedules = (detail.proposedSchedules ?? detail.horarios ?? []).map((schedule) => ({
    date: schedule.date || schedule.fecha || '',
    time: schedule.time || schedule.hora || '',
  }));

  return {
    id: detail.id,
    studentId: detail.studentId || 'student-unknown',
    tutorId: detail.tutorId || 'tutor-unknown',
    avatarUrl: detail.tutorAvatarUrl || detail.avatarUrl,
    tutorName: detail.tutorName || 'Tutor sin nombre',
    subject: detail.subject || detail.materia || 'Materia no especificada',
    dateTime: detail.date || detail.fechaHora || new Date().toISOString(),
    modality: detail.modality || detail.modalidad || 'Virtual',
    price: detail.pricePerHour ?? detail.precioHora ?? 0,
    status: normalizeStatus(detail.status ?? detail.estado),
    studentMessage: detail.studentMessage || detail.mensaje || '',
    proposedSchedules,
    acceptedMeetingLocation: detail.acceptedMeetingLocation,
    acceptedMeetingLink: detail.acceptedMeetingLink,
    rejectionReason: detail.rejectionReason,
    createdAt: detail.createdAt || new Date().toISOString(),
    updatedAt: detail.updatedAt || new Date().toISOString(),
  };
}

function mapListItemToDetail(item: ApiSolicitudListItem): SolicitudDetailDto {
  const proposedSchedules = (item.proposedSchedules ?? item.horarios ?? []).map((schedule) => ({
    date: schedule.date || schedule.fecha || '',
    time: schedule.time || schedule.hora || '',
  }));

  return {
    id: item.id,
    studentId: 'student-unknown',
    tutorId: 'tutor-unknown',
    avatarUrl: item.tutorAvatarUrl || item.avatarUrl,
    tutorName: item.tutorName || 'Tutor sin nombre',
    subject: item.subject || item.materia || 'Materia no especificada',
    dateTime: item.date || item.fechaHora || new Date().toISOString(),
    modality: item.modality || item.modalidad || 'Virtual',
    price: item.pricePerHour ?? item.precioHora ?? 0,
    status: normalizeStatus(item.status ?? item.estado),
    studentMessage: item.studentMessage || item.mensaje || '',
    proposedSchedules,
    acceptedMeetingLocation: undefined,
    acceptedMeetingLink: undefined,
    rejectionReason: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function fetchSolicitudesByStatus(
  baseUrl: string,
  token: string,
  status: SolicitudStatus
): Promise<ApiSolicitudListItem[]> {
  const queryParams = new URLSearchParams({
    status,
    page: '1',
    limit: '100',
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
    return [];
  }

  const data = (await response.json()) as ApiListResponse;
  return data.items ?? data.data ?? [];
}

async function findSolicitudInListFallback(
  baseUrl: string,
  token: string,
  solicitudId: string
): Promise<SolicitudDetailDto | null> {
  const [pendingItems, expiredItems, acceptedItems, rejectedItems] = await Promise.all([
    fetchSolicitudesByStatus(baseUrl, token, SolicitudStatus.PENDIENTE),
    fetchSolicitudesByStatus(baseUrl, token, SolicitudStatus.EXPIRADA),
    fetchSolicitudesByStatus(baseUrl, token, SolicitudStatus.ACEPTADA),
    fetchSolicitudesByStatus(baseUrl, token, SolicitudStatus.RECHAZADA),
  ]);

  const matched = [...pendingItems, ...expiredItems, ...acceptedItems, ...rejectedItems].find(
    (item) => item.id === solicitudId
  );

  if (!matched) {
    return null;
  }

  return mapListItemToDetail(matched);
}

export async function getSolicitudDetailAction(solicitudId: string): Promise<SolicitudDetailDto | null> {
  if (!solicitudId) {
    return null;
  }

  const { baseUrl, token } = await getRequestConfig();

  const response = await fetch(`${baseUrl}/solicitudes/${solicitudId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const fallbackDetail = await findSolicitudInListFallback(baseUrl, token, solicitudId);
    if (fallbackDetail) {
      return fallbackDetail;
    }

    let errorMessage = 'No se pudo obtener el detalle de la solicitud';

    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message ?? errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  const data = (await response.json()) as ApiDetalleSolicitud;
  return mapApiDetail(data);
}
