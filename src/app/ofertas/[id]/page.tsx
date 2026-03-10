import { notFound } from 'next/navigation';
import HeaderComponent from '@/components/shared/Header/Header';
import OfferInfoSection from '@/components/offers/OfferInfoSection/OfferInfoSection';
import PricingContactSection from '@/components/offers/PricingContactSection/PricingContactSection';
import TutorSection from '@/components/tutor/TutorSection/TutorSection';
import ExperienceSection from '@/components/tutor/ExperienceSection/ExperienceSection';
import { DetallesOfertaDto } from '@/interfaces/offers/DetallesOfertaDto';
import { offerDetailsSeed } from '@/seed/OfferDetailsSeedData';

interface OfferDetailsPageProps {
  params: {
    id: string;
  };
}

async function getOfferDetails(offerId: string): Promise<DetallesOfertaDto | null> {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Por ahora, retornamos el seed data
  // En el futuro, aquí iría el fetch real al backend:
  /*
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ofertas/${offerId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error fetching offer details: ${response.statusText}`);
    }

    const data: DetallesOfertaDto = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getOfferDetails:', error);
    throw error;
  }
  */

  // Retornar el seed data para desarrollo
  return offerDetailsSeed;
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
