import { Suspense } from 'react';
import { OfertasListComponent } from '@/components/ofertas/OfertasListComponent/OfertasListComponent';
import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';
import { ClientOffersWrapper } from '@/components/ofertas/ClientOffersWrapper/ClientOffersWrapper';
import { filtrarOfertasAction } from '@/actions/ofertas/filtrarOfertasAction';
import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function OffersContent() {
  // Obtener ofertas iniciales del backend (sin filtros)
  const filtrarResult = await filtrarOfertasAction({});
  const initialOffers: OfertaEntity[] = 'error' in filtrarResult ? [] : filtrarResult.ofertas;

  return (
    <ClientOffersWrapper
      initialOffers={initialOffers}
      header={<></>}
    >
      <>
        {/* Contenido sin filtros: lista completa de ofertas */}
        {initialOffers.length > 0 ? (
          <OfertasListComponent offers={initialOffers} />
        ) : (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              No hay ofertas disponibles
            </h2>
            <p className="text-gray-600">
              Vuelve a intentar más tarde
            </p>
          </div>
        )}
      </>
    </ClientOffersWrapper>
  );
}

function ErrorContent() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          Error al cargar las ofertas
        </h2>
        <p className="text-gray-600">
          Intenta nuevamente más tarde
        </p>
      </div>
    </div>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <AppNavBar role="student" activeItem="explorar" />
      <main>
        {children}
      </main>
    </div>
  );
}

export default async function PoliTutoriasPage({ searchParams }: PageProps) {
  let hasError = false;

  try {
    await searchParams;
  } catch (error) {
    console.error('Error al procesar parámetros de búsqueda:', error);
    hasError = true;
  }

  if (hasError) {
    return (
      <PageLayout>
        <ErrorContent />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-1/2" />
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }>
        <OffersContent />
      </Suspense>
    </PageLayout>
  );
}
