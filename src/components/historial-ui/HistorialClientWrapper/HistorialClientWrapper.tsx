'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TarjetaTutoria } from '@/components/historial-ui/TarjetaTutoria/TarjetaTutoria';
import { PaginacionHistorial } from '@/components/historial-ui/PaginacionHistorial/PaginacionHistorial';
import { ModalDetalleTutoria } from '@/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria';
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
  const [selectedTutoriaId, setSelectedTutoriaId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/historial?${params.toString()}`);
  };

  const handleOpenModal = (tutoriaId: string) => {
    setSelectedTutoriaId(tutoriaId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTutoriaId(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {tutorias.map((tutoria) => (
        <TarjetaTutoria
          key={tutoria.id}
          tutoria={tutoria}
          onSelectTutoria={handleOpenModal}
        />
      ))}

      <PaginacionHistorial
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ModalDetalleTutoria
        tutoriaId={selectedTutoriaId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
