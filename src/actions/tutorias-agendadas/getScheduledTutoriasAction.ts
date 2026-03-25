'use server';

import { getServerToken } from '@/lib/server-auth';
import { getScheduledTutoriasSeedData } from '@/seed/scheduled-tutorias';
import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';

type GetScheduledTutoriasResult = {
  data: TutoriasAgendadasDTO[];
  error?: string;
};

export async function getScheduledTutoriasAction(): Promise<GetScheduledTutoriasResult> {
  const authToken = await getServerToken();

  if (!authToken) {
    return {
      data: [],
      error: 'No se encontro token de autenticacion para consultar tutorias agendadas.',
    };
  }

  // Simula una latencia de red para probar estados de carga en la UI.
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: getScheduledTutoriasSeedData(),
  };

  /*
  // Respuesta esperada backend (200): TutoriasAgendadasDTO[]
  // Posibles errores: 401 Unauthorized, 403 Forbidden, 500 Internal Server Error.
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!backendUrl) {
      return {
        data: [],
        error: 'NEXT_PUBLIC_BACKEND_API_URL no esta configurada.',
      };
    }

    const normalizedBase = backendUrl.replace(/\/+$/, '');
    const response = await fetch(`${normalizedBase}/tutorias/agendadas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      cache: 'no-store',
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
        error: apiError,
      };
    }

    const payload = await response.json() as TutoriasAgendadasDTO[];
    return { data: payload };
  } catch {
    return {
      data: [],
      error: 'Error de red o servidor al intentar obtener las tutorias agendadas.',
    };
  }
  */
}
