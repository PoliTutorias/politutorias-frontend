import Link from 'next/link';
import { montserrat, dancingScript } from '@/lib/fonts';
import { TutorDashboardContent } from '@/components/dashboard/TutorDashboardContent';
import MisOfertasPage from './mis-ofertas';

/**
 * Componente principal del Dashboard del tutor.
 * Server Component que contiene la estructura principal.
 */
export default function TutorDashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <span className={`${montserrat.className} antialiased font-extrabold text-white text-4xl`}>
              Poli
            </span>
            <span
              className={`${dancingScript.className} antialiased text-[var(--yellow)] text-xl`}
            >Tutorías</span>
          </Link>
          <button className="text-white hover:opacity-80 transition">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-8">
          {/* Sidebar del tutor */}
          <div className="lg:col-span-1">
            <TutorDashboardContent />
          </div>

          {/* Mis Ofertas */}
          <div className="lg:col-span-3">
            <MisOfertasPage />
          </div>
        </div>
      </div>
    </div>
  );
}
