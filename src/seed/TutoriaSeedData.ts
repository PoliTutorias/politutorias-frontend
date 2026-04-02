import type { ReviewEntity } from '@/interfaces/review-tipo/ReviewEntity';

export interface TutoriaDetailWithReviewDto {
  id: string;
  materia: string;
  tutor: {
    id: string;
    nombre: string;
    apellido: string;
    fotoUrl: string;
  };
  fecha: string;
  hora: string;
  modalidad: 'Presencial' | 'Virtual';
  precioPorHora: number;
  enlaceReunion?: string | null;
  ubicacion?: string | null;
  mensajeEstudiante: string;
  estado: 'COMPLETADA' | 'INASISTENCIA';
  review?: ReviewEntity | null;
}

const TutoriaSeedData: TutoriaDetailWithReviewDto[] = [
  {
    id: 'hist-001',
    materia: 'Programación Orientada a Objetos',
    tutor: {
      id: 'tutor-001',
      nombre: 'María',
      apellido: 'López',
      fotoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    fecha: '2026-03-05T14:00:00.000Z',
    hora: '14:00',
    modalidad: 'Virtual',
    precioPorHora: 15,
    enlaceReunion: 'https://zoom.us/meeting/123456789',
    mensajeEstudiante: 'Necesito ayuda con herencia y polimorfismo',
    estado: 'COMPLETADA',
    review: {
      id: 'review-uuid-001',
      rating: 5,
      comment: 'Excelente tutor. Los ejemplos prácticos en Java fueron muy claros.',
      tutoriaId: 'hist-001',
      studentId: 'student-uuid-007',
      tutorId: 'tutor-001',
      createdAt: '2026-03-05T14:30:00.000Z',
      updatedAt: '2026-03-05T14:30:00.000Z',
    },
  },
  {
    id: 'hist-002',
    materia: 'Física II',
    tutor: {
      id: 'tutor-002',
      nombre: 'Carlos',
      apellido: 'Ruiz',
      fotoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    fecha: '2026-02-22T10:00:00.000Z',
    hora: '10:00',
    modalidad: 'Presencial',
    precioPorHora: 12,
    ubicacion: 'Sala de estudio, Bloque A',
    mensajeEstudiante: 'Ayuda con electromagnétismo',
    estado: 'INASISTENCIA',
    review: null,
  },
  {
    id: 'hist-003',
    materia: 'Cálculo Diferencial',
    tutor: {
      id: 'tutor-003',
      nombre: 'Juan',
      apellido: 'Pérez',
      fotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    fecha: '2026-02-25T11:00:00.000Z',
    hora: '11:00',
    modalidad: 'Virtual',
    precioPorHora: 10,
    enlaceReunion: 'https://zoom.us/meeting/987654321',
    mensajeEstudiante: 'Necesito entender límites y derivadas',
    estado: 'COMPLETADA',
    review: {
      id: 'review-uuid-002',
      rating: 4,
      comment: 'Muy buena explicación, pero podría haber más ejemplos.',
      tutoriaId: 'hist-003',
      studentId: 'student-uuid-007',
      tutorId: 'tutor-003',
      createdAt: '2026-02-25T11:45:00.000Z',
      updatedAt: '2026-02-25T11:45:00.000Z',
    },
  },
  {
    id: 'hist-005',
    materia: 'Estructuras de Datos',
    tutor: {
      id: 'tutor-001',
      nombre: 'María',
      apellido: 'López',
      fotoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    fecha: '2026-02-20T14:00:00.000Z',
    hora: '14:00',
    modalidad: 'Virtual',
    precioPorHora: 15,
    enlaceReunion: 'https://zoom.us/meeting/555666777',
    mensajeEstudiante: 'Repaso de árboles binarios de búsqueda',
    estado: 'COMPLETADA',
    review: null,
  },
  {
    id: 'hist-006',
    materia: 'Dinámica',
    tutor: {
      id: 'tutor-004',
      nombre: 'David',
      apellido: 'Gómez',
      fotoUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
    },
    fecha: '2026-03-01T10:00:00.000Z',
    hora: '10:00',
    modalidad: 'Presencial',
    precioPorHora: 9,
    ubicacion: 'Aula 201, Bloque B',
    mensajeEstudiante: 'Repaso de cinemática de cuerpos rígidos.',
    estado: 'COMPLETADA',
    review: {
      id: 'review-uuid-003',
      rating: 5,
      comment:
        'El tutor fue muy claro y resolvió todas mis dudas. ¡Excelente experiencia!',
      tutoriaId: 'hist-006',
      studentId: 'student-uuid-007',
      tutorId: 'tutor-004',
      createdAt: '2026-03-01T10:30:00.000Z',
      updatedAt: '2026-03-01T10:30:00.000Z',
    },
  },
  {
    id: 'hist-007',
    materia: 'Estática',
    tutor: {
      id: 'tutor-003',
      nombre: 'Juan',
      apellido: 'Pérez',
      fotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    fecha: '2026-02-15T10:00:00.000Z',
    hora: '10:00',
    modalidad: 'Virtual',
    precioPorHora: 12,
    enlaceReunion: 'https://zoom.us/meeting/111222333',
    mensajeEstudiante: 'Ayuda con análisis de armaduras.',
    estado: 'COMPLETADA',
    review: {
      id: 'review-uuid-004',
      rating: 5,
      comment:
        'Juan explica los problemas paso a paso. Muy recomendado para Estática.',
      tutoriaId: 'hist-007',
      studentId: 'student-uuid-007',
      tutorId: 'tutor-003',
      createdAt: '2026-02-15T10:45:00.000Z',
      updatedAt: '2026-02-15T10:45:00.000Z',
    },
  },
];

export function getTutoriaSeedData(): TutoriaDetailWithReviewDto[] {
  return TutoriaSeedData;
}
