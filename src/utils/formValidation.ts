import { Experiencia } from '@/interfaces/experiencia-tipo/Experiencia';

export function validarCamposVaciosExperiencia(experiencia: Partial<Experiencia>): boolean {
  const { puesto, institucion, fechaInicio, fechaFin } = experiencia;

  // Retornar true si TODOS los campos requeridos están vacíos
  const puestoVacio = !puesto || !puesto.trim();
  const institucionVacia = !institucion || !institucion.trim();
  const fechaInicioVacia = !fechaInicio || !fechaInicio.trim();
  const fechaFinVacia = !fechaFin || !fechaFin.trim();

  return puestoVacio && institucionVacia && fechaInicioVacia && fechaFinVacia;
}
