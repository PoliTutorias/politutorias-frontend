'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { TarjetaTutoria } from '@/components/historial-ui/TarjetaTutoria/TarjetaTutoria';
import { PaginacionHistorial } from '@/components/historial-ui/PaginacionHistorial/PaginacionHistorial';
import { ModalDetalleTutoria } from '@/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria';
import { ModalCalificarTutoria } from '@/components/modals/ModalCalificarTutoria/ModalCalificarTutoria';
import type { TutoriaHistorialListDTO } from '@/interfaces/historial/HistorialTypes';
import type { ReviewFormData } from '@/interfaces/review-tipo/ReviewFormData';
import { submitReviewAction } from '@/actions/review-funcionalidad/submitReviewAction';

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
  const [isCalificarModalOpen, setIsCalificarModalOpen] = useState(false);
  const [tutoriaToCalificar, setTutoriaToCalificar] = useState<TutoriaHistorialListDTO | null>(
    null,
  );

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

  const handleOpenCalificarModal = (tutoriaId: string) => {
    const tutoria = tutorias.find((t) => t.id === tutoriaId);
    if (tutoria) {
      // Ensure detail modal closes before opening the rating modal.
      setIsModalOpen(false);
      setSelectedTutoriaId(null);
      setTutoriaToCalificar(tutoria);
      setIsCalificarModalOpen(true);
    }
  };

  const handleCloseCalificarModal = () => {
    setTutoriaToCalificar(null);
    setIsCalificarModalOpen(false);
  };

  const handleSubmitReview = async (data: ReviewFormData) => {
    if (!tutoriaToCalificar) return;

    try {
      const response = await submitReviewAction({
        tutoriaId: tutoriaToCalificar.id,
        rating: data.rating,
        comment: data.comment,
      });

      if (response.success) {
        // Show success toast
        toast.success(response.message, {
          position: 'bottom-center',
          duration: 3500,
        });

        // Close both modals and clear selection so stale detail does not persist underneath.
        handleCloseModal();
        handleCloseCalificarModal();

        // Refresh server data so card/detail states reflect the new review.
        router.refresh();
      } else {
        // Show error toast
        toast.error(response.message, {
          position: 'bottom-center',
          duration: 3500,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`Error al enviar la reseña: ${errorMessage}`, {
        position: 'bottom-center',
        duration: 3500,
      });
    }
  };

  return (
    <>
      {tutorias.map((tutoria) => (
        <TarjetaTutoria
          key={tutoria.id}
          tutoria={tutoria}
          onSelectTutoria={handleOpenModal}
          onCalificar={handleOpenCalificarModal}
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
        onCalificar={handleOpenCalificarModal}
      />

      {tutoriaToCalificar && (
        <ModalCalificarTutoria
          isOpen={isCalificarModalOpen}
          onClose={handleCloseCalificarModal}
          onSubmit={handleSubmitReview}
          tutoriaId={tutoriaToCalificar.id}
          tutorNombre={`${tutoriaToCalificar.tutor.nombre} ${tutoriaToCalificar.tutor.apellido}`}
          materiaNombre={tutoriaToCalificar.materia}
        />
      )}
    </>
  );
}
