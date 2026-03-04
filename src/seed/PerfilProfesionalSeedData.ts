import { PerfilProfesional } from '@/interfaces/perfil-profesional-tipo/PerfilProfesional';
import { experienciaSeedData } from '@/seed/ExperienciaSeedData';

export const perfilProfesionalSeedData: PerfilProfesional = {
  id: 'prof-001',
  experiencias: experienciaSeedData,
  materias: ['Cálculo', 'Álgebra Lineal', 'Análisis Real', 'Ecuaciones Diferenciales'],
};
