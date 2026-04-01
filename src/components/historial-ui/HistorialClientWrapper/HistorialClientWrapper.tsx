'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TarjetaTutoria } from '@/components/historial-ui/TarjetaTutoria/TarjetaTutoria';
import { PaginacionHistorial } from '@/components/historial-ui/PaginacionHistorial/PaginacionHistorial';
import type { TutoriaHistorialListDTO } from '@/interfaces/historial/HistorialTypes';

interface HistorialClientWrapperProps {
  readonly tutorias: TutoriaHistorialListDTO[];
  readonly currentPage: number;
  readonly totalPages: number;
}

export function HistorialClientWrapper({
  tutorias,
  currentPage,
  totalPages,
}: HistorialClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/historial?${params.toString()}`);
  };

  return (
    <>
      {tutorias.map((tutoria) => (
        <TarjetaTutoria key={tutoria.id} tutoria={tutoria} />
      ))}

      <PaginacionHistorial
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
