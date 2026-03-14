'use client';

import React from 'react';
import { getSolicitudesAction } from '@/actions/solicitudes/solicitudes';
import { SolicitudesTable } from '@/components/bandeja-entrada/SolicitudesTable/SolicitudesTable';
import { TabsComponent } from '@/components/bandeja-entrada/TabsComponent/TabsComponent';
import { GlobalPendingCount } from '@/components/layout/GlobalPendingCount/GlobalPendingCount';
import {
  GlobalCountsDto,
  PaginatedSolicitudesDto,
  SolicitudDetailsDto,
} from '@/interfaces/solicitudes/SolicitudesDTO';

interface BandejaEntradaClientProps {
  initialSolicitudes: PaginatedSolicitudesDto;
  globalCounts: GlobalCountsDto;
}

export function BandejaEntradaClient({ initialSolicitudes, globalCounts }: BandejaEntradaClientProps) {
  const [currentSolicitudes, setCurrentSolicitudes] = React.useState<SolicitudDetailsDto[]>(
    initialSolicitudes.data
  );
  const [activeTab, setActiveTab] = React.useState<'PENDIENTE' | 'EXPIRADA'>('PENDIENTE');
  const [isPending, startTransition] = React.useTransition();

  const handleTabChange = (newStatus: 'PENDIENTE' | 'EXPIRADA') => {
    setActiveTab(newStatus);

    startTransition(async () => {
      const response = await getSolicitudesAction(newStatus, 1, 10);
      setCurrentSolicitudes(response.data);
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1240px] px-6 py-10">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold text-[var(--primary)]">Bandeja de Entrada</h1>
          <p className="mt-2 text-2xl text-slate-500">Solicitudes de tutoria recibidas</p>
        </div>

        <GlobalPendingCount pendingCount={globalCounts.pending} />
      </div>

      <TabsComponent
        initialPendingCount={globalCounts.pending}
        initialExpiredCount={globalCounts.expired}
        onTabChange={handleTabChange}
      />

      {isPending ? (
        <div className="py-8 text-center text-lg text-slate-500">Cargando solicitudes...</div>
      ) : (
        <SolicitudesTable solicitudes={currentSolicitudes} activeTabStatus={activeTab} />
      )}
    </section>
  );
}
