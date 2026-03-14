import { fetchInitialDataAction } from '@/actions/solicitudes/solicitudes';
import { BandejaEntradaClient } from '@/components/bandeja-entrada/BandejaEntradaClient/BandejaEntradaClient';
import { NavBar } from '@/components/layout/NavBar/NavBar';

export default async function BandejaEntradaPage() {
  const { solicitudes: initialSolicitudes, counts: globalCounts } = await fetchInitialDataAction(1, 10);

  return (
    <div className="min-h-screen bg-[#f3f6fa]">
      <NavBar activeItem="bandeja" pendingCount={globalCounts.pending} userName="Jose" />
      <BandejaEntradaClient initialSolicitudes={initialSolicitudes} globalCounts={globalCounts} />
    </div>
  );
}
