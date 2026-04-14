'use server';

import { TutorialDetailDto } from '@/interfaces/tutorial/tutorial';
import { getServerToken } from '@/lib/server-auth';

type BackendDetalleTutoriaResponse = {
  id: string;
  student: {
    name: string;
    avatar: string;
  };
  subject: string;
  date: string;
  time: string;
  modality: 'Presencial' | 'Virtual' | string;
  meetingLink: string | null;
  location: string | null;
  pricePerHour: string;
  studentMessage: string | null;
  status?: string;
  calificacionEstudiante?: number | null;
  comentarioEstudiante?: string | null;
  resenaFecha?: string | null;
};

function parsePricePerHour(pricePerHour: string): number {
  const match = (pricePerHour || '').match(/[\d]+(?:\.\d+)?/);

  if (!match) {
    return 0;
  }

  return Number.parseFloat(match[0]);
}

function toInitials(name: string): string {
  const cleaned = (name || '').trim();

  if (!cleaned) {
    return 'NA';
  }

  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';

  return `${first}${second}`.toUpperCase();
}

function formatDate(dateValue: string): string {
  const parsed = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

export async function getDetalleTutoriaAction(tutoriaId: string): Promise<TutorialDetailDto | null> {
  if (!tutoriaId.trim()) {
    return null;
  }

  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = await getServerToken();

  if (!backendBaseUrl || !token) {
    return null;
  }

  try {
    const normalizedBase = backendBaseUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBase}/tutorias/${tutoriaId}`;

    const response = await fetch(endpoint, {
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
      throw new Error(`Error HTTP ${response.status}`);
    }

    const payload = (await response.json()) as BackendDetalleTutoriaResponse;
    const normalizedStatus = (payload.status || '').toLowerCase();
    let estado: 'Completada' | 'Inasistencia' | 'SIN_CONFIRMAR' = 'SIN_CONFIRMAR';
    if (normalizedStatus === 'completada' || normalizedStatus === 'completed') {
      estado = 'Completada';
    } else if (normalizedStatus === 'inasistencia') {
      estado = 'Inasistencia';
    }
    const studentName = payload.student?.name || 'Estudiante';
    const modality = (payload.modality || '').toLowerCase() === 'virtual' ? 'Virtual' : 'Presencial';
    const locationOrLink = modality === 'Virtual'
      ? (payload.meetingLink || 'No especificado')
      : (payload.location || 'No especificado');

    return {
      id: payload.id,
      studentName,
      studentInitials: toInitials(studentName),
      offerTitle: payload.subject,
      subject: payload.subject,
      date: formatDate(payload.date),
      time: payload.time,
      modality,
      price: parsePricePerHour(payload.pricePerHour),
      currency: 'USD',
      locationOrLink,
      message: payload.studentMessage || 'Sin mensaje',
      estado,
      studentRating: payload.calificacionEstudiante ?? null,
      studentComment: payload.comentarioEstudiante ?? null,
      reviewDate: payload.resenaFecha ?? null,
    };
  } catch {
    return null;
  }
}
