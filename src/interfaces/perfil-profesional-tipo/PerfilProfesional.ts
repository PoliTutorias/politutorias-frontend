import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';

export interface PerfilProfesional {
  id?: string;
  experiencias: Experiencia[];
  materias: string[];
}
