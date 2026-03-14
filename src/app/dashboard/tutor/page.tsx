import { TutorDashboardContent } from '@/components/dashboard/TutorDashboardContent';
import { NavBar } from '@/components/layout/NavBar/NavBar';

/**
 * Componente principal del Dashboard del tutor.
 * Server Component que contiene la estructura principal.
 */
export default function TutorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <NavBar activeItem="panel" userName="Jose" />

      {/* Main Content */}
      <TutorDashboardContent />
    </div>
  );
}
