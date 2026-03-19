import { Suspense } from 'react';
import { OfertasListComponent } from '@/components/ofertas/OfertasListComponent/OfertasListComponent';
import { ClientOffersWrapper } from '@/components/ofertas/ClientOffersWrapper/ClientOffersWrapper';
import { filtrarOfertasAction } from '@/actions/ofertas/filtrarOfertasAction';
import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import Link from 'next/link';
import clsx from 'clsx';
import { dancingScript, montserrat } from '@/lib/fonts';

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
      <header className="bg-primary px-6 py-4 text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <Link href="/encuentra-tutoria" className="flex items-center">
            <span className={`${montserrat.className} antialiased text-3xl font-extrabold leading-none text-white`}>
              Poli
            </span>
            <span className={`${dancingScript.className} antialiased text-base text-yellow`}>
              Tutorías
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-6 text-sm font-semibold">
              <Link
                href="/encuentra-tutoria"
                className={clsx(
                  'border-b-2 pb-1 transition-colors',
                  'border-yellow text-white',
                  'hover:text-white'
                )}
              >
                Explorar
              </Link>
              <Link
                href="/dashboard/solicitudes"
                className="border-b-2 border-transparent pb-1 text-slate-300 transition-colors hover:text-white"
              >
                Mis Solicitudes
              </Link>
            </nav>

            <div className="h-8 border-l border-slate-500" />

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-500 bg-slate-700/30 px-3 py-1.5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow text-xs font-bold text-primary">P</span>
              <span className="text-sm font-semibold text-white">Patricio</span>
            </div>
            <button type="button" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              Salir
            </button>
          </div>
        </div>
      </header>
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
