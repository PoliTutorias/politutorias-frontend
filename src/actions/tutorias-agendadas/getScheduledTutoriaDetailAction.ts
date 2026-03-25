'use server';

import { getServerToken } from '@/lib/server-auth';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';

type GetScheduledTutoriaDetailResult = {
  data: TutoriasAgendadasDTO | null;
  error?: string;
};

type BackendTutoriaDetail = {
  id: string;
  tutorName?: string;
  tutorAvatarUrl?: unknown;
  subjectName?: string;
  date?: string;
  time?: string;
  modality?: 'Virtual' | 'Presencial' | string;
  status?: string;
  meetingLink?: unknown;
  meetingLocation?: unknown;
  studentMessage?: string;
  price?: number;
};

function safeString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
}

function splitTutorName(fullName?: string): { nombre: string; apellido: string } {
  const normalized = (fullName ?? '').trim();

  if (!normalized) {
    return { nombre: 'Tutor', apellido: 'Asignado' };
  }

  const parts = normalized.split(/\s+/);
  const [nombre, ...rest] = parts;

  return {
    nombre,
    apellido: rest.join(' ') || 'Tutor',
  };
}

function toEstado(status?: string): 'AGENDADA' | 'COMPLETADA' | 'CANCELADA' {
  const normalized = (status ?? '').toUpperCase();

  if (normalized === 'CANCELADA') {
    return 'CANCELADA';
  }

  if (normalized === 'COMPLETADA') {
    return 'COMPLETADA';
  }

  return 'AGENDADA';
}

export async function getScheduledTutoriaDetailAction(tutoriaId: string): Promise<GetScheduledTutoriaDetailResult> {
  const authToken = await getServerToken();

  if (!authToken) {
    return { data: null, error: 'No se encontro token de autenticacion.' };
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!backendUrl) {
    return { data: null, error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada.' };
  }

  try {
    const normalizedBase = backendUrl.replace(/\/+$/, '');
    const response = await fetch(`${normalizedBase}/estudiante/agenda/${tutoriaId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      let apiError = 'No se pudo obtener el detalle de la tutoria.';

      try {
        const errorData = (await response.json()) as { message?: string };
        apiError = errorData.message ?? apiError;
      } catch {
        apiError = response.statusText || apiError;
      }

      return { data: null, error: apiError };
    }

    const payload = (await response.json()) as BackendTutoriaDetail;
    const tutor = splitTutorName(payload.tutorName);
    const dateObject = payload.date ? new Date(payload.date) : null;
    const fecha = dateObject && !Number.isNaN(dateObject.getTime())
      ? dateObject.toISOString().slice(0, 10)
      : '2099-01-01';

    return {
      data: {
        id: payload.id,
        materia: payload.subjectName ?? 'Materia no especificada',
        fecha,
        hora: payload.time ?? (dateObject ? dateObject.toISOString().slice(11, 16) : '00:00'),
        modalidad: payload.modality === 'Presencial' ? 'Presencial' : 'Virtual',
        tarifa: payload.price ?? 0,
        tutor: {
          id: 'unknown-tutor',
          nombre: tutor.nombre,
          apellido: tutor.apellido,
          fotoUrl: safeString(payload.tutorAvatarUrl) ?? 'https://randomuser.me/api/portraits/lego/2.jpg',
        },
        estado: toEstado(payload.status),
        enlaceReunion: safeString(payload.meetingLink),
        direccion: safeString(payload.meetingLocation),
        mensajeEstudiante: payload.studentMessage,
      },
    };
  } catch {
    return { data: null, error: 'Error de red al consultar el detalle de la tutoria.' };
  }
}
