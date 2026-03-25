import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';
import { TutoriasList } from '@/components/tutorias-agendadas/tutorias-list/TutoriasList';
import { getScheduledTutoriasAction } from '@/actions/tutorias-agendadas/getScheduledTutoriasAction';

export const dynamic = 'force-dynamic';

interface AgendaPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
  const resolvedParams = await searchParams;
  const pageParam = resolvedParams.page;
  const pageValue = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const currentPage = Number(pageValue ?? '1');
  const safePage = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  const { data, error, totalProximas, totalPages } = await getScheduledTutoriasAction(safePage, 3);

  return (
    <div className="min-h-screen bg-[#eef2f6]">
      <AppNavBar role="student" activeItem="agenda" />

      <main className="mx-auto flex h-[calc(100vh-72px)] w-full max-w-5xl flex-col px-6 py-8">
        <h1 className="text-2xl font-bold leading-tight text-primary">Tutorias Agendadas</h1>
        <p className="mt-2 text-sm text-[#64748b]">Lista cronologica de tus sesiones confirmadas</p>

        <section className="mt-6 flex flex-1 flex-col overflow-visible">
          {error && (
            <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
              {error}
            </div>
          )}

          <TutoriasList
            tutorias={data}
            totalProximas={totalProximas}
            currentPage={safePage}
            totalPages={totalPages}
          />
        </section>
      </main>
    </div>
  );
}
