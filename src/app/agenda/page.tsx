import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';
import { TutoriasList } from '@/components/tutorias-agendadas/tutorias-list/TutoriasList';
import { getScheduledTutoriasAction } from '@/actions/tutorias-agendadas/getScheduledTutoriasAction';

export const dynamic = 'force-dynamic';

export default async function AgendaPage() {
  const { data, error } = await getScheduledTutoriasAction();

  return (
    <div className="min-h-screen bg-[#eef2f6]">
      <AppNavBar role="student" activeItem="agenda" />

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-extrabold leading-tight text-primary">Tutorias Agendadas</h1>
        <p className="mt-2 text-base text-[#64748b]">Lista cronologica de tus sesiones confirmadas</p>

        <section className="mt-8">
          {error && (
            <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
              {error}
            </div>
          )}

          <TutoriasList tutorias={data} />
        </section>
      </main>
    </div>
  );
}
