'use server';

import { getTutoriaSeed } from '@/seed/TutoriasSeedData';
import { TutorialDetailDto } from '@/interfaces/tutorial/tutorial';

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
  await new Promise((resolve) => setTimeout(resolve, 300));

  const tutoria = getTutoriaSeed(tutoriaId);

  if (!tutoria) {
    return null;
  }

  return {
    id: tutoria.id,
    studentName: tutoria.estudiante.nombre,
    studentInitials: toInitials(tutoria.estudiante.nombre),
    offerTitle: tutoria.materia,
    subject: tutoria.materia,
    date: formatDate(tutoria.fecha),
    time: tutoria.hora,
    modality: tutoria.tipo,
    price: tutoria.precioPorHora,
    currency: 'USD',
    locationOrLink: tutoria.lugar || 'No especificado',
    message: tutoria.mensajeEstudiante || 'Sin mensaje',
    status: tutoria.estado,
    studentRating: tutoria.calificacionEstudiante,
    studentComment: tutoria.comentarioEstudiante,
  };

  // const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  // const token = await getServerToken();
  //
  // if (!backendBaseUrl || !token) {
  //   return null;
  // }
  //
  // try {
  //   const normalizedBase = backendBaseUrl.replace(/\/+$/, '');
  //   const endpoint = `${normalizedBase}/tutorias/${tutoriaId}`;
  //
  //   const response = await fetch(endpoint, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     cache: 'no-store',
  //   });
  //
  //   if (response.status === 404) {
  //     return null;
  //   }
  //
  //   if (!response.ok) {
  //     throw new Error(`Error HTTP ${response.status}`);
  //   }
  //
  //   return (await response.json()) as TutorialDetailDto;
  // } catch {
  //   return null;
  // }
}
