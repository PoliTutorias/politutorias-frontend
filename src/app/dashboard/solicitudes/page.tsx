'use client';

import { useMemo, useState } from 'react';
import { SolicitudFilterStatus, SolicitudStatus } from '@/dtos/solicitudes.dto';
import Link from 'next/link';
import clsx from 'clsx';
import { dancingScript, montserrat } from '@/lib/fonts';

export default function MisSolicitudesPage() {
  const [currentStatusFilter, setCurrentStatusFilter] = useState<SolicitudFilterStatus>('TODAS');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const canShowPagination = useMemo(() => currentPage >= 1, [currentPage]);

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
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-medium text-slate-500">Filtro actual: {currentStatusFilter}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm"
                onClick={() => {
                  setCurrentStatusFilter('TODAS');
                  setCurrentPage(1);
                }}
              >
                TODAS
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm"
                onClick={() => {
                  setCurrentStatusFilter(SolicitudStatus.PENDIENTE);
                  setCurrentPage(1);
                }}
              >
                PENDIENTE
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm"
                onClick={() => {
                  setCurrentStatusFilter(SolicitudStatus.EXPIRADA);
                  setCurrentPage(1);
                }}
              >
                EXPIRADA
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-500">Aquí se renderizará el componente SolicitudList.</p>
          </div>

          {canShowPagination && (
            <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4">
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              >
                {'<'}
              </button>
              <span className="text-sm font-semibold text-primary">{currentPage}</span>
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-1 text-sm"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                {'>'}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
