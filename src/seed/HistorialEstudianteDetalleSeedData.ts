// Seed para simular la respuesta del backend para el detalle de un historial del estudiante (HU-40)
export const HistorialEstudianteDetalleSeedData = {
  // Ejemplos de detalles base
  '1': {
    id: '1',
    tutor: {
      name: 'Andres Mendoza',
      avatar:
        'https://ui-avatars.com/api/?name=Andres+Mendoza&background=0D8ABC&color=fff&size=128&bold=true&rounded=true',
    },
    subject: 'Cálculo Vectorial',
    date: '20 de mayo, 2024',
    time: '14:00 - 15:00',
    modality: 'Virtual',
    meetingLink: 'https://zoom.us/j/1234567890',
    location: null,
    pricePerHour: '$15/h',
    studentMessage:
      'Necesito reforzar el tema de integrales de línea y su aplicación física.',
    status: 'Completada',
    // Así luce cuando el estudiante ya calificó la sesión
    review: {
      rating: 5,
      comment: 'Excelente explicación, muy paciente.',
      createdAt: '2024-05-21T10:00:00Z',
    },
  },
  '3': {
    id: '3',
    tutor: {
      name: 'Lucía Fernández',
      avatar:
        'https://ui-avatars.com/api/?name=Lucia+Fernandez&background=0D8ABC&color=fff&size=128&bold=true&rounded=true',
    },
    subject: 'Álgebra Lineal',
    date: '22 de mayo, 2024',
    time: '16:00 - 17:00',
    modality: 'Presencial',
    meetingLink: null,
    location: 'Campus Central, Biblioteca Sala 4',
    pricePerHour: '$18/h',
    studentMessage: 'Dudas sobre transformaciones lineales y matrices.',
    // Así luce cuando es inasistencia
    status: 'INASISTENCIA',
    review: null,
  },
};
