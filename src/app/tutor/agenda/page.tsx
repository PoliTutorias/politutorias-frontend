import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';
import { RightPanel } from '@/components/agenda/RightPanel/RightPanel';
import { CalendarComponent } from '@/components/calendar/CalendarComponent/CalendarComponent';
import { initialAgendaDataSeed } from '@/seed/AgendaSeedData';

export default function MiAgendaPage() {
  const initialData = initialAgendaDataSeed;

  return (
    <div className="min-h-screen bg-[#f3f6fa]">
      <AppNavBar role="tutor" activeItem="mi-agenda" />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6">
          <h1 className="text-[44px] font-bold text-[#1f2b3d]">Mi Agenda</h1>
          <p className="mt-1 text-[32px] text-[#7c8ca3]">Calendario de sesiones confirmadas</p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2.3fr_1fr]">
          <CalendarComponent
            currentMonthName={initialData.currentMonthName}
            currentYear={initialData.currentYear}
            calendarDays={initialData.calendarDays}
          />
          <RightPanel monthlySummary={initialData.monthlySummary} />
        </section>
      </main>
    </div>
  );
}
