import { OfertaEntity } from './OfertaEntity';

/**
 * Resultado de la consulta de ofertas para filtrado (HU27)
 * Estructura de respuesta del endpoint GET /api/ofertas
 */
export interface OfertasResult {
  ofertas: OfertaEntity[];
  total: number;
}
