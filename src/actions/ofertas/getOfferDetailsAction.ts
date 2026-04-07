'use server';

import { DetallesOfertaDto } from '@/interfaces/offers/DetallesOfertaDto';
import { OfertaBackendDto } from '@/interfaces/offers/OfertaBackendDto';

/**
 * Mapea abreviaturas de días del backend a nombres completos en español
 */
function mapDayAbbreviationToFull(dayAbbr: string): string {
  const dayMap: Record<string, string> = {
    'Lun': 'Lunes',
    'Mar': 'Martes',
    'Mié': 'Miércoles',
    'Jue': 'Jueves',
    'Vie': 'Viernes',
    'Sáb': 'Sábado',
    'Dom': 'Domingo',
    // Manejar también nombres completos si vienen así
    'Lunes': 'Lunes',
    'Martes': 'Martes',
    'Miércoles': 'Miércoles',
    'Jueves': 'Jueves',
    'Viernes': 'Viernes',
    'Sábado': 'Sábado',
    'Domingo': 'Domingo',
  };
  return dayMap[dayAbbr] || dayAbbr;
}

/**
 * Mapea la respuesta del backend (OfertaBackendDto) a nuestro DTO interno (DetallesOfertaDto)
 */
function mapBackendOfertaToDetallesOferta(
  backendOferta: OfertaBackendDto
): DetallesOfertaDto {
  return {
    id: backendOferta.id,
    title: backendOferta.title,
    modality: backendOferta.modality,
    description: backendOferta.description,
    categories: backendOferta.categories.map((name) => ({
      name,
    })),
    availability: backendOferta.availability.map((av) => ({
      day: mapDayAbbreviationToFull(av.day),
      time: av.hour,
    })),
    pricePerHour: backendOferta.price,
    tutor: {
      id: backendOferta.tutor.id,
      name: backendOferta.tutor.nombreCompleto,
      profileImageUrl: backendOferta.tutor.fotoPerfil,
      career: backendOferta.tutor.semestreActual,
      semester: backendOferta.tutor.semestreActual,
      rating: backendOferta.tutor.calificacionPromedio,
      reviewsCount: backendOferta.tutor.numResenas,
      description: backendOferta.tutor.biografiaCorta,
      phoneNumber: backendOferta.tutor.numeroWhatsapp,
      masteredSubjects: backendOferta.tutor.materias.map((materia) => ({
        name: materia.nombre,
      })),
      experience: backendOferta.tutor.experiencias.map((exp) => ({
        position: exp.puesto,
        institution: exp.institucion,
        period: `${exp.fechaInicio} — ${exp.fechaFin}`,
      })),
    },
  };
}

/**
 * Server action para obtener los detalles de una oferta
 */
export async function getOfferDetailsAction(
  offerId: string
): Promise<{ success: boolean; data?: DetallesOfertaDto; error?: string }> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!backendUrl) {
    const errorMsg = '❌ NEXT_PUBLIC_BACKEND_API_URL not configured';
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  try {

    const response = await fetch(`${backendUrl}ofertas/${offerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorMsg = `❌ Backend error: ${response.status} ${response.statusText}`;
      console.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    const backendData: OfertaBackendDto = await response.json();
    const mappedOferta = mapBackendOfertaToDetallesOferta(backendData);

    return { success: true, data: mappedOferta };
  } catch (error) {
    const errorMsg = `❌ Error fetching offer: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}
