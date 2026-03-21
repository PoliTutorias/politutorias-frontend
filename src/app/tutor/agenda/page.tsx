import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';

export default function MiAgendaPage() {
  return (
    <div className="min-h-screen bg-[#f3f6fa]">
      <AppNavBar role="tutor" activeItem="mi-agenda" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-[#1f2b3d] md:text-[44px]">Mi Agenda</h1>
          <p className="mt-2 text-lg text-[#7c8ca3]">Calendario de sesiones confirmadas</p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2.3fr_1fr]">
          <div className="min-h-[420px] rounded-2xl border border-[#e1e7ef] bg-white p-5 text-[#8a97ac]">
            Placeholder calendario
          </div>
          <div className="min-h-[420px] rounded-2xl border border-[#e1e7ef] bg-white p-5 text-[#8a97ac]">
            Placeholder panel lateral
          </div>
        </section>
      </main>
    </div>
  );
}
