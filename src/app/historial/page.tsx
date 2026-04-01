import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';

export const dynamic = 'force-dynamic';

interface HistorialPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HistorialTutoriasPage({ searchParams }: HistorialPageProps) {
  const resolvedParams = await searchParams;
  void resolvedParams;

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
        </section>
      </main>
    </div>
  );
}
