import { Suspense } from 'react';
import { getOffersAction } from '@/actions/offers/getOffersAction';
import { OfferList } from '@/components/offers/OfferList/OfferList';
import { PaginationControls } from '@/components/offers/PaginationControls/PaginationControls';
import { SearchBar } from '@/components/ofertas-ui/SearchBar/SearchBar';
import { ResultsCounter } from '@/components/ofertas-ui/ResultsCounter/ResultsCounter';
import { NoResultsMessage } from '@/components/ofertas-ui/NoResultsMessage/NoResultsMessage';
import { Navbar } from '@/components/navbar/Navbar';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function OffersContent({ params }: { params: Awaited<Awaited<PageProps['searchParams']>> }) {
  // Extraer searchTerm
  const searchTerm = params.searchTerm
    ? Array.isArray(params.searchTerm)
      ? params.searchTerm[0]
      : params.searchTerm
    : '';

  // Obtener parámetros de paginación de la URL
  const page = params.page
    ? parseInt(Array.isArray(params.page) ? params.page[0] : params.page)
    : 1;
  const limit = params.limit
    ? parseInt(Array.isArray(params.limit) ? params.limit[0] : params.limit)
    : 10;

  // Validar que los parámetros sean válidos
  const validPage = isNaN(page) || page < 1 ? 1 : page;
  const validLimit = isNaN(limit) || limit < 1 ? 10 : limit;

  // Obtener datos de ofertas con searchTerm
  const offersData = await getOffersAction({
    page: validPage,
    limit: validLimit,
    searchTerm: searchTerm || undefined,
  });

  // Desestructurar datos para pasar a componentes hijos
  const { data, meta } = offersData;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Barra de búsqueda */}
      <div className="mb-8">
        <Suspense fallback={<div className="w-1/2 h-12 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Contador de resultados */}
      <div className="mb-6">
        <ResultsCounter totalResults={meta.totalResults} />
      </div>

      {/* Contenido condicional */}
      {meta.totalResults > 0 ? (
        <>
          {/* Lista de ofertas */}
          <OfferList offers={data} />

          {/* Controles de paginación */}
          <PaginationControls
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
          />
        </>
      ) : (
        /* Mensaje de sin resultados */
        <NoResultsMessage />
      )}
    </div>
  );
}

function ErrorContent() {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Barra de búsqueda */}
      <div className="mb-8">
        <Suspense fallback={<div className="w-1/2 h-12 bg-gray-100 animate-pulse rounded-lg"></div>}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Mensaje de error */}
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
      <Navbar userName="Patricio" />
      <main>
        {children}
      </main>
    </div>
  );
}

export default async function PoliTutoriasPage({ searchParams }: PageProps) {
  let hasError = false;

  try {
    const params = await searchParams;
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
      <OffersContent params={await searchParams} />
    </PageLayout>
  );
}
