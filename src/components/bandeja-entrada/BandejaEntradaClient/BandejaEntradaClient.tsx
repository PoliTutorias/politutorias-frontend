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
  const [currentPage, setCurrentPage] = React.useState<number>(initialSolicitudes.page);
  const [totalPages, setTotalPages] = React.useState<number>(initialSolicitudes.totalPages);
  const [activeTab, setActiveTab] = React.useState<'PENDIENTE' | 'EXPIRADA'>('PENDIENTE');
  const [isPending, startTransition] = React.useTransition();

  const handleTabChange = (newStatus: 'PENDIENTE' | 'EXPIRADA') => {
    setActiveTab(newStatus);

    startTransition(async () => {
      const response = await getSolicitudesAction(newStatus, 1, 10);
      setCurrentSolicitudes(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) {
      return;
    }

    startTransition(async () => {
      const response = await getSolicitudesAction(activeTab, newPage, 10);
      setCurrentSolicitudes(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);
    });
  };

  return (
    <section className="mx-auto w-full max-w-310 px-6 py-8">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Bandeja de Entrada</h1>
          <p className="mt-1 text-base text-slate-500">Solicitudes de tutoria recibidas</p>
        </div>

        <GlobalPendingCount pendingCount={globalCounts.pending} />
      </div>

      <TabsComponent
        initialPendingCount={globalCounts.pending}
        initialExpiredCount={globalCounts.expired}
        onTabChange={handleTabChange}
      />

      {isPending ? (
        <div className="py-8 text-center text-sm text-slate-500">Cargando solicitudes...</div>
      ) : (
        <SolicitudesTable
          solicitudes={currentSolicitudes}
          activeTabStatus={activeTab}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isPending}
        />
      )}
    </section>
  );
}
