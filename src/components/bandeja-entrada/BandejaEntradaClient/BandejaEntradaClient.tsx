'use client';

import React from 'react';
import { getSolicitudesAction } from '@/actions/solicitudes/solicitudes';
import { SolicitudesTable } from '@/components/bandeja-entrada/SolicitudesTable/SolicitudesTable';
import { TabsComponent } from '@/components/bandeja-entrada/TabsComponent/TabsComponent';
import { GlobalPendingCount } from '@/components/layout/GlobalPendingCount/GlobalPendingCount';
import { ConfirmarTutoriaModal } from '@/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal';
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
  const [activeTab, setActiveTab] = React.useState<'PENDIENTE' | 'RESPONDIDA' | 'EXPIRADA'>('PENDIENTE');
  const [isPending, startTransition] = React.useTransition();
  const [counts, setCounts] = React.useState<GlobalCountsDto>(globalCounts);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = React.useState<SolicitudDetailsDto | null>(null);
  const [modalInstanceKey, setModalInstanceKey] = React.useState(0);

  const handleTabChange = (newStatus: 'PENDIENTE' | 'RESPONDIDA' | 'EXPIRADA') => {
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

  const handleAcceptClick = (tutoriaId: string, modalidad: 'Virtual' | 'Presencial') => {
    const solicitud = currentSolicitudes.find((item) => item.id === tutoriaId) ?? null;

    if (solicitud) {
      setSelectedSolicitud(solicitud);
    } else {
      setSelectedSolicitud({
        id: tutoriaId,
        modalidad,
        estudiante: '',
        materia: '',
        fechaHora: '',
        mensajeResumen: '',
        estado: 'PENDIENTE',
        precioHora: 0,
        mensajeCompleto: '',
      });
    }

    setIsConfirmModalOpen(true);
    setModalInstanceKey((previous) => previous + 1);
  };

  const handleCloseModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedSolicitud(null);
  };

  const handleConfirmSuccess = (acceptedTutoriaId: string) => {
    setCurrentSolicitudes((previous) => previous.filter((item) => item.id !== acceptedTutoriaId));
    setCounts((previous) => ({
      pending: Math.max(0, previous.pending - 1),
      expired: previous.expired,
      responded: previous.responded + 1,
    }));
  };

  return (
    <section className="mx-auto w-full max-w-310 px-6 py-8">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Bandeja de Entrada</h1>
          <p className="mt-1 text-base text-slate-500">Solicitudes de tutoria recibidas</p>
        </div>

        <GlobalPendingCount pendingCount={counts.pending} />
      </div>

      <TabsComponent
        initialPendingCount={counts.pending}
        initialRespondedCount={counts.responded}
        initialExpiredCount={counts.expired}
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
          onAcceptClick={handleAcceptClick}
          isLoading={isPending}
        />
      )}

      {selectedSolicitud && (
        <ConfirmarTutoriaModal
          key={`${selectedSolicitud.id}-${modalInstanceKey}`}
          isOpen={isConfirmModalOpen}
          onClose={handleCloseModal}
          tutoriaId={selectedSolicitud.id}
          modalidad={selectedSolicitud.modalidad}
          materia={selectedSolicitud.materia}
          estudiante={selectedSolicitud.estudiante}
          fechaHora={selectedSolicitud.fechaHora}
          onConfirmed={handleConfirmSuccess}
        />
      )}
    </section>
  );
}
