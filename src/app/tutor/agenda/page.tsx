import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';
import { fetchAgendaInitialData } from '@/actions/agenda/agendaActions';
import { MiAgendaClient } from '@/components/agenda/MiAgendaClient/MiAgendaClient';

export default async function MiAgendaPage() {
  const response = await fetchAgendaInitialData();

  if (!response.success || !response.data) {
    return (
      <div className="min-h-screen bg-[#f3f6fa]">
        <AppNavBar role="tutor" activeItem="mi-agenda" />
        <main className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
          <h1 className="text-[44px] font-bold text-[#1f2b3d]">Mi Agenda</h1>
          <p className="mt-3 rounded-2xl border border-[#f3c8c8] bg-[#fff1f1] px-4 py-3 text-[20px] text-[#a13f3f]">
            {response.error ?? 'No se pudo cargar la agenda en este momento.'}
          </p>
        </main>
      </div>
    );
  }

  const initialData = response.data;

  return (
    <div className="min-h-screen bg-[#f3f6fa]">
      <AppNavBar role="tutor" activeItem="mi-agenda" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6">
          <h1 className="text-[48px] font-bold text-[#1f2b3d]">Mi Agenda</h1>
          <p className="mt-1 text-[18px] text-[#7c8ca3]">Calendario de sesiones confirmadas</p>
        </header>

        <MiAgendaClient initialData={initialData} />
      </main>
    </div>
  );
}
