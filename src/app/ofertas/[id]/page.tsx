import { notFound } from 'next/navigation';
import HeaderComponent from '@/components/shared/Header/Header';
import OfferInfoSection from '@/components/offers/OfferInfoSection/OfferInfoSection';
import PricingContactSection from '@/components/offers/PricingContactSection/PricingContactSection';
import TutorSection from '@/components/tutor/TutorSection/TutorSection';
import ExperienceSection from '@/components/tutor/ExperienceSection/ExperienceSection';
import { DetallesOfertaDto } from '@/interfaces/offers/DetallesOfertaDto';
import { OfertaBackendDto } from '@/interfaces/offers/OfertaBackendDto';
import { offerDetailsSeed } from '@/seed/OfferDetailsSeedData';

interface OfferDetailsPageProps {
  params: {
    id: string;
  };
}

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

async function getOfferDetails(offerId: string): Promise<DetallesOfertaDto | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!backendUrl) {
    console.error('NEXT_PUBLIC_BACKEND_API_URL is not defined');
    return offerDetailsSeed;
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

    // Manejar respuesta 404 - Oferta no encontrada
    if (response.status === 404) {
      return null;
    }

    // Manejar respuesta 400 - Validación fallida (UUID inválido)
    if (response.status === 400) {
      return null;
    }

    // Manejar otras respuestas con error
    if (!response.ok) {
      console.error(
        `Error fetching offer details: ${response.status} ${response.statusText}`
      );
      throw new Error(`Error fetching offer details: ${response.statusText}`);
    }

    const backendData: OfertaBackendDto = await response.json();
    const mappedOferta = mapBackendOfertaToDetallesOferta(backendData);

    return mappedOferta;
  } catch (error) {
    console.error('Error in getOfferDetails:', error);
    // En caso de error, retornar seed data si está disponible
    return offerDetailsSeed;
  }
}

export default async function DetallesOfertaPage({
  params,
}: OfferDetailsPageProps) {
  const resolvedParams = await params;
  const offerDetails = await getOfferDetails(resolvedParams.id);

  if (!offerDetails) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderComponent />
      <main className="container mx-auto px-12 lg:px-32 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:max-w-4xl lg:mx-auto">
          {/* Sección principal de información de la oferta */}
          <div className="lg:col-span-2">
            <OfferInfoSection
              title={offerDetails.title}
              modality={offerDetails.modality}
              description={offerDetails.description}
              categories={offerDetails.categories}
              availability={offerDetails.availability}
            />
          </div>

          {/* Panel lateral con precio */}
          <div className="lg:col-span-1">
            <PricingContactSection pricePerHour={offerDetails.pricePerHour} />
          </div>
        </div>
      </main>

      {/* Sección Sobre el Tutor con fondo gris azulado - ancho completo */}
      <section className="w-full bg-gray-100 py-8">
        <div className="container mx-auto px-12 lg:px-32">
          <div className="lg:max-w-4xl lg:mx-auto">
            <h2 className="text-2xl font-extrabold text-primary mb-6">Sobre el Tutor</h2>
            <div className="grid grid-cols-1 gap-6">
              <TutorSection tutor={offerDetails.tutor} />
              <ExperienceSection experiences={offerDetails.tutor.experience} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
