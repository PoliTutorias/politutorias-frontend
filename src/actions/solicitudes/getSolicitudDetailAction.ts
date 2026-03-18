'use server';

import { SolicitudDetailDto, SolicitudStatus } from '@/dtos/solicitudes.dto';

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
  titulo?: string;
  title?: string;
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
    subject: detail.titulo || detail.title || detail.subject || detail.materia || 'Oferta sin titulo',
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

export async function getSolicitudDetailAction(solicitudId: string): Promise<SolicitudDetailDto | null> {
  if (!solicitudId) {
    return null;
  }

  const { baseUrl, token } = getRequestConfig();

  const response = await fetch(`${baseUrl}/solicitudes/${solicitudId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
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
