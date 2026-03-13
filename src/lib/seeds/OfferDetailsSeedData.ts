/**
 * Seed Data para ofertas de tutoría con diferentes configuraciones
 * Incluye ejemplos con modalidad única y modal dual para pruebas
 */

import { DetallesOfertaDto } from '@/interfaces/offers/DetallesOfertaDto';

export const offerDetailsSeed: DetallesOfertaDto = {
  id: 'e6a0a8e0-2d8e-4a7b-8c7c-0a2a4b8c7c7c',
  title: 'Cálculo Vectorial - Repaso Integral y Derivadas',
  modality: 'virtual/presencial',
  description:
    'Aprende los conceptos fundamentales de cálculo vectorial con enfoque práctico. Cubrimos integrales, derivadas y aplicaciones reales. Sesiones interactivas con ejercicios resueltos paso a paso.',
  categories: [
    { name: 'Matemáticas' },
    { name: 'Cálculo' },
    { name: 'Vectores' },
  ],
  availability: [
    { day: 'Lunes', time: '14:00' },
    { day: 'Lunes', time: '15:00' },
    { day: 'Miércoles', time: '14:00' },
    { day: 'Miércoles', time: '15:00' },
    { day: 'Viernes', time: '09:00' },
    { day: 'Viernes', time: '10:00' },
  ],
  pricePerHour: 50,
  tutor: {
    id: '7f11a5be-2ee6-468f-a834-cefe8bb27e69',
    name: 'Juan Pérez',
    profileImageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    career: 'Ingeniería Civil',
    semester: '10',
    rating: 4.8,
    reviewsCount: 24,
    description:
      'Ingeniero civil con 5 años de experiencia docente. Especializado en matemáticas aplicadas y cálculo. He ayudado a más de 100 estudiantes a aprobar sus cursos.',
    phoneNumber: '+57 3101234567',
    masteredSubjects: [
      { name: 'Cálculo' },
      { name: 'Álgebra Lineal' },
      { name: 'Geometría' },
      { name: 'Ecuaciones Diferenciales' },
    ],
    experience: [
      {
        position: 'Tutor de Matemáticas',
        institution: 'Universidad Politécnica',
        period: '2020 — Presente',
      },
      {
        position: 'Asistente de Investigación',
        institution: 'Departamento de Ingeniería',
        period: '2019 — 2020',
      },
      {
        position: 'Profesor Particular',
        institution: 'Clases Privadas',
        period: '2018 — 2019',
      },
    ],
  },
};

export const offerDetailsSingleModalitySeed: DetallesOfertaDto = {
  id: 'f7b1b9f1-3e9f-5b8c-9d8d-1b3b5c9d8d8d',
  title: 'Programación en Python - Nivel Intermedio',
  modality: 'virtual',
  description:
    'Aprende programación orientada a objetos en Python. Desde conceptos básicos hasta patrones de diseño avanzados. Proyectos prácticos incluidos.',
  categories: [
    { name: 'Programación' },
    { name: 'Python' },
    { name: 'POO' },
  ],
  availability: [
    { day: 'Martes', time: '16:00' },
    { day: 'Martes', time: '17:00' },
    { day: 'Jueves', time: '16:00' },
    { day: 'Jueves', time: '17:00' },
    { day: 'Sábado', time: '10:00' },
  ],
  pricePerHour: 40,
  tutor: {
    id: '8g22b6cf-3ff7-469g-b935-dfhg9cc28gh8',
    name: 'María García',
    profileImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    career: 'Ingeniería de Sistemas',
    semester: '9',
    rating: 4.9,
    reviewsCount: 18,
    description:
      'Ingeniera de sistemas con especialización en desarrollo backend. Más de 8 años de experiencia en programación y enseñanza.',
    phoneNumber: '+57 3109876543',
    masteredSubjects: [
      { name: 'Python' },
      { name: 'JavaScript' },
      { name: 'SQL' },
      { name: 'APIs REST' },
    ],
    experience: [
      {
        position: 'Senior Software Engineer',
        institution: 'Tech Company XYZ',
        period: '2020 — Presente',
      },
      {
        position: 'Software Developer',
        institution: 'StartUp ABC',
        period: '2018 — 2020',
      },
      {
        position: 'Junior Developer',
        institution: 'IT Solutions',
        period: '2016 — 2018',
      },
    ],
  },
};

/**
 * Obtiene los detalles de una oferta por ID
 * En desarrollo, retorna ofertas de seed; en producción, vendría del backend
 */
export function getOfferDetailsSeed(
  offerId: string
): DetallesOfertaDto | null {
  if (
    offerId === 'e6a0a8e0-2d8e-4a7b-8c7c-0a2a4b8c7c7c' ||
    offerId === 'test-offer-1'
  ) {
    return offerDetailsSeed;
  }

  if (
    offerId === 'f7b1b9f1-3e9f-5b8c-9d8d-1b3b5c9d8d8d' ||
    offerId === 'test-offer-2'
  ) {
    return offerDetailsSingleModalitySeed;
  }

  // Para cualquier otro ID, retornar el seed por defecto
  return offerDetailsSeed;
}
