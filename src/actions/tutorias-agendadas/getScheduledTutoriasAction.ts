'use server';

import { getServerToken } from '@/lib/server-auth';
import { getScheduledTutoriasSeedData } from '@/seed/scheduled-tutorias';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';

type GetScheduledTutoriasResult = {
  data: TutoriasAgendadasDTO[];
  totalProximas: number;
  currentPage: number;
  totalPages: number;
  error?: string;
};

type BackendAgendaItem = {
  id: string;
  tutorName?: string;
  tutorAvatarUrl?: unknown;
  subjectName?: string;
  date?: string;
  time?: string;
  modality?: 'Virtual' | 'Presencial' | string;
  status?: string;
};

type BackendAgendaResponse = {
  proximas?: BackendAgendaItem[];
  anteriores?: BackendAgendaItem[];
  totalProximas?: number;
  totalAnteriores?: number;
  currentPage?: number;
  totalPagesAnteriores?: number;
};

function safeAvatarUrl(value: unknown): string {
  return typeof value === 'string' && value.trim().length > 0
    ? value
    : 'https://randomuser.me/api/portraits/lego/2.jpg';
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

function toFechaHora(item: BackendAgendaItem): { fecha: string; hora: string } {
  if (item.date) {
    const dateObject = new Date(item.date);
    if (!Number.isNaN(dateObject.getTime())) {
      const fecha = dateObject.toISOString().slice(0, 10);
      const hora = item.time || dateObject.toISOString().slice(11, 16);
      return { fecha, hora };
    }
  }

  return {
    fecha: '2099-01-01',
    hora: item.time || '00:00',
  };
}

function toModalidad(modality?: string): 'Virtual' | 'Presencial' {
  const normalized = (modality ?? '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();

  return normalized === 'PRESENCIAL' ? 'Presencial' : 'Virtual';
}

function mapAgendaItem(item: BackendAgendaItem, estado: 'AGENDADA' | 'COMPLETADA'): TutoriasAgendadasDTO {
  const { nombre, apellido } = splitTutorName(item.tutorName);
  const { fecha, hora } = toFechaHora(item);

  return {
    id: item.id,
    materia: item.subjectName ?? 'Materia no especificada',
    fecha,
    hora,
    modalidad: toModalidad(item.modality),
    tarifa: 0,
    tutor: {
      id: 'unknown-tutor',
      nombre,
      apellido,
      fotoUrl: safeAvatarUrl(item.tutorAvatarUrl),
    },
    estado,
  };
}

export async function getScheduledTutoriasAction(page = 1, limit = 10): Promise<GetScheduledTutoriasResult> {
  const authToken = await getServerToken();
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  if (!authToken) {
    return {
      data: [],
      totalProximas: 0,
      currentPage: safePage,
      totalPages: 1,
      error: 'No se encontro token de autenticacion para consultar tutorias agendadas.',
    };
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!backendUrl) {
      const seedData = getScheduledTutoriasSeedData().filter((item) => item.estado === 'AGENDADA');
      return {
        data: seedData,
        totalProximas: seedData.length,
        currentPage: 1,
        totalPages: Math.max(1, Math.ceil(seedData.length / safeLimit)),
        error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada. Se usa seed.',
      };
    }

    const normalizedBase = backendUrl.replace(/\/+$/, '');
    const query = new URLSearchParams({
      page: String(safePage),
      limit: String(safeLimit),
    });

    const response = await fetch(`${normalizedBase}/estudiante/agenda?${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      let apiError = 'No se pudieron obtener las tutorias agendadas.';

      try {
        const errorData = await response.json() as { message?: string };
        apiError = errorData.message ?? apiError;
      } catch {
        apiError = response.statusText || apiError;
      }

      return {
        data: [],
        totalProximas: 0,
        currentPage: safePage,
        totalPages: 1,
        error: apiError,
      };
    }

    const payload = (await response.json()) as BackendAgendaResponse;
    const proximas = (payload.proximas ?? []).map((item) => mapAgendaItem(item, 'AGENDADA'));
    const anteriores = (payload.anteriores ?? []).map((item) => mapAgendaItem(item, 'COMPLETADA'));
    const totalProximas = payload.totalProximas ?? proximas.length;
    const pagesByProximas = Math.max(1, Math.ceil(totalProximas / safeLimit));

    return {
      data: [...proximas, ...anteriores],
      totalProximas,
      currentPage: payload.currentPage ?? safePage,
      totalPages: Math.max(pagesByProximas, payload.totalPagesAnteriores ?? 1),
    };
  } catch {
    const seedData = getScheduledTutoriasSeedData().filter((item) => item.estado === 'AGENDADA');

    return {
      data: seedData,
      totalProximas: seedData.length,
      currentPage: 1,
      totalPages: Math.max(1, Math.ceil(seedData.length / safeLimit)),
      error: 'Error de red o servidor al intentar obtener las tutorias agendadas. Se usa seed.',
    };
  }
}
