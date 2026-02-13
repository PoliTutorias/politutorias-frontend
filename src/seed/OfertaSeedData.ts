import { OfertaEntity } from '@/interfaces/oferta/OfertaEntity';

export function getOfertaSeed(): OfertaEntity[] {
  const now = new Date();

  return [
    {
      id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      title: 'Cálculo Vectorial',
      price: 10,
      modality: 'Presencial',
      categories: ['Matemáticas', 'Cálculo'],
      description:
        'Se enseñará cálculo vectorial, incluyendo integrales de línea y superficie.',
      tutorId: 'tutor-001',
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      id: 'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
      title: 'Física I - Mecánica Clásica',
      price: 15,
      modality: 'Virtual',
      categories: ['Ciencias Exactas', 'Física', 'Preparación de Exámenes'],
      description:
        'Tutorías personalizadas de Física I para estudiantes universitarios, cubriendo mecánica clásica, cinemática y dinámica.',
      tutorId: 'tutor-002',
      createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      id: 'c3d4e5f6-a7b8-9012-3456-7890abcdef12',
      title: 'Programación en Python',
      price: 20,
      modality: 'Presencial',
      categories: ['Programación', 'Python', 'Informática'],
      description:
        'Clases de Python desde cero hasta nivel intermedio, incluyendo POO, manejo de librerías y proyectos prácticos.',
      tutorId: 'tutor-003',
      createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      id: 'd4e5f6a7-b8c9-0123-4567-890abcdef123',
      title: 'Álgebra Lineal Avanzada',
      price: 12,
      modality: 'Presencial',
      categories: ['Matemáticas'],
      description:
        'Curso intensivo de álgebra lineal cubriendo espacios vectoriales, transformaciones lineales y diagonalización.',
      tutorId: 'tutor-004',
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      id: 'e5f6a7b8-c9d0-1234-5678-90abcdef1234',
      title: 'Química Orgánica',
      price: 18,
      modality: 'Virtual',
      categories: ['Ciencias Exactas', 'Química', 'Laboratorio'],
      description:
        'Tutorías de química orgánica enfocadas en mecanismos de reacción, síntesis y análisis espectroscópico con enfoque práctico.',
      tutorId: 'tutor-005',
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
  ];
}
