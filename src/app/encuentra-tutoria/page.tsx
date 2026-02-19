import { getOffersAction } from '@/actions/offers/getOffersAction';
import { SearchResultsHeader } from '@/components/offers/SearchResultsHeader/SearchResultsHeader';
import { OfferList } from '@/components/offers/OfferList/OfferList';
import { PaginationControls } from '@/components/offers/PaginationControls/PaginationControls';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PoliTutoriasPage({ searchParams }: PageProps) {
  try {
    // Obtener parámetros de paginación de la URL
    const page = searchParams.page
      ? parseInt(Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page)
      : 1;
    const limit = searchParams.limit
      ? parseInt(Array.isArray(searchParams.limit) ? searchParams.limit[0] : searchParams.limit)
      : 10;

    // Validar que los parámetros sean válidos
    const validPage = isNaN(page) || page < 1 ? 1 : page;
    const validLimit = isNaN(limit) || limit < 1 ? 10 : limit;

    // Obtener datos de ofertas
    const offersData = await getOffersAction({
      page: validPage,
      limit: validLimit,
    });

    // Desestructurar datos para pasar a componentes hijos
    const { data, meta } = offersData;

    return (
      <main className="min-h-screen bg-[#f7fafc]">
        <div className="container mx-auto px-6 py-8">
          {/* Cabecera de resultados */}
          <SearchResultsHeader totalResults={meta.totalResults} />

          {/* Lista de ofertas */}
          <OfferList offers={data} />

          {/* Controles de paginación */}
          <PaginationControls
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error al cargar las ofertas:', error);
    return (
      <main className="min-h-screen bg-[#f7fafc]">
        <div className="container mx-auto px-6 py-8">
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Error al cargar las ofertas
            </h2>
            <p className="text-gray-600">
              Intenta nuevamente más tarde
            </p>
          </div>
        </div>
      </main>
    );
  }
}
