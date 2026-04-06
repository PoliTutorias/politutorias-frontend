'use server';

import type {
  HistorialQueryParams,
  HistorialApiResponse,
  TutoriaHistorialListDTO,
  TutoriaDetalleDTO,
} from '@/interfaces/historial/HistorialTypes';
import { getServerToken } from '@/lib/server-auth';

// ─── Tipos de respuesta del backend (historial listado) ──
type BackendHistorialItem = {
  id: string;
  tutorName: string;
  subjectName: string;
  date: string;
  time: string;
  status: string;
  pricePerHour: string;
};

type BackendPaginatedResponse = {
  paginatedData: {
    items: BackendHistorialItem[];
    total: number;
    page: number;
    lastPage: number;
  };
};

// ─── Helpers de mapeo ──
function splitTutorName(fullName: string): { nombre: string; apellido: string } {
  const parts = (fullName ?? '').trim().split(/\s+/);
  if (parts.length <= 1) return { nombre: parts[0] || '', apellido: '' };
  return { nombre: parts[0], apellido: parts.slice(1).join(' ') };
}

function normalizeStatus(status: string): 'COMPLETADA' | 'INASISTENCIA' {
  const upper = (status ?? '').trim().toUpperCase();
  if (upper === 'INASISTENCIA') return 'INASISTENCIA';
  return 'COMPLETADA';
}

function generateAvatarUrl(fullName: string): string {
  const encoded = encodeURIComponent(fullName.trim());
  return `https://ui-avatars.com/api/?name=${encoded}&background=0D8ABC&color=fff&size=128&bold=true&rounded=true`;
}

function mapBackendHistorialItem(item: BackendHistorialItem): TutoriaHistorialListDTO {
  const { nombre, apellido } = splitTutorName(item.tutorName);
  return {
    id: item.id,
    materia: item.subjectName,
    tutor: {
      id: 'tutor-' + item.id,
      nombre,
      apellido,
      fotoUrl: generateAvatarUrl(item.tutorName),
    },
    fecha: item.date,
    hora: item.time,
    estado: normalizeStatus(item.status),
  };
}

export async function fetchHistorialAction(
  queryParams: HistorialQueryParams,
): Promise<HistorialApiResponse<TutoriaHistorialListDTO[]>> {
  const {
    page = 1,
    limit = 5,
  } = queryParams;

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!backendUrl) {
      throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurada.');
    }

    const token = await getServerToken();
    if (!token) {
      return {
        success: false,
        data: [],
        total: 0,
        page,
        limit,
        message: 'No se encontró sesión activa.',
      };
    }

    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(limit));

    const normalizedBase = backendUrl.replace(/\/+$/, '');
    const response = await fetch(
      `${normalizedBase}/tutorias/estudiante/historial?${params}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        (errorData as { message?: string }).message ??
        `Error HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    const payload = (await response.json()) as BackendPaginatedResponse;
    const { paginatedData } = payload;

    const items = (paginatedData.items ?? []).map(mapBackendHistorialItem);

    return {
      success: true,
      data: items,
      total: paginatedData.total ?? 0,
      page: paginatedData.page ?? page,
      limit,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      total: 0,
      page,
      limit,
      message:
        error instanceof Error
          ? error.message
          : 'Error inesperado al procesar la solicitud.',
    };
  }

  // ─── Seed data (deshabilitado tras integración con backend real) ──
  // import { getHistorialTutoriasSeedData } from '@/seed/HistorialTutoriasSeedData';
  // const allData = getHistorialTutoriasSeedData();
  // const filtered = allData.filter((t) => status.includes(t.estado));
  // const sorted = [...filtered].sort((a, b) => {
  //   const dateA = new Date(a.fecha).getTime();
  //   const dateB = new Date(b.fecha).getTime();
  //   return orderDirection === 'ASC' ? dateA - dateB : dateB - dateA;
  // });
  // const total = sorted.length;
  // const startIndex = (page - 1) * limit;
  // const paginated = sorted.slice(startIndex, startIndex + limit);
  // return { success: true, data: paginated, total, page, limit };
}

// ─── Tipos de respuesta del backend (detalle) ──
type BackendTutorDetail = {
  name: string;
  avatar: string;
};

type BackendReview = {
  rating: number;
  comment: string;
  createdAt: string;
};

type BackendDetalleResponse = {
  id: string;
  tutor: BackendTutorDetail;
  subject: string;
  date: string;
  time: string;
  modality: string;
  meetingLink: string | null;
  location: string | null;
  pricePerHour: string;
  studentMessage: string;
  status: string;
  resena?: BackendReview | null;
};

function parsePricePerHour(priceStr: string): number {
  const match = (priceStr ?? '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function mapBackendDetalle(raw: BackendDetalleResponse): TutoriaDetalleDTO {
  const { nombre, apellido } = splitTutorName(raw.tutor.name);
  return {
    id: raw.id,
    materia: raw.subject,
    tutor: {
      id: 'tutor-' + raw.id,
      nombre,
      apellido,
      fotoUrl: raw.tutor.avatar || generateAvatarUrl(raw.tutor.name),
    },
    fecha: raw.date,
    hora: raw.time,
    modalidad: raw.modality,
    precioPorHora: parsePricePerHour(raw.pricePerHour),
    enlaceReunion: raw.meetingLink ?? null,
    ubicacion: raw.location ?? null,
    mensajeEstudiante: raw.studentMessage ?? '',
    estado: normalizeStatus(raw.status),
    ...(raw.resena
      ? {
          resena: {
            calificacion: raw.resena.rating,
            comentario: raw.resena.comment,
            fechaCreacion: raw.resena.createdAt,
          },
        }
      : {}),
  };
}

export async function fetchDetalleAction(
  tutoriaId: string,
): Promise<HistorialApiResponse<TutoriaDetalleDTO | null>> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!backendUrl) {
      throw new Error('NEXT_PUBLIC_BACKEND_API_URL no está configurada.');
    }

    const token = await getServerToken();
    if (!token) {
      return {
        success: false,
        data: null,
        total: 0,
        page: 1,
        limit: 1,
        message: 'No se encontró sesión activa.',
      };
    }

    const normalizedBase = backendUrl.replace(/\/+$/, '');
    const response = await fetch(
      `${normalizedBase}/tutorias/estudiante/${encodeURIComponent(tutoriaId)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );

    if (response.status === 404) {
      return {
        success: false,
        data: null,
        total: 0,
        page: 1,
        limit: 1,
        message: 'Tutoría no encontrada o no pertenece al estudiante.',
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        (errorData as { message?: string }).message ??
        `Error HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    const raw = (await response.json()) as BackendDetalleResponse;
    const detalle = mapBackendDetalle(raw);

    return {
      success: true,
      data: detalle,
      total: 1,
      page: 1,
      limit: 1,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      total: 0,
      page: 1,
      limit: 1,
      message:
        error instanceof Error
          ? error.message
          : 'Error inesperado al procesar la solicitud.',
    };
  }

  // ─── Seed data (deshabilitado tras integración con backend real) ──
  // import { getTutoriaDetalleSeedData } from '@/seed/TutoriaDetalleSeedData';
  // const detalle = getTutoriaDetalleSeedData(tutoriaId);
  // if (!detalle) return { success: false, data: null, total: 0, page: 1, limit: 1, message: 'Tutoría no encontrada.' };
  // return { success: true, data: detalle, total: 1, page: 1, limit: 1 };
}
