import { fetchInitialDataAction } from '@/actions/solicitudes/solicitudes';
import { BandejaEntradaClient } from '@/components/bandeja-entrada/BandejaEntradaClient/BandejaEntradaClient';
import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';

export const dynamic = 'force-dynamic';

export default async function BandejaEntradaPage() {
  const { solicitudes: initialSolicitudes, counts: globalCounts } = await fetchInitialDataAction(1, 10);

  return (
    <div className="min-h-screen bg-[#f3f6fa]">
      <AppNavBar role="tutor" activeItem="bandeja" />
      <BandejaEntradaClient initialSolicitudes={initialSolicitudes} globalCounts={globalCounts} />
    </div>
  );
}
