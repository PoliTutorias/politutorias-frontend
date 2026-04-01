import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';
import { fetchHistorialAction } from '@/actions/historial/tutoriaActions';
import type { HistorialQueryParams } from '@/interfaces/historial/HistorialTypes';
import { TarjetaTutoria } from '@/components/historial-ui/TarjetaTutoria/TarjetaTutoria';

export const dynamic = 'force-dynamic';

interface HistorialPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HistorialTutoriasPage({ searchParams }: HistorialPageProps) {
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams.page;
  const pageValue = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const currentPage = Number(pageValue ?? '1');
  const safePage = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
  const limit = 5;

  const queryParams: HistorialQueryParams = {
    page: safePage,
    limit,
    orderDirection: 'DESC',
    status: ['COMPLETADA', 'INASISTENCIA'],
  };

  const response = await fetchHistorialAction(queryParams);
  const tutorias = response.success ? response.data : [];
  const total = response.success ? response.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-screen bg-[#eef2f6]">
      <AppNavBar role="student" activeItem="historial" />

      <main className="mx-auto w-full max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-bold leading-tight text-primary">
          Historial de Tutorías
        </h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Tutorías que has recibido y calificado
        </p>

        <section className="mt-8 flex flex-col gap-5">
          {!response.success && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
              {response.message ?? 'Error al cargar el historial.'}
            </div>
          )}

          {response.success && tutorias.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-600">
              No tienes tutorías en tu historial por ahora.
            </div>
          )}

          {tutorias.map((tutoria) => (
            <TarjetaTutoria key={tutoria.id} tutoria={tutoria} />
          ))}
        </section>
      </main>
    </div>
  );
}
