import { DetallesOfertaDto } from '@/interfaces/offers/DetallesOfertaDto';

export const offerDetailsSeed: DetallesOfertaDto = {
  id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  title: 'Cálculo Vectorial',
  modality: 'Virtual y Presencial',
  description: 'Clases de Cálculo Vectorial para estudiantes de primeros semestres. Incluye integrales múltiples, campos vectoriales y teoremas fundamentales.',
  categories: [
    {
      name: 'Matemática',
    },
    {
      name: 'Formación Básica',
    },
  ],
  availability: [
    {
      day: 'Lunes',
      time: '14:00',
    },
    {
      day: 'Lunes',
      time: '15:00',
    },
    {
      day: 'Miércoles',
      time: '14:00',
    },
    {
      day: 'Miércoles',
      time: '15:00',
    },
    {
      day: 'Viernes',
      time: '09:00',
    },
    {
      day: 'Viernes',
      time: '10:00',
    },
  ],
  pricePerHour: 10,
  tutor: {
    id: 'tutor-uuid-12345',
    name: 'Juan Pérez',
    career: 'FIM - Mecánica',
    semester: '9° Semestre',
    rating: 4.8,
    reviewsCount: 15,
    description: 'Soy un apasionado por la mecánica y las matemáticas aplicadas, con experiencia en ayudar a estudiantes a superar sus retos académicos. Mi objetivo es simplificar conceptos complejos y fomentar el pensamiento crítico.',
    masteredSubjects: [
      {
        name: 'Cálculo Vectorial',
      },
      {
        name: 'Física I',
      },
      {
        name: 'Estática',
      },
      {
        name: 'Dinámica',
      },
    ],
    experience: [
      {
        position: 'Ayudante de Cátedra - Estática',
        institution: 'EPN, Facultad de Mecánica',
        period: '2024 — Presente',
      },
      {
        position: 'Tutor Particular - Cálculo y Física',
        institution: 'Independiente',
        period: '2023 — Presente',
      },
    ],
    phoneNumber: '+5939123456789',
    profileImageUrl: 'https://via.placeholder.com/150',
  },
};
