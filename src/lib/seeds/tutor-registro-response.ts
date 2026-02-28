export interface TutorRegistroResponse {
  id: string;
  userId: string;
  nombreCompleto: string;
  numeroWhatsapp: string;
  facultad: string;
  semestreActual: string;
  biografiaCorta: string;
  createdAt: string;
  updatedAt: string;
}

export const TUTOR_REGISTRO_RESPONSE_SEED: TutorRegistroResponse = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  userId: 'user-550e8400-e29b-41d4',
  nombreCompleto: 'Daniela Castro',
  numeroWhatsapp: '593991234567',
  facultad: 'FIS - Sistemas',
  semestreActual: '4° Semestre',
  biografiaCorta:
    'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
