import { getTutorialHistoryAction } from '@/actions/tutorials/getTutorialHistoryAction';
import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';
import { HistorialTutoriasClient } from '@/app/tutor/historial/HistorialTutoriasClient';

export const dynamic = 'force-dynamic';

export default async function HistorialTutoriasPage() {
  const initialHistory = await getTutorialHistoryAction(1, 5);

  return (
    <div className="min-h-screen bg-[#eef3f8]">
      <AppNavBar role="tutor" activeItem="historial" />

      <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6">
          <h1 className="text-[38px] font-bold leading-tight text-[#1f2b3d]">Historial de Tutorias Impartidas</h1>
          <p className="mt-1 text-[14px] text-[#77889f]">Registro de todas tus sesiones pasadas</p>
        </header>

        <HistorialTutoriasClient initialHistory={initialHistory} />
      </main>
    </div>
  );
}
