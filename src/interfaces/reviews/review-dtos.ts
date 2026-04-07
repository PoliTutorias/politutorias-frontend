export interface ReviewDto {
  id: string;
  studentName: string;
  studentAvatarUrl: string | null;
  date: string;
  stars: number;
  tutoringSubject: string;
  comment: string;
}

export interface StarDistributionItem {
  stars: number;
  percentage: number;
}

export interface ReviewSummaryDto {
  avgRating: number;
  totalReviews: number;
  starDistribution: StarDistributionItem[];
  metrics: {
    totalAppointments: number;
    completedHours: number;
    averageResponseTime: number;
  };
}

export interface PaginatedReviewsResponse {
  data: ReviewDto[];
  page: number;
  limit: number;
  total: number;
  summary: ReviewSummaryDto;
}