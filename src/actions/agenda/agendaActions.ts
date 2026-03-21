'use server';

import type { InitialAgendaData, SelectedDayInfo } from '@/interfaces/agenda/AgendaInterfaces';
import type { SessionDetailDTO } from '@/interfaces/session/SessionInterfaces';
import { getServerToken } from '@/lib/server-auth';
import {
  initialAgendaDataSeed,
  monthlySessionsSeed,
  sessionDetailDTOSeeds,
} from '@/seed/AgendaSeedData';
import { getTutorIdFromSession } from '@/utils/auth/authUtils';

type BackendAgendaDay = {
  day: number;
  sessionCount: number;
  labels: string[];
};

type BackendUpcomingSession = {
  id: string;
  subject: string;
  studentName: string;
  date: string;
  hour: string;
  modality: string;
  status: string;
};

type BackendAgendaResponse = {
  year: number;
  month: number;
  totalSessions: number;
  calendarDays: BackendAgendaDay[];
  upcomingSessions: BackendUpcomingSession[];
};

type BackendDaySession = {
  id: string;
  subject: string;
  hour: string;
  studentName: string;
  modality: string;
};

type BackendDaySessionsResponse = {
  date: string;
  sessionCount: number;
  sessions: BackendDaySession[];
};

type BackendSessionDetailsResponse = {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  date: string;
  hour: string;
  modality: string;
  pricePerHour: number;
  meetingLink?: string | null;
  meetingLocation?: string | null;
  studentMessage: string;
  status: string;
};

type AgendaActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

function buildSelectedDaySeed(dateString: string): SelectedDayInfo {
  const sessions = monthlySessionsSeed.filter((session) => session.date === dateString);

  return {
    date: dateString,
    totalSessions: sessions.length,
    sessions,
  };
}

function toStatus(value?: string): 'PENDING' | 'COMPLETED' | 'CANCELLED' {
  const normalized = (value ?? '').toUpperCase();

  if (normalized === 'COMPLETED') {
    return 'COMPLETED';
  }

  if (normalized === 'CANCELLED') {
    return 'CANCELLED';
  }

  return 'PENDING';
}

function toModality(value?: string): 'VIRTUAL' | 'PRESENCIAL' {
  const normalized = (value ?? '').toLowerCase();
  return normalized === 'presencial' ? 'PRESENCIAL' : 'VIRTUAL';
}

function monthNameEs(month: number): string {
  return new Intl.DateTimeFormat('es-CO', { month: 'long' }).format(new Date(2026, month - 1, 1));
}

function mapAgendaResponseToInitialData(payload: BackendAgendaResponse): InitialAgendaData {
  const calendarDays = payload.calendarDays.map((item) => ({
    date: `${payload.year}-${String(payload.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`,
    sessionCount: item.sessionCount,
    sessionLabels: (item.labels ?? []).map((label) => {
      const [time = '', ...subjectParts] = label.split(' ');
      return { time, subject: subjectParts.join(' ') };
    }),
  }));

  const summarySessions = (payload.upcomingSessions ?? []).map((session) => ({
    id: session.id,
    time: session.hour,
    courseName: session.subject,
    studentName: session.studentName,
    date: session.date,
    status: toStatus(session.status),
  }));

  return {
    currentMonthName: monthNameEs(payload.month),
    currentYear: payload.year,
    calendarDays,
    monthlySummary: {
      totalConfirmed: payload.totalSessions ?? summarySessions.length,
      sessions: summarySessions,
    },
  };
}

function mapDaySessionsResponse(payload: BackendDaySessionsResponse): SelectedDayInfo {
  return {
    date: payload.date,
    totalSessions: payload.sessionCount,
    sessions: (payload.sessions ?? []).map((session) => ({
      id: session.id,
      time: session.hour,
      courseName: session.subject,
      studentName: session.studentName,
      date: payload.date,
      status: 'PENDING',
    })),
  };
}

