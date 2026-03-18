'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SolicitudListItemDto,
  SolicitudStatus,
} from '@/dtos/solicitudes.dto';
import { SolicitudFilterTabs } from '@/components/solicitudes/SolicitudFilterTabs/SolicitudFilterTabs';
import { SolicitudList } from '@/components/solicitudes/SolicitudList/SolicitudList';
import { PaginationComponent } from '@/components/common/Pagination/PaginationComponent';
import { getSolicitudesAction } from '@/actions/solicitudes/getSolicitudesAction';
import { DetalleSolicitudModal } from '@/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal';
import { AppNavBar } from '@/components/layout/AppNavBar/AppNavBar';

const ITEMS_PER_PAGE = 5;

type Hu33FilterStatus = 'TODAS' | SolicitudStatus.PENDIENTE | SolicitudStatus.EXPIRADA;

const INITIAL_COUNTS: { [key in Hu33FilterStatus]: number } = {
  TODAS: 0,
  PENDIENTE: 0,
  EXPIRADA: 0,
};

export default function MisSolicitudesPage() {
  const [currentStatusFilter, setCurrentStatusFilter] = useState<Hu33FilterStatus>('TODAS');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [solicitudes, setSolicitudes] = useState<SolicitudListItemDto[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState<{ [key in Hu33FilterStatus]: number }>(INITIAL_COUNTS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSolicitudId, setSelectedSolicitudId] = useState<string | null>(null);

  const canShowPagination = useMemo(() => total > ITEMS_PER_PAGE, [total]);

  const handleFilterChange = useCallback((status: Hu33FilterStatus) => {
    setCurrentStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleCardClick = useCallback((id: string) => {
    setSelectedSolicitudId(id);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const loadSolicitudes = useCallback(async (status: Hu33FilterStatus, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const listResult = await getSolicitudesAction({ status, page, limit: ITEMS_PER_PAGE });

      const [pendingResult, expiredResult] = await Promise.allSettled([
        getSolicitudesAction({ status: SolicitudStatus.PENDIENTE, page: 1, limit: 1 }),
        getSolicitudesAction({ status: SolicitudStatus.EXPIRADA, page: 1, limit: 1 }),
      ]);

      const pendingTotal = pendingResult.status === 'fulfilled' ? pendingResult.value.total : 0;
      const expiredTotal = expiredResult.status === 'fulfilled' ? expiredResult.value.total : 0;

      setSolicitudes(listResult.items);
      setTotal(listResult.total);
      setCounts({
        TODAS: pendingTotal + expiredTotal,
        PENDIENTE: pendingTotal,
        EXPIRADA: expiredTotal,
      });
    } catch {
      setError('No se pudieron cargar las solicitudes. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSolicitudes(currentStatusFilter, currentPage);
  }, [currentStatusFilter, currentPage, loadSolicitudes]);

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500">
        Cargando solicitudes...
      </div>
    );
  } else if (error) {
    content = (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-6 text-center text-red-600">
        {error}
      </div>
    );
  } else {
    content = <SolicitudList solicitudes={solicitudes} onCardClick={handleCardClick} />;
  }

  return (
    <div className="min-h-screen bg-[#eef2f6]">
      <AppNavBar role="student" activeItem="solicitudes" />

      <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-bold leading-none text-primary">Mis Solicitudes</h1>
        <p className="mt-2 text-sm text-[#64748b]">Seguimiento de tus solicitudes de tutoría</p>

        <section className="mt-8">
          <SolicitudFilterTabs
            currentStatusFilter={currentStatusFilter}
            onFilterChange={handleFilterChange}
            counts={counts}
          />

          <div className="mt-6">
            {content}
          </div>

          {canShowPagination && !isLoading && !error && (
            <PaginationComponent
              totalItems={total}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </main>

      <DetalleSolicitudModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        solicitudId={selectedSolicitudId}
      />
    </div>
  );
}
