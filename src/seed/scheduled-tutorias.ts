import { TutoriasAgendadasDTO } from '@/interfaces/tutorias-agendadas/TutoriasAgendadasDTO';

/**
 * Seed que replica la respuesta esperada de GET /tutorias/agendadas.
 * Incluye modalidades Virtual y Presencial, y estados AGENDADA, COMPLETADA y CANCELADA.
 */
const scheduledTutoriasSeedData: TutoriasAgendadasDTO[] = [
  {
    id: 'a1f6d8bc-3f8c-4bf9-bf54-5f5fa1d2d101',
    materia: 'Ecuaciones Diferenciales',
    fecha: '2026-03-24',
    hora: '20:51',
    modalidad: 'Presencial',
    tarifa: 9,
    tutor: {
      id: '5ecf6f59-8f6a-48f1-a18e-75f5f49ee001',
      nombre: 'Carlos',
      apellido: 'Ruiz',
      fotoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    estado: 'AGENDADA',
    direccion: 'Biblioteca Central, Sala de Estudio 1',
    mensajeEstudiante: 'Necesito resolver dudas de Laplace para el examen de esta tarde.',
  },
  {
    id: 'a1f6d8bc-3f8c-4bf9-bf54-5f5fa1d2d102',
    materia: 'Dinamica',
    fecha: '2026-03-25',
    hora: '14:00',
    modalidad: 'Presencial',
    tarifa: 10,
    tutor: {
      id: '5ecf6f59-8f6a-48f1-a18e-75f5f49ee002',
      nombre: 'David',
      apellido: 'Gomez',
      fotoUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
    },
    estado: 'AGENDADA',
    direccion: 'Facultad de Ingenieria, Aula B-204',
    mensajeEstudiante: 'Quiero practicar problemas de energia y momento angular.',
  },
  {
    id: 'a1f6d8bc-3f8c-4bf9-bf54-5f5fa1d2d103',
    materia: 'Bases de Datos',
    fecha: '2026-03-30',
    hora: '10:00',
    modalidad: 'Virtual',
    tarifa: 11,
    tutor: {
      id: '5ecf6f59-8f6a-48f1-a18e-75f5f49ee003',
      nombre: 'Maria',
      apellido: 'Lopez',
      fotoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    estado: 'AGENDADA',
    enlaceReunion: 'https://meet.google.com/tqs-znnn-sab',
    mensajeEstudiante: 'Me cuesta normalizar hasta tercera forma normal.',
  },
  {
    id: 'a1f6d8bc-3f8c-4bf9-bf54-5f5fa1d2d104',
    materia: 'Quimica Organica',
    fecha: '2026-04-02',
    hora: '11:00',
    modalidad: 'Presencial',
    tarifa: 12,
    tutor: {
      id: '5ecf6f59-8f6a-48f1-a18e-75f5f49ee004',
      nombre: 'Ana',
      apellido: 'Torres',
      fotoUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
    },
    estado: 'AGENDADA',
    direccion: 'Laboratorios Norte, Bloque C, Mesa 7',
    mensajeEstudiante: 'Necesito repasar nomenclatura y mecanismos de reaccion.',
  },
  {
    id: 'a1f6d8bc-3f8c-4bf9-bf54-5f5fa1d2d105',
    materia: 'Calculo Diferencial',
    fecha: '2026-04-05',
    hora: '15:00',
    modalidad: 'Virtual',
    tarifa: 9,
    tutor: {
      id: '5ecf6f59-8f6a-48f1-a18e-75f5f49ee004',
      nombre: 'Ana',
      apellido: 'Torres',
      fotoUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
    },
    estado: 'AGENDADA',
    enlaceReunion: 'https://meet.google.com/rfy-wjmg-qka',
    mensajeEstudiante: 'Quisiera reforzar derivadas implicitas y maximos.',
  },
  {
    id: 'a1f6d8bc-3f8c-4bf9-bf54-5f5fa1d2d106',
    materia: 'Fisica I',
    fecha: '2026-03-14',
    hora: '09:00',
    modalidad: 'Virtual',
    tarifa: 8,
    tutor: {
      id: '5ecf6f59-8f6a-48f1-a18e-75f5f49ee005',
      nombre: 'Kevin',
      apellido: 'Sanchez',
      fotoUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
    },
    estado: 'COMPLETADA',
    enlaceReunion: 'https://meet.google.com/mkz-dmmu-rzi',
    mensajeEstudiante: 'Gracias por la ayuda con leyes de Newton.',
  },
  {
    id: 'a1f6d8bc-3f8c-4bf9-bf54-5f5fa1d2d107',
    materia: 'Programacion II',
    fecha: '2026-03-28',
    hora: '18:30',
    modalidad: 'Virtual',
    tarifa: 13,
    tutor: {
      id: '5ecf6f59-8f6a-48f1-a18e-75f5f49ee006',
      nombre: 'Sofia',
      apellido: 'Mendoza',
      fotoUrl: 'https://randomuser.me/api/portraits/women/77.jpg',
    },
    estado: 'CANCELADA',
    enlaceReunion: 'https://meet.google.com/pek-rmis-prj',
    mensajeEstudiante: 'Tuve cruce de horario con laboratorio.',
  },
];

export function getScheduledTutoriasSeedData(): TutoriasAgendadasDTO[] {
  return scheduledTutoriasSeedData;
}
