'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SolicitudFilterStatus,
  SolicitudListItemDto,
  SolicitudStatus,
} from '@/dtos/solicitudes.dto';
import Link from 'next/link';
import clsx from 'clsx';
import { dancingScript, montserrat } from '@/lib/fonts';
import { SolicitudFilterTabs } from '@/components/solicitudes/SolicitudFilterTabs/SolicitudFilterTabs';
import { SolicitudList } from '@/components/solicitudes/SolicitudList/SolicitudList';
import { PaginationComponent } from '@/components/common/Pagination/PaginationComponent';
import { getSolicitudesAction } from '@/actions/solicitudes/getSolicitudesAction';

const ITEMS_PER_PAGE = 5;

const INITIAL_COUNTS: { [key in SolicitudFilterStatus]: number } = {
  TODAS: 0,
  PENDIENTE: 0,
  ACEPTADA: 0,
  RECHAZADA: 0,
  EXPIRADA: 0,
};

export default function MisSolicitudesPage() {
  const [currentStatusFilter, setCurrentStatusFilter] = useState<SolicitudFilterStatus>('TODAS');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [solicitudes, setSolicitudes] = useState<SolicitudListItemDto[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState<{ [key in SolicitudFilterStatus]: number }>(INITIAL_COUNTS);

  const canShowPagination = useMemo(() => total > ITEMS_PER_PAGE, [total]);

  const handleFilterChange = useCallback((status: SolicitudFilterStatus) => {
    setCurrentStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const loadSolicitudes = useCallback(async (status: SolicitudFilterStatus, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const [listResult, todasCount, pendienteCount, aceptadaCount, rechazadaCount, expiradaCount] =
        await Promise.all([
          getSolicitudesAction({ status, page, limit: ITEMS_PER_PAGE }),
          getSolicitudesAction({ status: 'TODAS', page: 1, limit: 1000 }),
          getSolicitudesAction({ status: SolicitudStatus.PENDIENTE, page: 1, limit: 1000 }),
          getSolicitudesAction({ status: SolicitudStatus.ACEPTADA, page: 1, limit: 1000 }),
          getSolicitudesAction({ status: SolicitudStatus.RECHAZADA, page: 1, limit: 1000 }),
          getSolicitudesAction({ status: SolicitudStatus.EXPIRADA, page: 1, limit: 1000 }),
        ]);

      setSolicitudes(listResult.items);
      setTotal(listResult.total);
      setCounts({
        TODAS: todasCount.total,
        PENDIENTE: pendienteCount.total,
        ACEPTADA: aceptadaCount.total,
        RECHAZADA: rechazadaCount.total,
        EXPIRADA: expiradaCount.total,
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
    content = <SolicitudList solicitudes={solicitudes} onCardClick={() => undefined} />;
  }

  return (
    <div className="min-h-screen bg-[#eef2f6]">
      <header className="bg-primary px-6 py-3 text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <Link href="/encuentra-tutoria" className="flex items-center">
            <span className={`${montserrat.className} antialiased text-3xl font-extrabold leading-none text-white`}>
              Poli
            </span>
            <span className={`${dancingScript.className} antialiased text-base text-yellow`}>
              Tutorías
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/encuentra-tutoria" className="border-b-2 border-transparent pb-1 text-slate-300 transition-colors hover:text-white">
              Explorar
            </Link>
            <Link
              href="/dashboard/solicitudes"
              className={clsx(
                'border-b-2 pb-1 transition-colors',
                'border-yellow text-white',
                'hover:text-white'
              )}
            >
              Mis Solicitudes
            </Link>
            <span className="border-b-2 border-transparent pb-1 text-slate-300 transition-colors hover:text-white">
              Agenda
            </span>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-[2.15rem] font-bold leading-none text-primary">Mis Solicitudes</h1>
        <p className="mt-2 text-[1.38rem] text-[#64748b]">Seguimiento de tus solicitudes de tutoría</p>

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
    </div>
  );
}
