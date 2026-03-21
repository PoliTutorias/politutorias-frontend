'use server';

import type { InitialAgendaData, SelectedDayInfo } from '@/interfaces/agenda/AgendaInterfaces';
import type { SessionDetailDTO } from '@/interfaces/session/SessionInterfaces';
import { getServerToken } from '@/lib/server-auth';
import {
  initialAgendaDataSeed,
  monthlySessionsSeed,
  selectedDayInfoSeed,
  sessionDetailDTOSeeds,
} from '@/seed/AgendaSeedData';
import { getTutorIdFromSession } from '@/utils/auth/authUtils';

type AgendaActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function fetchAgendaInitialData(): Promise<AgendaActionResult<InitialAgendaData>> {
  const tutorId = await getTutorIdFromSession();

  if (!tutorId) {
    return { success: false, error: 'No se pudo identificar al tutor autenticado.' };
  }

  // Development phase: use seed data.
  return { success: true, data: initialAgendaDataSeed };

  // Integration phase: real backend fetch.
  // try {
  //   const token = await getServerToken();
  //   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //
  //   if (!backendUrl) {
  //     return { success: false, error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada.' };
  //   }
  //
  //   const normalizedBase = backendUrl.replace(/\/+$/, '');
  //   const response = await fetch(`${normalizedBase}/tutor/agenda/${tutorId}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     },
  //     next: { revalidate: 0 },
  //   });
  //
  //   if (!response.ok) {
  //     return { success: false, error: 'No fue posible cargar la agenda inicial.' };
  //   }
  //
  //   const data = (await response.json()) as InitialAgendaData;
  //   return { success: true, data };
  // } catch {
  //   return { success: false, error: 'Fallo inesperado cargando agenda inicial.' };
  // }
}

export async function fetchDaySessions(dateString: string): Promise<AgendaActionResult<SelectedDayInfo>> {
  const tutorId = await getTutorIdFromSession();

  if (!tutorId) {
    return { success: false, error: 'No se pudo identificar al tutor autenticado.' };
  }

  const sessionsForDate = monthlySessionsSeed.filter((session) => session.date === dateString);

  if (sessionsForDate.length > 0) {
    return {
      success: true,
      data: {
        date: dateString,
        totalSessions: sessionsForDate.length,
        sessions: sessionsForDate,
      },
    };
  }

  if (dateString === selectedDayInfoSeed.date) {
    return { success: true, data: selectedDayInfoSeed };
  }

  return {
    success: true,
    data: {
      date: dateString,
      totalSessions: 0,
      sessions: [],
    },
  };

  // Integration phase: real backend fetch.
  // try {
  //   const token = await getServerToken();
  //   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //
  //   if (!backendUrl) {
  //     return { success: false, error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada.' };
  //   }
  //
  //   const normalizedBase = backendUrl.replace(/\/+$/, '');
  //   const queryParams = new URLSearchParams({ tutorId, date: dateString });
  //   const response = await fetch(`${normalizedBase}/tutor/agenda/sessions?${queryParams}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     },
  //     next: { revalidate: 0 },
  //   });
  //
  //   if (!response.ok) {
  //     return { success: false, error: 'No fue posible cargar sesiones para el dia seleccionado.' };
  //   }
  //
  //   const data = (await response.json()) as SelectedDayInfo;
  //   return { success: true, data };
  // } catch {
  //   return { success: false, error: 'Fallo inesperado cargando sesiones del dia.' };
  // }
}

export async function fetchSessionDetails(sessionId: string): Promise<AgendaActionResult<SessionDetailDTO>> {
  const tutorId = await getTutorIdFromSession();

  if (!tutorId) {
    return { success: false, error: 'No se pudo identificar al tutor autenticado.' };
  }

  const match = sessionDetailDTOSeeds.find((session) => session.id === sessionId);

  if (!match) {
    return { success: false, error: 'No se encontro el detalle de la sesion solicitada.' };
  }

  return { success: true, data: match };

  // Integration phase: real backend fetch.
  // try {
  //   const token = await getServerToken();
  //   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  //
  //   if (!backendUrl) {
  //     return { success: false, error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada.' };
  //   }
  //
  //   const normalizedBase = backendUrl.replace(/\/+$/, '');
  //   const queryParams = new URLSearchParams({ tutorId });
  //   const response = await fetch(`${normalizedBase}/tutor/sessions/${sessionId}?${queryParams}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     },
  //     cache: 'no-store',
  //   });
  //
  //   if (!response.ok) {
  //     return { success: false, error: 'No fue posible cargar el detalle de la sesion.' };
  //   }
  //
  //   const data = (await response.json()) as SessionDetailDTO;
  //   return { success: true, data };
  // } catch {
  //   return { success: false, error: 'Fallo inesperado cargando detalle de la sesion.' };
  // }
}
