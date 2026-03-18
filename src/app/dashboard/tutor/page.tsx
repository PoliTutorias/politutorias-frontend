import { TutorDashboardContent } from '@/components/dashboard/TutorDashboardContent';
import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';

/**
 * Componente principal del Dashboard del tutor.
 * Server Component que contiene la estructura principal.
 */
export default function TutorDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <AppNavBar role="tutor" activeItem="panel" />

      {/* Main Content */}
      <TutorDashboardContent />
    </div>
  );
}
