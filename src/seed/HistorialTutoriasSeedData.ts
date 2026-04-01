import type { TutoriaHistorialListDTO } from '@/interfaces/historial/HistorialTypes';

const historialTutoriasSeedData: TutoriaHistorialListDTO[] = [
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
    estado: 'COMPLETADA',
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
    estado: 'INASISTENCIA',
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
    estado: 'COMPLETADA',
  },
  {
    id: 'hist-004',
    materia: 'Álgebra Lineal',
    tutor: {
      id: 'tutor-003',
      nombre: 'Juan',
      apellido: 'Pérez',
      fotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    fecha: '2026-01-20T15:00:00.000Z',
    hora: '15:00',
    estado: 'INASISTENCIA',
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
    estado: 'COMPLETADA',
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
    estado: 'COMPLETADA',
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
    estado: 'COMPLETADA',
  },
  {
    id: 'hist-008',
    materia: 'Física I',
    tutor: {
      id: 'tutor-003',
      nombre: 'Juan',
      apellido: 'Pérez',
      fotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    fecha: '2026-01-25T15:00:00.000Z',
    hora: '15:00',
    estado: 'COMPLETADA',
  },
  {
    id: 'hist-009',
    materia: 'Ecuaciones Diferenciales',
    tutor: {
      id: 'tutor-002',
      nombre: 'Carlos',
      apellido: 'Ruiz',
      fotoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    fecha: '2026-01-25T10:00:00.000Z',
    hora: '10:00',
    estado: 'INASISTENCIA',
  },
  {
    id: 'hist-010',
    materia: 'Química Orgánica',
    tutor: {
      id: 'tutor-005',
      nombre: 'Ana',
      apellido: 'Torres',
      fotoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    fecha: '2026-02-28T11:00:00.000Z',
    hora: '11:00',
    estado: 'COMPLETADA',
  },
];

export function getHistorialTutoriasSeedData(): TutoriaHistorialListDTO[] {
  return historialTutoriasSeedData;
}
