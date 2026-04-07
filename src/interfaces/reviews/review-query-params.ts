export interface ReviewQueryParams {
  tutorId: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'createdAt' | 'stars';
  ratingFilter?: 'all' | '1' | '2' | '3' | '4' | '5';
}