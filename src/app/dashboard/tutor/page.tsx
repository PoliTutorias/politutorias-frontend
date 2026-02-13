import Link from 'next/link';
import { montserrat, dancingScript } from '@/lib/fonts';
import { TutorDashboardContent } from '@/components/dashboard/TutorDashboardContent';

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
      <TutorDashboardContent />
    </div>
  );
}
