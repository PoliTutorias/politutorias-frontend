import { OfertaEntity } from '@/interfaces/ofertas/OfertaEntity';
import { OfertasResult } from '@/interfaces/ofertas/OfertasResult';

/**
 * Seed data para ofertas de tutoría (HU27 - Filtrar por precio)
 * Datos simulados con precios variados para pruebas de filtrado
 */
const ofertasSeed: OfertaEntity[] = [
  {
    id: 'clx4v7m7e0001y1nkhm2k8s2a',
    titulo: 'Cálculo Vectorial',
    carrera: 'Ingeniería de Sistemas',
    modalidad: 'Virtual/Presencial',
    descripcion: 'Clases de Cálculo Vectorial para estudiantes de primeros semestres. Incluye integrales múltiples, campos vectoriales y...',
    lugarReunion: 'Biblioteca Central UNMSM',
    precio: 10.00,
    tutor: {
      id: 'tutor-1',
      nombre: 'Juan Pérez',
      fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      contacto: 'juan.perez@example.com',
    },
    imagenRepresentativaUrl: 'https://example.com/calculo_vectorial.jpg',
    tags: ['Matemática', 'Formación Básica'],
    calificacionPromedio: 4.8,
    totalReseñas: 15,
    horarios: [{ day: 'Lunes', hour: '14:00' }, { day: 'Lunes', hour: '15:00' }],
  },
  {
    id: 'clx4v7m7e0002y1nkhm2k8s2b',
    titulo: 'Física I',
    carrera: 'Ciencias de la Computación',
    modalidad: 'Presencial',
    descripcion: 'Tutoría de Física I: cinemática, dinámica, trabajo y energía. Resolución de problemas tipo examen.',
    lugarReunion: 'Aula 201 - Facultad de Ciencias',
    precio: 8.00,
    tutor: {
      id: 'tutor-1',
      nombre: 'Juan Pérez',
      fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      contacto: 'juan.perez@example.com',
    },
    imagenRepresentativaUrl: 'https://example.com/fisica_i.jpg',
    tags: ['Física', 'Formación Básica'],
    calificacionPromedio: 4.8,
    totalReseñas: 15,
    horarios: [{ day: 'Lunes', hour: '14:00' }, { day: 'Lunes', hour: '15:00' }],
  },
  {
    id: 'clx4v7m7e0003y1nkhm2k8s2c',
    titulo: 'Estática',
    carrera: 'Ingeniería Civil',
    modalidad: 'Virtual/Presencial',
    descripcion: 'Aprende estática de forma práctica: equilibrio de partículas, cuerpos rígidos, análisis de estructuras.',
    lugarReunion: 'Google Meet',
    precio: 12.00,
    tutor: {
      id: 'tutor-1',
      nombre: 'Juan Pérez',
      fotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      contacto: 'juan.perez@example.com',
    },
    imagenRepresentativaUrl: 'https://example.com/estatica.jpg',
    tags: ['Mecánica', 'FIM - Mecánica'],
    calificacionPromedio: 4.8,
    totalReseñas: 15,
    horarios: [{ day: 'Lunes', hour: '14:00' }, { day: 'Lunes', hour: '15:00' }],
  },
  {
    id: 'clx4v7m7e0004y1nkhm2k8s2d',
    titulo: 'Programación Básica',
    carrera: 'Ingeniería de Sistemas',
    modalidad: 'Virtual',
    descripcion: 'Clases de programación desde cero. Python, lógica de programación, estructuras de control y funciones.',
    lugarReunion: 'Zoom',
    precio: 15.00,
    tutor: {
      id: 'tutor-2',
      nombre: 'María López',
      fotoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      contacto: 'maria.lopez@example.com',
    },
    imagenRepresentativaUrl: 'https://example.com/programacion.jpg',
    tags: ['Programación', 'FIS - Sistemas'],
    calificacionPromedio: 5,
    totalReseñas: 8,
    horarios: [{ day: 'Sábado', hour: '09:00' }, { day: 'Sábado', hour: '10:00' }],
  },
  {
    id: 'clx4v7m7e0005y1nkhm2k8s2e',
    titulo: 'Álgebra Lineal',
    carrera: 'Matemáticas',
    modalidad: 'Virtual/Presencial',
    descripcion: 'Refuerzo en álgebra lineal para estudiantes universitarios. Vectores, matrices y transformaciones.',
    lugarReunion: 'Google Meet o Biblioteca',
    precio: 18.50,
    tutor: {
      id: 'tutor-3',
      nombre: 'María García',
      fotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      contacto: 'maria.garcia@example.com',
    },
    imagenRepresentativaUrl: 'https://example.com/algebra_lineal.jpg',
    tags: ['Matemática', 'Formación Básica'],
    calificacionPromedio: 4.5,
    totalReseñas: 20,
    horarios: [{ day: 'Martes', hour: '10:00' }, { day: 'Jueves', hour: '14:00' }],
  },
  {
    id: 'clx4v7m7e0006y1nkhm2k8s2f',
    titulo: 'Química General',
    carrera: 'Química',
    modalidad: 'Presencial',
    descripcion: 'Clases de química general: estequiometría, enlaces químicos, reacciones y equilibrio.',
    lugarReunion: 'Laboratorio de Química',
    precio: 25.00,
    tutor: {
      id: 'tutor-4',
      nombre: 'Carlos Ruiz',
      fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      contacto: 'carlos.ruiz@example.com',
    },
    imagenRepresentativaUrl: 'https://example.com/quimica.jpg',
    tags: ['Química', 'Ciencias Naturales'],
    calificacionPromedio: 4.7,
    totalReseñas: 12,
    horarios: [{ day: 'Miércoles', hour: '16:00' }, { day: 'Viernes', hour: '10:00' }],
  },
  {
    id: 'clx4v7m7e0007y1nkhm2k8s2g',
    titulo: 'Ecuaciones Diferenciales',
    carrera: 'Ingeniería Mecánica',
    modalidad: 'Virtual',
    descripcion: 'Domina las ecuaciones diferenciales: EDO de primer y segundo orden, sistemas de ecuaciones.',
    lugarReunion: 'Microsoft Teams',
    precio: 20.00,
    tutor: {
      id: 'tutor-5',
      nombre: 'Ana Martínez',
      fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      contacto: 'ana.martinez@example.com',
    },
    imagenRepresentativaUrl: 'https://example.com/ecuaciones.jpg',
    tags: ['Matemática', 'Ingeniería'],
    calificacionPromedio: 4.9,
    totalReseñas: 25,
    horarios: [{ day: 'Lunes', hour: '18:00' }, { day: 'Miércoles', hour: '18:00' }],
  },
];

/**
 * Seed data completo de ofertas con total
 */
export const ofertasSeedData: OfertasResult = {
  ofertas: ofertasSeed,
  total: ofertasSeed.length,
};

/**
 * Función para obtener todas las ofertas del seed
 */
export function getOfertasSeed(): OfertasResult {
  return ofertasSeedData;
}

/**
 * Función para obtener ofertas vacías (para pruebas)
 */
export function getEmptyOfertasResult(): OfertasResult {
  return {
    ofertas: [],
    total: 0,
  };
}