export async function fetchAgendaInitialData(): Promise<AgendaActionResult<InitialAgendaData>> {
  const tutorId = await getTutorIdFromSession();

  if (!tutorId) {
    return { success: false, error: 'No se pudo identificar al tutor autenticado.' };
  }

  try {
    const token = await getServerToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    if (!backendUrl) {
      return {
        success: true,
        data: initialAgendaDataSeed,
        error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada. Se usan datos seed.',
      };
    }

    const normalizedBase = backendUrl.replace(/\/+$/, '');
    const response = await fetch(`${normalizedBase}/tutor/agenda/${year}/${month}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return {
        success: true,
        data: initialAgendaDataSeed,
        error: 'No fue posible cargar la agenda inicial desde backend. Se usan datos seed.',
      };
    }

    const payload = (await response.json()) as BackendAgendaResponse;
    return { success: true, data: mapAgendaResponseToInitialData(payload) };
  } catch {
    return {
      success: true,
      data: initialAgendaDataSeed,
      error: 'Fallo inesperado cargando agenda inicial. Se usan datos seed.',
    };
  }
}

export async function fetchDaySessions(dateString: string): Promise<AgendaActionResult<SelectedDayInfo>> {
  const tutorId = await getTutorIdFromSession();

  if (!tutorId) {
    return { success: false, error: 'No se pudo identificar al tutor autenticado.' };
  }

  try {
    const token = await getServerToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: true,
        data: buildSelectedDaySeed(dateString),
        error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada. Se usan datos seed.',
      };
    }

    const normalizedBase = backendUrl.replace(/\/+$/, '');
    const queryParams = new URLSearchParams({ date: dateString });
    const response = await fetch(`${normalizedBase}/tutor/agenda/sessions/day?${queryParams}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return {
        success: true,
        data: buildSelectedDaySeed(dateString),
        error: 'No fue posible cargar sesiones del dia desde backend. Se usan datos seed.',
      };
    }

    const payload = (await response.json()) as BackendDaySessionsResponse;
    return { success: true, data: mapDaySessionsResponse(payload) };
  } catch {
    return {
      success: true,
      data: buildSelectedDaySeed(dateString),
      error: 'Fallo inesperado cargando sesiones del dia. Se usan datos seed.',
    };
  }
}

export async function fetchSessionDetails(sessionId: string): Promise<AgendaActionResult<SessionDetailDTO>> {
  const tutorId = await getTutorIdFromSession();

  if (!tutorId) {
    return { success: false, error: 'No se pudo identificar al tutor autenticado.' };
  }

  try {
    const token = await getServerToken();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (backendUrl) {
      const normalizedBase = backendUrl.replace(/\/+$/, '');
      const response = await fetch(`${normalizedBase}/tutor/agenda/sessions/${sessionId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: 'no-store',
      });

      if (response.ok) {
        const payload = (await response.json()) as BackendSessionDetailsResponse;

        const initials = payload.studentName
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? '')
          .join('');

        const data: SessionDetailDTO = {
          id: payload.id,
          tutorId,
          courseName: payload.subject,
          student: {
            id: payload.studentEmail || payload.id,
            name: payload.studentName,
            initials: initials || 'NA',
          },
          date: payload.date,
          time: payload.hour,
          modality: toModality(payload.modality),
          pricePerHour: payload.pricePerHour,
          studentMessage: payload.studentMessage,
          link: payload.meetingLink ?? undefined,
          location: payload.meetingLocation ?? undefined,
          status: toStatus(payload.status),
        };

        return { success: true, data };
      }
    }
  } catch {
    // fallback to seed below
  }

  const match = sessionDetailDTOSeeds.find((session) => session.id === sessionId);

  if (!match) {
    return { success: false, error: 'No se encontro el detalle de la sesion solicitada.' };
  }

  return { success: true, data: match, error: 'Detalle cargado desde datos seed.' };
}
