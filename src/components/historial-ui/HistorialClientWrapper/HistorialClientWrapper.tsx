'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
        // Show success toast (will be implemented with sonner)
        console.log(response.message);

        // Update local state to reflect the review
        const updatedTutorias = tutorias.map((t) =>
          t.id === tutoriaToCalificar.id
            ? {
                ...t,
                resena: {
                  calificacion: data.rating,
                  comentario: data.comment || '',
                  fechaCreacion: new Date().toISOString(),
                },
              }
            : t,
        );

        // Re-render by updating router
        // Also close the modal
        handleCloseCalificarModal();

        // Revalidate would happen on server but we simulate it here
        router.refresh();
      } else {
        console.error(response.message);
        // Show error toast (will be implemented with sonner)
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // Show error toast
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
