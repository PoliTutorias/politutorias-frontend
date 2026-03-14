import { PaginatedSolicitudesDto } from '@/interfaces/solicitudes/SolicitudesDTO';

export const paginatedSolicitudesPendingSeed: PaginatedSolicitudesDto = {
  data: [
    {
      id: 'sol-pnd-001',
      estudiante: 'Valeria Sanchez',
      materia: 'Calculo Vectorial',
      fechaHora: '16 mar 2026 · 10:00',
      mensajeResumen: 'Necesito repasar el teorema de Green antes del parcial del martes...',
      estado: 'PENDIENTE',
      modalidad: 'Virtual',
      precioHora: 10,
      mensajeCompleto: 'Necesito repasar el teorema de Green antes del parcial del martes.',
    },
    {
      id: 'sol-pnd-002',
      estudiante: 'Sofia Mendoza',
      materia: 'Fisica I',
      fechaHora: '18 mar 2026 · 14:00',
      mensajeResumen: 'Tengo dudas sobre el principio de conservacion de energia y trabajo...',
      estado: 'PENDIENTE',
      modalidad: 'Presencial',
      precioHora: 12,
      mensajeCompleto:
        'Tengo dudas sobre el principio de conservacion de energia y trabajo. Quiero practicar ejercicios tipo examen.',
    },
    {
      id: 'sol-pnd-003',
      estudiante: 'Mateo Vargas',
      materia: 'Algebra Lineal',
      fechaHora: '20 mar 2026 · 11:00',
      mensajeResumen:
        'Quiero preparar el examen final de algebra. Necesito repasar espacios vectoriales...',
      estado: 'PENDIENTE',
      modalidad: 'Virtual',
      precioHora: 10,
      mensajeCompleto:
        'Quiero preparar el examen final de algebra. Necesito repasar espacios vectoriales y transformaciones.',
    },
  ],
  total: 3,
  page: 1,
  limit: 10,
  totalPages: 1,
};
