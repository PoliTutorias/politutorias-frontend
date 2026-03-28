import { TutoriaEntity } from '@/interfaces/tutoria-tipo/TutoriaEntity';
import { TutoriaDetalleDto } from '@/interfaces/tutoria-tipo/TutoriaDetalleDto';

export const TUTORIAS_SEED_DATA: TutoriaDetalleDto[] = [
  {
    id: 'tutoria-003-ghi',
    estudiante: {
      id: 'student-003',
      nombre: 'Andres Morales',
    },
    materia: 'Algebra Lineal',
    fecha: '2026-03-20',
    hora: '11:00',
    tipo: 'Virtual',
    precioPorHora: 10,
    lugar: 'https://zoom.us/j/444555666',
    mensajeEstudiante: 'Repaso de valores y vectores propios.',
    estado: 'SIN_CONFIRMAR',
    calificacionEstudiante: null,
    comentarioEstudiante: null,
  },
  {
    id: 'tutoria-001-abc',
    estudiante: {
      id: 'student-001',
      nombre: 'Mateo Vargas',
    },
    materia: 'Calculo Vectorial',
    fecha: '2026-03-22',
    hora: '09:00',
    tipo: 'Presencial',
    precioPorHora: 10,
    lugar: 'Biblioteca EPN, Sala 3',
    mensajeEstudiante: 'Repaso general para el examen final.',
    estado: 'COMPLETADA',
    calificacionEstudiante: null,
    comentarioEstudiante: null,
  },
  {
    id: 'tutoria-002-def',
    estudiante: {
      id: 'student-002',
      nombre: 'Camila Rodriguez',
    },
    materia: 'Calculo Vectorial',
    fecha: '2026-03-21',
    hora: '10:00',
    tipo: 'Presencial',
    precioPorHora: 10,
    lugar: 'Laboratorio FIEE, Cubiculo 5',
    mensajeEstudiante: 'Refuerzo para tema de gradiente.',
    estado: 'COMPLETADA',
    calificacionEstudiante: 5,
    comentarioEstudiante: 'Excelente tutoria, muy clara y practica.',
  },
];

export function getTutoriaSeed(id: string): TutoriaDetalleDto | undefined {
  return TUTORIAS_SEED_DATA.find((item) => item.id === id);
}

export function getUpdatedTutoriaSeed(id: string): TutoriaEntity | undefined {
  const tutoria = getTutoriaSeed(id);

  if (!tutoria) {
    return undefined;
  }

  tutoria.estado = 'COMPLETADA';

  return {
    id: tutoria.id,
    estado: tutoria.estado,
  };
}
