export interface OfertaDto {
  id: string;
  title: string;
  description: string;
  isPresencial: boolean;
  pricePerHour: number;
  tags: string[];
}
