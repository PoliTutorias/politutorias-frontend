'use server';

import { TutorialDetailDto } from '@/interfaces/tutorial/tutorial';
import { getServerToken } from '@/lib/server-auth';

type BackendDetalleTutoriaResponse = {
  id: string;
  estudiante: {
    id: string;
    nombre: string;
  };
  materia: string;
  fecha: string;
  hora: string;
  tipo: 'Presencial' | 'Virtual' | string;
  precioPorHora: number;
  lugar: string | null;
  mensajeEstudiante: string | null;
  estado?: string;
  calificacionEstudiante?: number | null;
  comentarioEstudiante?: string | null;
};

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
    const normalizedStatus = (payload.estado || '').toLowerCase();
    const estado = normalizedStatus === 'completada' || normalizedStatus === 'completed' ? 'Completada' : 'SIN_CONFIRMAR';

    return {
      id: payload.id,
      studentName: payload.estudiante?.nombre || 'Estudiante',
      studentInitials: toInitials(payload.estudiante?.nombre || 'Estudiante'),
      offerTitle: payload.materia,
      subject: payload.materia,
      date: formatDate(payload.fecha),
      time: payload.hora,
      modality: (payload.tipo || '').toLowerCase() === 'virtual' ? 'Virtual' : 'Presencial',
      price: payload.precioPorHora,
      currency: 'USD',
      locationOrLink: payload.lugar || 'No especificado',
      message: payload.mensajeEstudiante || 'Sin mensaje',
      estado,
      studentRating: payload.calificacionEstudiante ?? null,
      studentComment: payload.comentarioEstudiante ?? null,
    };
  } catch {
    return null;
  }
}
