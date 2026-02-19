interface TutorResponseDto {
  id: string;
  name: string;
  photo: string; // URL de la foto
}

export interface OfferResponseDto {
  id: string;
  title: string;
  price: number; // Precio por hora, ej. 10
  modality: 'Virtual' | 'Presencial' | 'Virtual/Presencial';
  description: string;
  tags: string[]; // Ej. ['Matemática', 'Formación Básica']
  rating: number; // Ej. 4.8
  reviewsCount: number; // Ej. 15
  tutor: TutorResponseDto;
}

export interface PaginatedOffersResponse {
  data: OfferResponseDto[];
  meta: {
    totalResults: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}
