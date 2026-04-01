'use server';

import { TutorialDetailDto, TutorialEstado } from '@/interfaces/tutorial/tutorial';
import { getServerToken } from '@/lib/server-auth';

type BackendTutorialDetailResponse = {
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
  studentMessage: string;
  status?: string;
};

function mapEstado(status?: string): TutorialEstado {
  if (!status) return 'SIN_CONFIRMAR';
  const normalized = status.toLowerCase().trim();
  if (normalized === 'sin confirmar' || normalized === 'sin_confirmar') return 'SIN_CONFIRMAR';
  if (normalized === 'pendiente') return 'Pendiente';
  if (normalized === 'inasistencia') return 'Inasistencia';
  if (normalized === 'completada' || normalized === 'completed') return 'Completada';
  if (normalized === 'cancelada') return 'Cancelada';
  return 'SIN_CONFIRMAR';
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

function parsePricePerHour(pricePerHour: string): number {
  const match = (pricePerHour || '').match(/[\d]+(?:\.\d+)?/);

  if (!match) {
    return 0;
  }

  return Number.parseFloat(match[0]);
}

export async function getTutorialDetailAction(id: string): Promise<TutorialDetailDto | null> {
  if (!id.trim()) {
    return null;
  }

  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const token = await getServerToken();

  if (!backendBaseUrl || !token) {
    return null;
  }

  try {
    const normalizedBase = backendBaseUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBase}/tutorias/${id}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const payload = (await response.json()) as BackendTutorialDetailResponse;
    const studentName = payload.student?.name ?? 'Estudiante';
    const normalizedModality = payload.modality?.toLowerCase();

    return {
      id: payload.id,
      studentName,
      studentInitials: toInitials(studentName),
      offerTitle: payload.subject,
      subject: payload.subject,
      date: payload.date,
      time: payload.time,
      modality: normalizedModality === 'virtual' ? 'Virtual' : 'Presencial',
      price: parsePricePerHour(payload.pricePerHour),
      currency: 'USD',
      locationOrLink: payload.meetingLink || payload.location || 'No especificado',
      message: payload.studentMessage || 'Sin mensaje',
      estado: mapEstado(payload.status),
    };
  } catch {
    return null;
  }
}
