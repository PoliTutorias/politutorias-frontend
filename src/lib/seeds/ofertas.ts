/**
 * Seed de datos para ofertas de tutoría
 *
 * Este archivo contiene datos de ejemplo que simulan la estructura de respuesta
 * del endpoint GET /api/ofertas. Se utiliza durante la fase de desarrollo inicial
 * para permitir el desarrollo y pruebas del frontend de manera independiente
 * antes de la integración con el backend real.
 *
 * Estructura:
 * - Array de OfertaEntity con 15-20 registros
 * - Función getOfertasPaginatedSeed(searchTerm?) que filtra según el término
 * - Casos simulados: búsqueda exitosa, sin coincidencias, campo vacío
 */

import {
  OfertaEntity,
  PaginatedOffersResponse,
} from '@/interfaces/ofertas/Oferta';

/**
 * Array de datos de ejemplo para ofertas de tutoría
 * Incluye ofertas de diferentes materias para simular diversos escenarios de búsqueda
 */
const ofertasSeedData: OfertaEntity[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    titulo: 'Cálculo Diferencial',
    descripcion: 'Clases personalizadas de cálculo diferencial y aplicaciones prácticas. Ideal para estudiantes de ingeniería.',
    precioHora: 15.5,
    modalidad: 'Presencial',
    lugarReunion: 'Cafetería Central, Campus Principal',
    carrera: 'Ingeniería de Sistemas',
    imagenRepresentativaUrl: 'https://example.com/calculo-diferencial.jpg',
    createdAt: '2023-10-26T10:00:00Z',
    tutor: {
      id: 'tutor-123',
      nombre: 'Juan Pérez',
      fotoUrl: 'https://example.com/tutor-juan.jpg',
    },
  },
  {
    id: 'b1c2d3e4-f5a6-7890-1234-567890abcdef',
    titulo: 'Programación Orientada a Objetos',
    descripcion: 'Ayuda con conceptos POO en Java y Python. Proyectos prácticos incluidos.',
    precioHora: 18.0,
    modalidad: 'Virtual',
    carrera: 'Ciencias de la Computación',
    imagenRepresentativaUrl: 'https://example.com/poo.jpg',
    createdAt: '2023-10-25T14:30:00Z',
    tutor: {
      id: 'tutor-456',
      nombre: 'Ana García',
      fotoUrl: 'https://example.com/tutor-ana.jpg',
    },
  },
  {
    id: 'c5d6e7f8-a9b0-1234-5678-90abcdef0123',
    titulo: 'Cálculo Vectorial',
    descripcion: 'Conceptos avanzados de cálculo vectorial y álgebra lineal aplicada.',
    precioHora: 17.0,
    modalidad: 'Virtual',
    carrera: 'Física',
    imagenRepresentativaUrl: 'https://example.com/calculo-vectorial.jpg',
    createdAt: '2023-10-24T09:00:00Z',
    tutor: {
      id: 'tutor-789',
      nombre: 'Luisa Martínez',
      fotoUrl: 'https://example.com/tutor-luisa.jpg',
    },
  },
  {
    id: 'd6e7f8a9-b0c1-2345-6789-0abcdef01234',
    titulo: 'Física Cuántica',
    descripcion: 'Introducción a la mecánica cuántica con ejemplos prácticos y simulaciones.',
    precioHora: 20.0,
    modalidad: 'Presencial',
    lugarReunion: 'Laboratorio de Física, Bloque B',
    carrera: 'Física',
    imagenRepresentativaUrl: 'https://example.com/quantum.jpg',
    createdAt: '2023-10-23T11:15:00Z',
    tutor: {
      id: 'tutor-101',
      nombre: 'Carlos López',
      fotoUrl: 'https://example.com/tutor-carlos.jpg',
    },
  },
  {
    id: 'e7f8a9b0-c1d2-3456-7890-bcdef0123456',
    titulo: 'Bases de Datos SQL',
    descripcion: 'Diseño e implementación de bases de datos relacionales con SQL avanzado.',
    precioHora: 16.5,
    modalidad: 'Virtual/Presencial',
    lugarReunion: 'Sala de Cómputo 3',
    carrera: 'Ingeniería de Sistemas',
    imagenRepresentativaUrl: 'https://example.com/sql.jpg',
    createdAt: '2023-10-22T15:45:00Z',
    tutor: {
      id: 'tutor-202',
      nombre: 'María Santos',
      fotoUrl: 'https://example.com/tutor-maria.jpg',
    },
  },
  {
    id: 'f8a9b0c1-d2e3-4567-8901-cdef01234567',
    titulo: 'Álgebra Lineal',
    descripcion: 'Matrices, vectores, sistemas lineales y aplicaciones en ingeniería.',
    precioHora: 14.0,
    modalidad: 'Presencial',
    lugarReunion: 'Aula 205, Bloque A',
    carrera: 'Ingeniería de Sistemas',
    imagenRepresentativaUrl: 'https://example.com/algebra.jpg',
    createdAt: '2023-10-21T13:00:00Z',
    tutor: {
      id: 'tutor-303',
      nombre: 'Pedro Rodríguez',
      fotoUrl: 'https://example.com/tutor-pedro.jpg',
    },
  },
  {
    id: 'g9a0b1c2-d3e4-5678-9012-def0123456789',
    titulo: 'Estadística y Probabilidad',
    descripcion: 'Conceptos de probabilidad, distribuciones y análisis estadístico con herramientas R/Python.',
    precioHora: 15.0,
    modalidad: 'Virtual',
    carrera: 'Matemáticas',
    imagenRepresentativaUrl: 'https://example.com/stats.jpg',
    createdAt: '2023-10-20T10:30:00Z',
    tutor: {
      id: 'tutor-404',
      nombre: 'Sofía Gómez',
      fotoUrl: 'https://example.com/tutor-sofia.jpg',
    },
  },
  {
    id: 'h0b1c2d3-e4f5-6789-0123-ef0123456789a',
    titulo: 'Cálculo Integral',
    descripcion: 'Integrales definidas e indefinidas, técnicas de integración y aplicaciones.',
    precioHora: 15.5,
    modalidad: 'Presencial',
    lugarReunion: 'Biblioteca Central, 3er piso',
    carrera: 'Ingeniería Civil',
    imagenRepresentativaUrl: 'https://example.com/integral.jpg',
    createdAt: '2023-10-19T14:20:00Z',
    tutor: {
      id: 'tutor-505',
      nombre: 'Diego Fernández',
      fotoUrl: 'https://example.com/tutor-diego.jpg',
    },
  },
  {
    id: 'i1c2d3e4-f5g6-7890-1234-f01234567890b',
    titulo: 'Estructura de Datos',
    descripcion: 'Listas, pilas, colas, árboles y gráfos con implementaciones en C/C++.',
    precioHora: 19.0,
    modalidad: 'Virtual',
    carrera: 'Ciencias de la Computación',
    imagenRepresentativaUrl: 'https://example.com/datastructures.jpg',
    createdAt: '2023-10-18T09:45:00Z',
    tutor: {
      id: 'tutor-606',
      nombre: 'Roberto Silva',
      fotoUrl: 'https://example.com/tutor-roberto.jpg',
    },
  },
  {
    id: 'j2d3e4f5-g6h7-8901-2345-g0123456789c',
    titulo: 'Química General',
    descripcion: 'Fundamentos de química, reacciones químicas y estequiometría aplicada.',
    precioHora: 16.0,
    modalidad: 'Presencial',
    lugarReunion: 'Laboratorio de Química, Bloque C',
    carrera: 'Ingeniería Química',
    imagenRepresentativaUrl: 'https://example.com/chemistry.jpg',
    createdAt: '2023-10-17T11:30:00Z',
    tutor: {
      id: 'tutor-707',
      nombre: 'Laura Núñez',
      fotoUrl: 'https://example.com/tutor-laura.jpg',
    },
  },
  {
    id: 'k3e4f5g6-h7i8-9012-3456-h1234567890d',
    titulo: 'Desarrollo Web Frontend',
    descripcion: 'HTML, CSS, JavaScript, React y frameworks modernos. Proyectos completos.',
    precioHora: 17.5,
    modalidad: 'Virtual',
    carrera: 'Ingeniería de Sistemas',
    imagenRepresentativaUrl: 'https://example.com/frontend.jpg',
    createdAt: '2023-10-16T16:00:00Z',
    tutor: {
      id: 'tutor-808',
      nombre: 'Javier Cortés',
      fotoUrl: 'https://example.com/tutor-javier.jpg',
    },
  },
  {
    id: 'l4f5g6h7-i8j9-0123-4567-i2345678901e',
    titulo: 'Biología Celular',
    descripcion: 'Estructura y función celular, microscopía y experimentos de laboratorio.',
    precioHora: 18.5,
    modalidad: 'Presencial',
    lugarReunion: 'Laboratorio de Biología, Bloque D',
    carrera: 'Biología',
    imagenRepresentativaUrl: 'https://example.com/biology.jpg',
    createdAt: '2023-10-15T12:15:00Z',
    tutor: {
      id: 'tutor-909',
      nombre: 'Elena Vargas',
      fotoUrl: 'https://example.com/tutor-elena.jpg',
    },
  },
  {
    id: 'm5g6h7i8-j9k0-1234-5678-j3456789012f',
    titulo: 'Termodinámica',
    descripcion: 'Leyes de la termodinámica, ciclos thermales y eficiencia energética.',
    precioHora: 19.5,
    modalidad: 'Virtual/Presencial',
    lugarReunion: 'Aula 101, Bloque E',
    carrera: 'Ingeniería Mecánica',
    imagenRepresentativaUrl: 'https://example.com/thermodynamics.jpg',
    createdAt: '2023-10-14T08:30:00Z',
    tutor: {
      id: 'tutor-1010',
      nombre: 'Miguel Acosta',
      fotoUrl: 'https://example.com/tutor-miguel.jpg',
    },
  },
  {
    id: 'n6h7i8j9-k0l1-2345-6789-k4567890123g',
    titulo: 'Algoritmos Avanzados',
    descripcion: 'Diseño de algoritmos, análisis de complejidad, programación dinámica.',
    precioHora: 20.5,
    modalidad: 'Virtual',
    carrera: 'Ciencias de la Computación',
    imagenRepresentativaUrl: 'https://example.com/algorithms.jpg',
    createdAt: '2023-10-13T13:45:00Z',
    tutor: {
      id: 'tutor-1111',
      nombre: 'Gustavo Herrera',
      fotoUrl: 'https://example.com/tutor-gustavo.jpg',
    },
  },
  {
    id: 'o7i8j9k0-l1m2-3456-7890-l5678901234h',
    titulo: 'Economía Política',
    descripcion: 'Principios de economía, microeconomía y macroeconomía aplicada.',
    precioHora: 14.5,
    modalidad: 'Presencial',
    lugarReunion: 'Aula 304, Bloque F',
    carrera: 'Economía',
    imagenRepresentativaUrl: 'https://example.com/economy.jpg',
    createdAt: '2023-10-12T10:00:00Z',
    tutor: {
      id: 'tutor-1212',
      nombre: 'Claudia Morales',
      fotoUrl: 'https://example.com/tutor-claudia.jpg',
    },
  },
  {
    id: 'p8j9k0l1-m2n3-4567-8901-m6789012345i',
    titulo: 'Literatura Española',
    descripcion: 'Análisis de obras clásicas y contemporáneas de la literatura española.',
    precioHora: 13.0,
    modalidad: 'Virtual',
    carrera: 'Humanidades',
    imagenRepresentativaUrl: 'https://example.com/literature.jpg',
    createdAt: '2023-10-11T15:30:00Z',
    tutor: {
      id: 'tutor-1313',
      nombre: 'Francisco Ruiz',
      fotoUrl: 'https://example.com/tutor-francisco.jpg',
    },
  },
  {
    id: 'q9k0l1m2-n3o4-5678-9012-n7890123456j',
    titulo: 'Historia de América',
    descripcion: 'Períodos históricos, conquista, colonia e independencia de América Latina.',
    precioHora: 12.5,
    modalidad: 'Presencial',
    lugarReunion: 'Aula 201, Bloque G',
    carrera: 'Historia',
    imagenRepresentativaUrl: 'https://example.com/history.jpg',
    createdAt: '2023-10-10T09:15:00Z',
    tutor: {
      id: 'tutor-1414',
      nombre: 'Raúl Gutiérrez',
      fotoUrl: 'https://example.com/tutor-raul.jpg',
    },
  },
  {
    id: 'r0l1m2n3-o4p5-6789-0123-o8901234567k',
    titulo: 'Inglés Avanzado',
    descripcion: 'Conversación, gramática avanzada y preparación para exámenes internacionales.',
    precioHora: 15.0,
    modalidad: 'Virtual/Presencial',
    lugarReunion: 'Sala de Idiomas 2',
    carrera: 'Idiomas Modernos',
    imagenRepresentativaUrl: 'https://example.com/english.jpg',
    createdAt: '2023-10-09T14:45:00Z',
    tutor: {
      id: 'tutor-1515',
      nombre: 'Sally White',
      fotoUrl: 'https://example.com/tutor-sally.jpg',
    },
  },
];

/**
 * Función para obtener ofertas paginadas con filtrado por término de búsqueda
 *
 * @param searchTerm - Término de búsqueda opcional para filtrar por título o nombre del tutor
 * @param page - Número de página (default: 1)
 * @param limit - Cantidad de items por página (default: 10)
 * @returns PaginatedOffersResponse con items filtrados y metadatos
 */
export function getOfertasPaginatedSeed(
  searchTerm: string = '',
  page: number = 1,
  limit: number = 10,
): PaginatedOffersResponse {
  // Filtrar ofertas basándose en searchTerm
  let filteredOfertas = ofertasSeedData;

  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredOfertas = ofertasSeedData.filter(
      (oferta) =>
        oferta.titulo.toLowerCase().includes(term) ||
        oferta.tutor.nombre.toLowerCase().includes(term),
    );
  }

  // Calcular índices para paginación
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Obtener items para la página actual
  const items = filteredOfertas.slice(startIndex, endIndex);

  // Retornar respuesta paginada
  return {
    items,
    totalResults: filteredOfertas.length,
    page,
    limit,
  };
}
