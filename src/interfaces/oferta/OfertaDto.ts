export interface OfertaDto {
  id: string;
  title: string;
  description: string;
  isPresencial: boolean;
  modality?: string;
  pricePerHour: number;
  tags: string[];
}
