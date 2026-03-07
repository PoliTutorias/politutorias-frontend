import Link from 'next/link';
import { montserrat, dancingScript } from '@/lib/fonts';
import { TutorDashboardContent } from '@/components/dashboard/TutorDashboardContent';

/**
 * Componente principal del Dashboard del tutor.
 * Server Component que contiene la estructura principal.
 */
export default function TutorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc]">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className={`${montserrat.className} antialiased font-extrabold text-white text-3xl`}>
              Poli
            </span>
            <span
              className={`${dancingScript.className} antialiased text-[var(--yellow)] text-lg`}
            >Tutorías</span>
          </Link>

          <button className="text-sm font-medium text-white hover:opacity-80 transition-opacity cursor-pointer">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <TutorDashboardContent />
    </div>
  );
}
