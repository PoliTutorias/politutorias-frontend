import { OfertaDto } from '@/interfaces/oferta/OfertaDto';

export const OFERTAS_SEED: OfertaDto[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    title: 'Cálculo en una Variable',
    description: 'Me enfoco en ejercicios de MRU.',
    isPresencial: true,
    pricePerHour: 10.0,
    tags: ['Matemática', 'Formación Básica', 'Preparación de Exámenes', 'Resolución de Ejercicios', 'Laboratorios'],
  },
  {
    id: 'f5e4d3c2-b1a0-9876-5432-10fedcba9876',
    title: 'Física I - Cinemática y Dinámica',
    description: 'Clases personalizadas para entender los principios de la mecánica clásica.',
    isPresencial: false,
    pricePerHour: 12.5,
    tags: ['Física', 'Ingeniería', 'Resolución de Problemas'],
  },
  {
    id: 'c9d8e7f6-a5b4-3210-9876-54321fedcba',
    title: 'Estadística Aplicada',
    description: 'Aprende estadística con ejemplos prácticos y herramientas reales.',
    isPresencial: true,
    pricePerHour: 11.0,
    tags: ['Estadística', 'Ciencia de Datos', 'Formación Básica'],
  },
  {
    id: 'b2c3d4e5-f6a7-8901-2345-678901abcdef',
    title: 'Programación en Python',
    description: 'Desde lo básico hasta proyectos avanzados con Python.',
    isPresencial: false,
    pricePerHour: 15.0,
    tags: ['Programación', 'Desarrollo de Software', 'Tecnología'],
  },
  {
    id: 'e5f6a7b8-c9d0-1234-5678-9012acbdef01',
    title: 'Química Orgánica',
    description: 'Explicaciones claras de mecanismos y reacciones químicas.',
    isPresencial: true,
    pricePerHour: 13.0,
    tags: ['Química', 'Ciencias Naturales', 'Formación Básica'],
  },
];

export function getOfertaSeeds(): OfertaDto[] {
  return OFERTAS_SEED;
}

export function getEmptyOfertas(): OfertaDto[] {
  return [];
}
